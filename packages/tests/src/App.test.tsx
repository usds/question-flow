import { render, fireEvent } from '@testing-library/react';
import fs                            from 'fs';
import '@testing-library/jest-dom/extend-expect';

import { Container } from 'react-dom';
import { App }       from './App';

it('renders correctly', () => {
  const component = render(<App />);
  expect(component.baseElement)
    .toHaveTextContent('Check eligibility for benefits');
});

it('snapshot correctly', () => {
  const { asFragment } = render(<App />);
  expect(asFragment)
    .toMatchSnapshot();
});

type AgeDataItemType = { days: number; label: string; months: number; years: number; };
type AgesListType = { [key: string]: AgeDataItemType };

const AGES_TO_TEST: AgesListType = {
  age18: {
    days:   -2,
    label:  'age18',
    months: 0,
    years:  19,
  }, // turns 19 tomorrow
  age59: {
    days:   1,
    label:  'age59',
    months: 0,
    years:  59,
  },
  age65: {
    days:   1,
    label:  'age65',
    months: 0,
    years:  65,
  },
};

type RecursiveFuncParams = {
  container: Container;
  currentAge: AgeDataItemType;
  debug: any;
  mermaidOutput: string[];
  recursionDepth: number;
};

const buttonSelector = 'button[data-testid^=next-button-]';

const fillInDateByAge = (container: Container, ageToUse: AgeDataItemType): Date => {
  // based on the desired age as of today, work backwards to get the needed DoB
  const date = new Date();
  date.setDate(date.getDate() - 1 - ageToUse.days);
  date.setMonth(date.getMonth() + ageToUse.months);
  date.setFullYear(date.getFullYear() - ageToUse.years);

  const monthElem = container.querySelector('input[id=enter-your-birthday-month]');
  if (monthElem) {
    fireEvent.change(monthElem, { target: { value: date.getMonth() + 1 } });
    fireEvent.blur(monthElem);
  }

  const dayElem = container.querySelector('input[id=enter-your-birthday-day]');
  if (dayElem) {
    fireEvent.change(dayElem, { target: { value: date.getDate() } });
    fireEvent.blur(dayElem);
  }

  const yearElem = container.querySelector('input[id=enter-your-birthday-year]');
  if (yearElem) {
    fireEvent.change(yearElem, { target: { value: date.getFullYear() } });
    fireEvent.blur(yearElem);
  }
  return date;
};

const getCurrentCardInfo = (container: Container): { id: string, label: string } => {
  const questionCurrentElem = container.querySelector('header[data-testid="CardHeader"]');
  const nextBtn             = container.querySelector(buttonSelector);
  const testid              = nextBtn?.attributes?.getNamedItem('data-testid')?.value || '';
  const id                  = testid.replace('next-button-', ''); // trim off the prefix
  return {
    id,
    label: questionCurrentElem?.textContent || '',
  };
};

// basically, scoping the global that tracks and removes duplicate line entries in the mermaid file.
class MermaidLineCache {
  private static data: { [key: string]: string } = {};

  private static nodeCheck: string[] = [];

  // counts are for debugging
  private static edgeCount: 0;

  private static nodeCount: 0;

  /**
   *
   * @param input      Long string to
   * @param linelength
   */
  static addMermaidLineBreaks = (input: string, linelength = 25) => {
    let newlinelength = linelength;

    MermaidLineCache.edgeCount += 1;
    // we do some math to try and make all the lines approx the same length
    if (input.length > newlinelength) {
      const chunkCount = Math.floor(input.length / newlinelength) + 1;

      newlinelength = Math.floor(input.length / chunkCount) + 1;
    }

    let runlength = 0;
    return input.split(/[- ]/)
      .reduce((prev: string, next: string) => {
        const tooLong = (runlength + next.length + 1) > newlinelength;
        const delim   = (tooLong) ? '<br/>' : ' '; // but in mermaid is translating this into '<br>'

        runlength = (tooLong) ? next.length + 1 : (runlength + next.length + 1);
        // we also don't want special character since some can screw up mermaid formatting
        const cleanNext = next.replace(/[^a-zA-Z0-9 ?.]/g, '');
        return `${prev}${delim}${cleanNext}`;
      });
  };

  // if we've never seen this card then we need the card names
  //    --> B[Enter your birthday.]
  // if we have seen it, then just use the card id
  //    --> B
  static mermaidName = (cardId: string, cardLabel: string): string => {
    MermaidLineCache.nodeCount += 1;
    if (cardId in MermaidLineCache.data) {
      return cardId;
    }
    const cleanValue              = this.addMermaidLineBreaks(cardLabel);
    MermaidLineCache.data[cardId] = cleanValue;
    return `${cardId}[ ${cleanValue} ]`;
  };

