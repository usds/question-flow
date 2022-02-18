# Logic

Logic is content that is (a) not copy, (b) not visible to customers and (c) part of the application's functionality.

If you need to make copy changes, see [`src/flow/content`](../content/README.md) or contact your CMS admin.

## Concepts

### Actions

Actions are responses to results (e.g. "if a customer is eligible, they can go here to apply"). Actions define conditions and direction (usually in the form of a link).

### Pages

Pages are staticly defined steps that occur at specific phases of the wizard (e.g. on start, on no result, on any result). Pages perform a specific function, usually to display some copy according to the current state of the wizard.

Page definition provides configuration for the position, appearance and content of the navigation buttons (next/previous).

### Questions

Questions are the bulk of the data present in the wizard. All question copy is located in the CMS. All question logic is defined here according to the [interface definition](packages/questionable/src/survey/IStep.ts). Questions can be associated with a Section (i.e. named category). Section allow for display logic, but this feature is not used in the current project.

Questions can also belong to a branch. Here, two branches exist: child and adult. Once the customer selects an answer to question `A`, the customer is then locked to either the adult or the child branch. Branches allow the questions to be filtered down to just the possible set based on branch assignment, which bypasses the need to specify requirements between every question--only questions within the same branch need to be related.

Questions have exit and entry criteria. Currently, only birthdate uses exit criteria (to prevent navigation forward if the customer is not over 18). Entry criteria determine whether the question will display or be skipped. 

Question `id` should not be modified (except to add new questions). The question logic joins to question copy by `id`, so be sure that the question ids in the CMS always line up with the question ids in logic.

### Results

Results are benefits for which a customer may be eligible. Results are calculated according to the requirements they define.

## Requirements

Requirements are a generic data structure which is used across all concepts. Entity relationships to requirements are always 1:many (i.e. for a single result, there may be many required answers). Requirements allow for complex expression of AND/OR logic between questions, minimum and maximum age qualifiers as well as a customized FRA (full retirement age) calculator.

```ts
{
  ageCalc:     (birthday: string) => !isFraCalculator(birthday, 12),
  explanation: 'Adults age 18 and over, but below FRA + 12 months',
  minAge:      EIGHTEEN,
  responses:   [
    OVER_18,
    {
      answers:  [YES, NO],
      question: D,
    },
  ],
},
```

Breaking down the above code, this requirement specifies that ALL of the following must be true:

- ageCalc: customer is at least 12 months away from FRA
- explanation: developer-facing explanation of the requirement
- minAge: customer is 18 or over
- reponses: for question id `D`, the customer has answered either `YES` or `NO`

## Notes, etc

The code in `logic` is written for developer convenience, not by any other requirement. Due to the complexity of the questionnaire, it becomes difficult to comprehend the intention of the logic when the logic is presented as pure JSON. In order to improve readability, expect extensive use of variables, constants, comments and recycled, named objects (e.g. `OVER_18`).