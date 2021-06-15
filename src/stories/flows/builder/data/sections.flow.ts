/* eslint-disable sonarjs/no-duplicate-string */
import { Section }       from '../../../../composable/lib/BuilderBase';
import { SurveyBuilder } from '../../../../composable/SurveyBuilder';

export type TSections = {
    adultFamily: Section;
    childDisability: Section;
    childFamily: Section;
    finances: Section;
    introduction: Section;
    results: Section;
    work: Section;
}

export const buildSections = (builder: SurveyBuilder): TSections => {
  const introduction = builder.addSection({
    id:   'introduction',
    name: 'Introduction',
  });

  const work = builder.addSection({
    id:   'a0_work',
    name: 'Work',
  });
  work.addRequirement({
    explanation: '18 or older',
  }).addResponse({
    answers:  [{ id: '0' }],
    question: { id: 'A' },
  });

  const adultFamily = builder.addSection({
    id:   'a0_family',
    name: 'Family',
  });
  adultFamily.addRequirement({ explanation: '18 or older' })
    .addResponse({
      answers:  [{ id: '0' }],
      question: { id: 'A' },
    });

  const finances = builder.addSection({
    id:   'a0_finances',
    name: 'Finances',
  });
  finances.addRequirement({ explanation: '18 or older' })
    .addResponse({
      answers:  [{ id: '0' }],
      question: { id: 'A' },
    });

  const childDisability = builder.addSection({
    id:   'a1_disability',
    name: 'Disability',
  });
  childDisability.addRequirement({ explanation: 'Is younger than 18' })
    .addResponse({
      answers:  [{ id: '1' }],
      question: { id: 'A' },
    });

  const childFamily = builder.addSection({
    id:   'a1_family',
    name: 'Family',
  });
  childFamily.addRequirement({ explanation: 'Is younger than 18' })
    .addResponse({
      answers:  [{ id: '1' }],
      question: { id: 'A' },
    });

  const results = builder.addSection({
    id:   'results',
    name: 'Results',
  });
  results.addRequirement({ explanation: 'Has answered the age question' })
    .addResponse({
      answers:  [{ id: '0' }, { id: '1' }],
      question: { id: 'A' },
    });

  return {
    adultFamily,
    childDisability,
    childFamily,
    finances,
    introduction,
    results,
    work,
  };
};