  static edgeCheck(fromNode: string, edgeName: string, toNode: string) {
    const checkkey = `${fromNode} ${edgeName} ${toNode}`;
    if (MermaidLineCache.nodeCheck.includes(checkkey)) {
      return true;
    }
    MermaidLineCache.nodeCheck.push(checkkey);
    return false;
  }

  static reset = () => {
    MermaidLineCache.data      = {};
    MermaidLineCache.nodeCheck = [];
    MermaidLineCache.edgeCount = 0;
    MermaidLineCache.nodeCount = 0;
  };

  static getEdgeCount = () => MermaidLineCache.edgeCount;

  static getNodeCount = () => MermaidLineCache.nodeCount;
}

const addMermaidMapping = (mermaidOutput: string[],
  currentCardId: string, currentCardQuestion: string, choiceStr: string,
  nextCardId: string, nextCardQuestion: string) => {
  if (MermaidLineCache.edgeCheck(currentCardId, choiceStr, nextCardId)) {
    // already processed, so just return.
    return;
  }

  const from = MermaidLineCache.mermaidName(currentCardId, currentCardQuestion);
  const to   = MermaidLineCache.mermaidName(nextCardId, nextCardQuestion);

  // now we're going to break into lines of 50ish characters.
  // This is a bunch of work that is likely NOT required since we see
  // if the item has already been included via `mermaidOutput.includes()`
  const choiceStrClean = MermaidLineCache.addMermaidLineBreaks(choiceStr);

  const mermaidline = `${from} -- ${choiceStrClean} --> ${to}`;
  mermaidOutput.push(mermaidline);
};

const ClickNextBtn = (
  container: Container,
  mermaidOutput: string[],
  selectedChoiceLabel: string,
) => {
  // data-testid="next-button
  const nextBtn = container.querySelector(buttonSelector);
  if (!nextBtn) {
    return false;
  }
  expect(nextBtn)
    .toBeValid();
  expect(nextBtn)
    .toBeEnabled(); // this will fail if no radio button or valid DoB

  const {
    id:    currentCardId,
    label: currentQuestionStr,
  } = getCurrentCardInfo(container);
  fireEvent.click(nextBtn);
  const {
    id:    nextCardId,
    label: nextQuestionString,
  } = getCurrentCardInfo(container);

  addMermaidMapping(
    mermaidOutput,
    currentCardId,
    currentQuestionStr,
    selectedChoiceLabel,
    nextCardId,
    nextQuestionString,
  );
  return true;
};

const ClickBackBtn = (container: Container) => {
  const backBtn = container.querySelector('button[data-testid^=prev-button]');
  if (backBtn) {
    expect(backBtn)
      .toBeValid();
    expect(backBtn)
      .toBeEnabled();
    fireEvent.click(backBtn);
    return true;
  }
  return false;
};

// eslint-disable-next-line sonarjs/cognitive-complexity
const recursiveFunc = (params: RecursiveFuncParams) => {
  const { container }         = params; // readability only
  const { id: currentCardId } = getCurrentCardInfo(container);

  params.recursionDepth += 1;

  if (currentCardId === 'Summary') {
    // what to do?
  } else {
    const choicesRadio = container.querySelectorAll('div.usds-q-multi-choice > input[type=radio]');
    if (!choicesRadio.length) {
      // this can be empty on the date-of-birth page or end.
      // there is no getElementById(),
      const month = container.querySelector('input[id=enter-your-birthday-month]');
      // if you hit this, then there's some panel besides the date without a radio option.
      expect(month).toBeValid();
      if (month) {
        // fill in the date... need multiple dates
        const dateused = fillInDateByAge(container, params.currentAge);
        // eslint-disable-next-line max-len,no-console
        console.log(`Age entered: M${dateused.getMonth() + 1}/D${dateused.getDate()}/Y${dateused.getFullYear()}`);
        const nextClicked = ClickNextBtn(container, params.mermaidOutput, params.currentAge.label);
        if (nextClicked) {
          recursiveFunc(params);
        }
      }
    } else {
      // get all the ids and use them to iterate.
      const radioIds: string[] = [];
      choicesRadio.forEach((elem) => {
        expect(elem)
          .toBeValid();
        expect(elem.id)
          .not
          .toBeNull();
        expect(elem.id)
          .not
          .toEqual('');
        radioIds.push(elem.id);
      });

      // this is needed because when we navigate "back" to this page as part of recursion,
      // the actual html radio button elements were destroyed and recreated,
      // so we must reload the dom elements by id
      for (const radioId of radioIds) {
        const clickRadio = container.querySelector(`input[id=${radioId}]`);
        if (clickRadio) {
          expect(clickRadio)
            .toBeValid();

          fireEvent.click(clickRadio);
          expect(clickRadio)
            .toBeChecked();

          const nextClicked = ClickNextBtn(container, params.mermaidOutput, radioId);
          if (nextClicked) {
            recursiveFunc(params);
          }
        } else {
          expect(clickRadio)
            .toBeValid();
        }
      }
    }
    // Choices done for '${currentCardId} - ${currentQuestionStr}'
  }

  // since we've clicked all the radio buttons, click back
  const backClicked = ClickBackBtn(container);

  // eslint-disable-next-line no-param-reassign
  params.recursionDepth -= 1;
  if (params.recursionDepth > 0) {
    // if we're not back at the begining then back button should be there.
    // if this is hit, then maybe the final page has changed?
    // eslint-disable-next-line no-console
    console.log(`Cannot file back button on card '${currentCardId}'`);
    expect(backClicked)
      .toBe(true);
  }
};

const graphForAge = (params: RecursiveFuncParams) => {
  // reset
  params.mermaidOutput  = ['graph TD'];
  params.recursionDepth = 0;
  MermaidLineCache.reset();

  recursiveFunc(params);

  // eslint-disable-next-line max-len,no-console
  console.log(`Graph Stats Nodes:${MermaidLineCache.getNodeCount()} Edges: ${MermaidLineCache.getEdgeCount()}`);

  const mermaidFileName = `./src/__snapshots__/flowgraph-${params.currentAge.label}.mermaid.mmd`;
  // we now verify that the graph hasn't changed and write it out if it has.
  const newMermaidFileContent = `${params.mermaidOutput.join('\n    ')}\n`;

  // the run takes so long, do NOT require it to be re-run to update the file.
  // Always update, then fail if changed.
  const oldcontent = fs.existsSync(mermaidFileName) ? fs.readFileSync(mermaidFileName)
    .toString('utf8') : '';

  fs.writeFileSync(mermaidFileName, newMermaidFileContent);

  // You'll need
  // run ./node_modules/.bin/mmdc -i ./src/__snapshots__/flowgraph.mermaid.mmd -o flowgraph.svg
  // BUG: the output is BROKEN and needs this run:
  // eslint-disable-next-line max-len
  // sed  's/<br>/<br\/>/g' flowgraph.svg |  sed  's/\.edgeLabel{/\.edgeLabel{font-size:10pt;font-family:arial;/g' > flowgraph.fixed.svg
  // it replaces `<br>` with `<br/>` and adds a smaller font for labels so they don't get clipped.

  if (oldcontent.length) {
    // simply test content is the same.
    expect(oldcontent)
      .toEqual(newMermaidFileContent);
  }
};

const testForAge = (currentAge: AgeDataItemType) => {
  const {
    container,
    debug,
  } = render(<App />); // {rerender},
  // const startButton = screen.getAllByText('Get Started')[0];
  //
  // expect(startButton)
  //   .toBeValid();
  // expect(startButton)
  //   .toBeEnabled();
  //
  // fireEvent.click(startButton);
  //
  // // go all the way to the end
  // const nextButton = container.querySelector(buttonSelector);
  // // next button should be there but disabled
  // expect(nextButton)
  //   .toBeValid();
  // expect(nextButton)
  //   .not
  //   .toBeEnabled();

  graphForAge({
    container,
    currentAge,
    debug,
    mermaidOutput:  [],
    recursionDepth: 0,
  });
};

// tests can take 10min+ to run, so it's broken out this way to get progress
describe('Checking graphs of logic flow Age 18.', () => { // describe cannot be async
  it('Generating graph and checking snapshot for Age 18', () => {
    jest.useFakeTimers(); // attempt to speed things up. stub out transitions
    // by recreating the render each loop, things get sped up a lot.
    testForAge(AGES_TO_TEST.age18);
  });
});

describe('Checking graphs of logic flow age 59', () => {
  it('Generating graph and checking snapshot for Age 59', () => {
    // by recreating the render each loop, things get sped up a lot.
    jest.useFakeTimers();
    testForAge(AGES_TO_TEST.age59);
  });
});

describe('Checking graphs of logic flow age 65.', () => { // describe cannot be async
  // but it() can be async
  it('Generating graph and checking snapshot for age 65', () => {
    // by recreating the render each loop, things get sped up a lot.
    jest.useFakeTimers();
    testForAge(AGES_TO_TEST.age65);
  });
});
