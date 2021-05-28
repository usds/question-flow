/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { ACTION, QUESTION_TYPE } from '../../lib';
import { IAction } from '../../survey/IAction';
import { IQuestion } from '../../survey/IQuestion';
import { IResult } from '../../survey/IResult';
import { ISection } from '../../survey/ISection';
import { Questionnaire } from '../../survey/Questionnaire';
import { isFraCalculator } from './calculator.flow';

// NOTE: this data will typically come from an external source (e.g API, etc.)

const header = 'SSA Benefits Guide';

/**
 * All of the questions, their answers and dependencies
 */
const questions: IQuestion[] = [
  {
    id: QUESTION_TYPE.LANDING_STEP,
    questionType: QUESTION_TYPE.LANDING_STEP,
    questionText: 'Check eligibility for benefits',
    // supportingDetails: `By completing this workflow, we will determine what benefits you may be eligible for.`,
    // questionHelp: `This guide does not guarantee you will receive these benefits, but it will direct you to the resources required for those benefits which may apply to you. Remember that benefit eligibility changes as your life and circumstances change, so check again in the future as you may become eligible for more benfits then than you are now.`,
    answers: {},
    sectionId: QUESTION_TYPE.LANDING_STEP,
  },
  {
    id: 'A',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText: 'Who do you want to check eligibility for?',
    answers: {
      0: 'An adult (age 18 and over)',
      1: 'A child (under age 18)',
    },
    supportingDetails:
      'To check eligibility for someone else, answer the questions based on their situation.',
    sectionId: 'introduction',
    eligibilityNote: 'Anyone',
  },
  {
    id: 'B',
    questionType: QUESTION_TYPE.DOB,
    questionText: 'Enter your birthday.',
    supportingDetails:
      "Most Social Security benefits have age requirements, so we'll use your birthday to see how old you are.",
    sectionId: 'introduction',
    eligibilityNote: 'Adults age 18 and over',
    answers: {},
    requirements: [
      {
        answers: {
          A: [0],
        },
      },
    ],
  },
  {
    id: 'C',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText: 'Do you attend high school full time?',
    answers: {
      0: 'Yes',
      1: 'No',
    },
    sectionId: 'a0_work',
    eligibilityNote: 'Adults age 18 and over',
    requirements: [
      {
        minAge: {
          years: 18,
          months: 0,
        },
        maxAge: {
          years: 19,
          months: 1,
        },
        answers: {
          A: [0],
        },
      },
    ],
  },
  {
    id: 'D',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText: 'Have you ever had a job in the United States?',
    answers: {
      0: 'Yes',
      1: 'No',
    },
    supportingDetails:
      "When you work, part of your paycheck goes into Social Security. That's why your work history is a primary consideration.",
    sectionId: 'a0_work',
    eligibilityNote: 'Adults age 18 and over',
    requirements: [
      {
        answers: {
          A: [0],
        },
      },
    ],
  },
  {
    id: 'E',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText:
      "Think about the jobs you've had in the past. Have you worked for a total of 10 years or more?",
    answers: {
      0: 'Yes',
      1: 'No',
    },
    supportingDetails:
      "How long you've worked is also important. Ten years is often the magic number that's required.",
    sectionId: 'a0_work',
    eligibilityNote: 'Adults age 18 and over',
    requirements: [
      {
        minAge: {
          years: 61,
          months: 8,
        },
        answers: {
          D: [0], // Has worked at all
        },
      },
    ],
  },
  {
    id: 'F',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText:
      'Do you have a condition, illness, or injury that limits the type of work you can do, or prevents you from working altogether? ',
    answers: {
      0: 'Yes',
      1: 'No',
    },
    questionHelp:
      'If your answer is "Yes", you may have heard doctors, social workers, and others say you have a disability.',
    sectionId: 'a0_work',
    eligibilityNote: 'Adults age 18 and over, but below FRA + 12 months',
    requirements: [
      {
        minAge: {
          years: 18,
          months: 0,
        },
        // The customer must be younger than FRA + 12 months
        ageCalc: (birthday) => !isFraCalculator(birthday, 12),
        answers: {},
      },
    ],
  },
  {
    id: 'G',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText:
      'Do you expect the condition, illness, or injury to affect your ability to work for a year or more, or be terminal?',
    answers: {
      0: 'Yes',
      1: 'No',
    },
    supportingDetails:
      'Social Security benefits are there for you when your work is impacted for a long period of time.',
    sectionId: 'a0_work',
    eligibilityNote: 'Adults age 18 and over',
    requirements: [
      {
        answers: {
          F: [0], // Is disabled and younger than FRA + 12
        },
      },
    ],
  },
  {
    id: 'H',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText:
      'When did the condition, illness, or injury start to affect your daily activities and ability to work?',
    answers: {
      0: 'Before my 22nd birthday',
      1: 'After my 22nd birthday',
    },
    supportingDetails:
      'Some benefits consider if it started to affect you when you were a kid, teenager, or young adult.',
    sectionId: 'a0_work',
    eligibilityNote: 'Adults age 18 and over',
    requirements: [
      {
        minAge: {
          years: 22,
          months: 0,
        },
        answers: {
          G: [0],
        },
      },
    ],
  },
  {
    id: 'I',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText: 'Are you married?',
    questionHelp:
      "You may be eligible for certain benefits if you're legally married now or were in the past.",
    answers: {
      0: 'Yes',
      1: "Yes, but I'm separated from my spouse.",
      2: 'No, but I was in the past.',
      3: "No, I've never been married.",
    },
    supportingDetails:
      'Long-term partnerships often resemble marriage, but our benefits require legal recognition in your state.',
    sectionId: 'a0_family',
    eligibilityNote: 'Adults age 18 and over',
    requirements: [
      {
        answers: {
          A: [0],
        },
      },
    ],
  },
  {
    id: 'J',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText: 'Does your spouse get Social Security checks every month?',
    answers: {
      0: 'Yes',
      1: 'No',
    },
    supportingDetails:
      'Your own eligibility for certain benefits depends on whether your spouse gets payments right now.',
    sectionId: 'a0_family',
    eligibilityNote: 'Adults age 18 and over',
    requirements: [
      {
        answers: {
          A: [0],
          I: [0],
        },
      },
    ],
  },
  {
    id: 'K',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText: 'Did you marry your spouse before you turned 60?',
    answers: {
      0: 'Yes',
      1: 'No',
    },
    sectionId: 'a0_family',
    eligibilityNote: 'Adults age 18 and over',
    requirements: [
      {
        minAge: {
          years: 60,
          months: 0,
        },
        answers: {
          A: [0],
          J: [1], // Spouse does not get SS
        },
      },
    ],
  },
  {
    id: 'L',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText: 'Are you divorced?',
    answers: {
      0: 'Yes',
      1: 'No',
    },
    supportingDetails:
      "You may be eligible for benefits based on a former spouse's work history even though you're no longer connected to them through marriage.",
    sectionId: 'a0_family',
    eligibilityNote: 'Adults age 18 and over',
    requirements: [
      {
        answers: {
          A: [0],
          I: [2],
        },
      },
    ],
  },
  {
    id: 'M',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText:
      'Were you married for 10 years or more before you got divorced?',
    answers: {
      0: 'Yes',
      1: 'No',
    },
    supportingDetails:
      'How long you were married is an important factor. If you\'ve gotten divorced more than once, choose "Yes" if one of your marriages lasted for 10 years or more.',
    sectionId: 'a0_family',
    eligibilityNote: 'Adults age 18 and over',
    requirements: [
      {
        answers: {
          L: [0], // Divorced
        },
      },
    ],
  },
  {
    id: 'N',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText:
      'Has your former spouse worked for 10 years or more in the United States?',
    answers: {
      0: 'Yes',
      1: 'No',
      2: "I don't know",
    },
    supportingDetails:
      "How long they've worked is also important. Ten years is often the magic number that's required.",
    sectionId: 'a0_family',
    eligibilityNote: 'Adults age 18 and over',
    requirements: [
      {
        answers: {
          M: [0], // Married > 10 years before divorce
        },
      },
    ],
  },
  {
    id: 'O',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText: 'Are you widowed?',
    answers: {
      0: 'Yes',
      1: 'No',
    },
    questionHelp:
      '"Widowed" may not be a term you use to describe yourself. It means that your spouse passed away during your marriage. This may have happened recently or a long time ago.',
    sectionId: 'a0_family',
    eligibilityNote: 'Adults age 18 and over',
    requirements: [
      {
        answers: {
          K: [1], // Married before 60
        },
      },
      {
        answers: {
          L: [1], // Not divorced
        },
      },
      {
        answers: {
          M: [1], // Married >= 10 years before divorce
        },
      },
      {
        answers: {
          N: [
            1, // Former spouse worked >= 10 years
            2, // Former spouse work history unknown
          ],
        },
      },
    ],
  },
  {
    id: 'P',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText:
      'Did your spouse ever have a job in the United States before they passed away?',
    answers: {
      0: 'Yes',
      1: 'No',
    },
    supportingDetails:
      "You may be eligible for benefits based on your former spouse's work history.",
    sectionId: 'a0_family',
    eligibilityNote: 'Adults age 18 and over',
    requirements: [
      {
        answers: {
          O: [0], // Widowed
        },
      },
    ],
  },
  {
    id: 'Q',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText: 'Do you have kids who you take care of?',
    answers: {
      0: 'Yes, I have kids under the age of 16 who I take care of.',
      1: 'Yes, I have kids over the age of 16 who I take care of.',
      2: "No, I don't have kids who I take care of.",
    },
    questionHelp:
      'Some benefits consider your role as a birth, adoptive, or step parent.',
    sectionId: 'a0_family',
    eligibilityNote: 'Adults age 18 and over',
    requirements: [
      {
        answers: {
          A: [0],
        },
      },
    ],
  },
  {
    id: 'R',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText:
      'Do any of your kids have a condition or illness that significantly affects their daily activities?',
    answers: {
      0: 'Yes',
      1: 'No',
    },
    questionHelp:
      'If your answer is "Yes", you may have heard doctors, social workers, and others say they have a disability.',
    sectionId: 'a0_family',
    eligibilityNote: 'Adults age 18 and over',
    requirements: [
      {
        answers: {
          Q: [
            0, // Have children < 16
            1, // Have childred >= 16
          ],
        },
      },
    ],
  },
  {
    id: 'S',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText:
      'Have you experienced the loss of a parent?',
    answers: {
      0: 'Yes',
      1: 'No',
    },
    questionHelp:
      'They may have been your birth, adoptive, or step parent. And, it may have happened recently or a long time ago.',
    sectionId: 'a0_family',
    eligibilityNote: 'Adults age 18 and over',
    requirements: [
      {
        minAge: {
          years: 18,
          months: 0,
        },
        maxAge: {
          years: 19,
          months: 1,
        },
        answers: {
          C: [0], // Attends high school
        },
      },
      {
        minAge: {
          years: 18,
          months: 0,
        },
        maxAge: {
          years: 19,
          months: 1,
        },
        answers: {
          C: [1], // Does not attend high school
          G: [0], // Is disabled
        },
      },
      {
        minAge: {
          years: 19,
          months: 0,
        },
        answers: {
          H: [0], // Disabled before 22nd birthday
        },
      },
    ],
  },
  {
    id: 'T',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText:
      "We're sorry you lost a loved one. Do you have one or multiple surviving parents who take care of you?",
    answers: {
      0: 'Yes',
      1: 'No',
    },
    questionHelp:
      'Choose "No" if a grandparent, aunt, uncle, or someone else who isn\'t your parent takes care of you.',
    sectionId: 'a0_family',
    eligibilityNote: 'Adults age 18 and over',
    requirements: [
      {
        answers: {
          S: [0], // Has lost a parent
        },
      },
    ],
  },
  {
    id: 'U',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText:
      'Do your parent(s) receive Social Security checks every month?',
    answers: {
      0: 'Yes',
      1: 'No',
      2: "I don't know",
    },
    supportingDetails:
      'Your own eligibility depends on whether your parent(s) get payments right now.',
    sectionId: 'a1_family',
    eligibilityNote: 'Adults age 18 and over',
    requirements: [
      {
        answers: {
          T: [0], // Has surving parent
        },
      },
      {
        answers: {
          S: [1], // Has not lost a parent
        },
      },
    ],
  },
  {
    id: 'V',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText: 'Are you able to pay for food and a home without difficulty?',
    answers: {
      0: "Yes. I'm able to pay for food and my home without difficulty.",
      1: "No. I make some money, but it's still difficult to pay for food and my home.",
      2: "No. I don't make any money, so it's difficult to pay for food and my home.",
    },
    supportingDetails:
      "One of our benefits considers whether it's difficult to cover basic daily needs.",
    sectionId: 'a0_finances',
    eligibilityNote: 'Adults age 18 and over',
    requirements: [
      {
        answers: {
          A: [0],
        },
      },
    ],
  },
  {
    id: 'W',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText:
      'Does the child have a condition or illness that significantly affects their daily activities?',
    answers: {
      0: 'Yes',
      1: 'No',
    },
    questionHelp:
      'If your answer is "Yes", you may have heard doctors, social workers, and others say they have a disability.',
    sectionId: 'a1_disability',
    eligibilityNote: 'Children under 18',
    requirements: [
      {
        answers: {
          A: [1],
        },
      },
    ],
  },
  {
    id: 'X',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText:
      'Do you expect the condition or illness to significantly affect their daily activities for a year or longer, or be terminal?',
    answers: {
      0: 'Yes',
      1: 'No',
    },
    sectionId: 'a1_disability',
    supportingDetails:
      "Social Security benefits are there for you when the child's daily activities are affected for a long period of time.",
    eligibilityNote: 'Children under 18',
    requirements: [
      {
        answers: {
          A: [1],
          W: [0], // Child has disability
        },
      },
    ],
  },
  {
    id: 'Y',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText:
      'Has the child experienced the loss of a birth, adoptive, or step parent?',
    answers: {
      0: 'Yes',
      1: 'No',
    },
    questionHelp:
      'The parent may have been their birth, adoptive, or step parent. And, it may have happened recently or a long time ago.',
    sectionId: 'a1_family',
    eligibilityNote: 'Children under 18',
    requirements: [
      {
        answers: {
          A: [1], // Applying for someone who is <= 18
        },
      },
    ],
  },
  {
    id: 'Z',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText:
      "We're sorry they've lost a loved one. Do they have one or multiple surviving parents who take care of them?",
    answers: {
      0: 'Yes',
      1: 'No',
    },
    supportingDetails:
      'We realize you may be the surviving parent if you experienced the loss of your spouse.',
    sectionId: 'a1_family',
    eligibilityNote: 'Children under 18',
    requirements: [
      {
        answers: {
          Y: [0], // Child has lost a parent
        },
      },
    ],
  },
  {
    id: 'AA',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText: 'Do their parent(s) get Social Security checks every month?',
    answers: {
      0: 'Yes',
      1: 'No',
      2: "I don't know",
    },
    supportingDetails:
      "The child's eligibility depends on whether their parent(s) get payments right now.",
    sectionId: 'a1_family',
    eligibilityNote: 'Children under 18',
    requirements: [
      {
        answers: {
          Z: [0], // Has surviving parent
        },
      },
    ],
  },
  {
    id: 'AB',
    questionType: QUESTION_TYPE.MULTIPLE_CHOICE,
    questionText:
      'Are the parent(s) who take care of them able to pay for food and a home without difficulty?',
    answers: {
      0: "Yes, they're able to pay for food and a home without difficulty.",
      1: "No, they make some money but it's difficult for them to pay for food and a home.",
      2: "No, they don't make any money and it's very difficult for them to pay for food and a home.",
      3: "I don't know if it's difficult for them to pay for food and a home.",
    },
    supportingDetails:
      "One of our benefits considers whether it's difficult to cover basic daily needs.",
    sectionId: 'a1_family',
    eligibilityNote: 'Children under 18',
    requirements: [
      {
        answers: {
          AA: [
            0, // Parents do get SS
            1, // Parents do not get SS
            2, // Parents SS status unknown
          ],
        },
      },
      {
        answers: {
          Z: [0], // Has surving parent
        },
      },
    ],
  },
  {
    id: QUESTION_TYPE.SUMMARY_STEP,
    questionType: QUESTION_TYPE.SUMMARY_STEP,
    questionText: 'Review your answers',
    supportingDetails:
      'If everything looks correct, click "Submit" to view your results; otherwise, go back and change your asnwers as needed.',
    questionHelp: '',
    answers: {},
    sectionId: 'results',
  },
  {
    id: QUESTION_TYPE.RESULTS_STEP,
    questionType: QUESTION_TYPE.RESULTS_STEP,
    questionText: 'You may be eligible for Social Security benefits.',
    supportingDetails: '',
    questionHelp:
      'Each benefit we provide has an official name. You may see these names in other materials or hear our employees use them on the phone and in our offices.',
    answers: {},
    sectionId: 'results',
    body: `This gives you an idea of what you may be eligible for, but we can't guarantee you'll get these benefits. We'll analyze more details during the application process to provide a definite answer.
<p/>
The information you shared today tells us about your current situation. In the future, you may become eligible for other benefits as you age or things in your life change.`,
  },
  {
    id: QUESTION_TYPE.NO_RESULTS_STEP,
    questionType: QUESTION_TYPE.NO_RESULTS_STEP,
    questionText: 'You may not be eligible for Social Security benefits.',
    supportingDetails:
      'You can <a href="#">apply for benefits</a> but based on what you told us today, you may not be eligible at this time.',
    questionHelp: '',
    answers: {},
    sectionId: 'results',
    footer:
      'The information you shared today tells us about your current situation. In the future, you may become eligible for benefits as you age or things in your life change.',
  },
];

/**
 * All possible results with their requirements
 */
const results: IResult[] = [
  {
    name: 'Retirement',
    code: 'RS.00201.001',
    description: 'Retirement',
    requirements: [
      {
        minAge: {
          years: 61,
          months: 8,
        },
        answers: {
          E: [0], // Has worked for >= 10 years
        },
        explanation:
          "You've worked for 10 years or more and meet our age requirements.",
      },
    ],
  },
  {
    name: 'Disability',
    code: 'DI.10105.060',
    description:
      'Disability, also referred to as Social Security Disability Insurance (SSDI)',
    requirements: [
      {
        minAge: {
          years: 18,
          months: 0,
        },
        ageCalc: (birthday) => !isFraCalculator(birthday, 12),
        answers: {
          G: [0], // Is between 18 to FRA and is disabled
        },
        explanation:
          'You expect a condition, illness, or injury to affect your ability to work for a year or more.',
      },
    ],
  },
  {
    name: 'SSI Benefits',
    code: 'SI.00501.001',
    description: 'Supplemental Security Income (SSI)',
    requirements: [
      {
        minAge: {
          years: 65,
          months: 0,
        },
        answers: {
          V: [
            1, // Has trouble paying bills
            2, // Cannot make ends meet
          ],
        },
        explanation:
          "You're 65 or older and said you have difficulty paying for food and a home.",
      },
      {
        minAge: {
          years: 18,
          months: 0,
        },
        answers: {
          G: [0], // Is disabled
          V: [
            1, // Has trouble paying bills
            2, // Cannot make ends meet
          ],
        },
        explanation:
          'You said you have difficulty paying for food and a home. And, a disability affects your ability to work.',
      },
      {
        answers: {
          A: [1], // is under 18
          X: [1], // Is disabled
        },
        explanation:
          "You expect a condition or illness to significantly affect the child's daily activities for a year or more. And, their parent(s) have difficulty paying for food and a home.",
      },
    ],
  },
  {
    name: 'Medicare',
    code: 'HI.00801.006 / .191 / .146, HI.00805.005',
    description: 'Medicare',
    requirements: [
      {
        minAge: {
          years: 64,
          months: 0,
        },
        maxAge: {
          years: 65,
          months: 3,
        },
        answers: {},
        explanation: 'You are between 64 years and 65 years and 3 months old.',
      },
    ],
  },
  {
    name: 'Spouse',
    code: 'RS.00202.001',
    description: 'Spouse',
    requirements: [
      {
        minAge: {
          years: 62,
          months: 0,
        },
        answers: {
          I: [
            0, // Is married
            1, // Is married but separated
          ],
          J: [0], // Spouse has benefits
        },
        explanation:
          "You're 62 or older and your spouse gets Social Security checks every month.",
      },
    ],
  },
  {
    name: 'Spouse with Child in Care',
    code: 'RS.01310.001, RS. 00208.005',
    description: 'Spouse with Child in Care',
    requirements: [
      {
        minAge: {
          years: 18,
          months: 0,
        },
        ageCalc: (birthday) => !isFraCalculator(birthday),
        answers: {
          I: [0], // Is married
          J: [0], // Spouse has benefits
          Q: [0], // Has children < 16
          R: [
            0, // Children are not disabled
            1, // Children are disabled
          ],
        },
        explanation:
          'Your spouse gets Social Security checks every month and you take care of kids under the age of 16.',
      },
      {
        minAge: {
          years: 18,
          months: 0,
        },
        ageCalc: (birthday) => !isFraCalculator(birthday),
        answers: {
          I: [0], // Is married
          J: [0], // Spouse has benefits
          Q: [1], // Has children >= 16
          R: [1], // Children are disabled
        },
        explanation:
          'Your spouse gets Social Security checks every month and you take care of disabled kids over the age of 16.',
      },
      {
        minAge: {
          years: 62,
          months: 0,
        },
        ageCalc: (birthday) => !isFraCalculator(birthday),
        answers: {
          I: [2], // Not married, but was in past
          N: [
            0, // Divorced after >= 10 years && ex-spouse has benefits
            2, // Divorced after >= 10 years && unknown if ex-spouse has benefits
          ],
          Q: [0], // Has children < 16
          R: [
            0, // Children are not disabled
            1, // Children are disabled
          ],
        },
        explanation:
          'You were married for 10 years or more in the past and your former spouse worked. And, you take care of kids under the age of 16.',
      },
      {
        minAge: {
          years: 62,
          months: 0,
        },
        ageCalc: (birthday) => !isFraCalculator(birthday),
        answers: {
          I: [2], // Not married, but was in past
          N: [
            0, // Divorced after >= 10 years && ex-spouse has benefits
            2, // Divorced after >= 10 years && unknown if ex-spouse has benefits
          ],
          Q: [1], // Has children >= 16
          R: [1], // Children are disabled
        },
        explanation:
          'You were married for 10 years or more in the past and your former spouse worked. And, you take care of disabled kids over the age of 16.',
      },
    ],
  },
  {
    name: 'Divorced spouse',
    code: 'RS.00202.005',
    description: 'Divorced Spouse',
    requirements: [
      {
        minAge: {
          years: 62,
          months: 0,
        },
        answers: {
          I: [2], // Not married, but was in past
          N: [
            0, // Divorced after >= 10 years && ex-spouse has benefits
            2, // Divorced after >= 10 years && unknown if ex-spouse has benefits
          ],
          Q: [0], // Has children < 16
          R: [
            0, // Children are not disabled
            1, // Children are disabled
          ],
        },
        explanation:
          "You're 62 or older, were married for 10 years or more in the past, and your former spouse worked.",
      },
    ],
  },
  {
    name: 'Widow(ers) benefits',
    code: 'RS.00207.001',
    description: 'Widowers',
    requirements: [
      {
        minAge: {
          years: 60,
          months: 0,
        },
        answers: {
          I: [2], // Not married, but was in past
          O: [0], // Spouse is deceased
          P: [0], // Deceased spouse worked
        },
        explanation:
          "You're 60 or older and lost your spouse.  And, your spouse worked before they passed away.",
      },
    ],
  },
  {
    name: 'Disabled widow(ers) benefits',
    code: 'RS.00207.001',
    description: 'Disabled Widowers',
    requirements: [
      {
        minAge: {
          years: 50,
          months: 0,
        },
        maxAge: {
          years: 59,
          months: 11,
        },
        answers: {
          G: [0], // Disabled
          I: [2], // Not married, but was in past
          O: [0], // Spouse is deceased
          P: [0], // Deceased spouse worked
        },
        explanation:
          "You're between the ages of 50 and 60 and lost your spouse. And, you expect a condition, illness, or injury to affect your ability to work for a year or more.",
      },
    ],
  },
  {
    name: 'Lump sum death payment',
    code: 'RS.00210.001',
    description: 'Lump Sum Death Payment, a one-time payment',
    requirements: [
      {
        answers: {
          A: [1], // Childer under 18
          Y: [0], // Child has experienced loss of parent
        },
        explanation: 'The child lost a parent.',
      },
      {
        minAge: {
          years: 18,
          months: 0,
        },
        answers: {
          O: [0], // Spouse is deceased
          P: [0], // Deceased spouse worked
        },
        explanation: 'You lost your spouse.',
      },
      {
        minAge: {
          years: 18,
          months: 0,
        },
        answers: {
          S: [0], // Has lost a parent
        },
        explanation: 'You lost a parent.',
      },
    ],
  },
  {
    name: "Child's benefits (Auxiliary)",
    code: 'RS.00203.001',
    description: "Child's Auxiliary",
    requirements: [
      {
        answers: {
          A: [1], // Child under 18
          AA: [
            0, // Parents receive SS
            2, // Unknown if parents receive SS
          ],
        },
        explanation:
          "The child's parent(s) may get Social Security checks every month.",
      },
      {
        minAge: {
          years: 18,
          months: 0,
        },
        maxAge: {
          years: 19,
          months: 1,
        },
        answers: {
          C: [1], // Is in high school
          U: [
            0, // Parents receive SS
            2, // Unknown if parents receive SS
          ],
        },
        explanation:
          'You go to high school full time and your parent(s) may get Social Security checks every month.',
      },
      {
        minAge: {
          years: 18,
          months: 0,
        },
        answers: {
          G: [0], // Disabled
          H: [0], // Disabled before 22
          U: [
            0, // Parents receive SS
            2, // Unknown if parents receive SS
          ],
        },
        explanation:
          'You expect a condition, illness, or injury to affect your ability to work for a year or more. And it started to affect you before your 22nd birthday. Your parent(s) may get Social Security checks every month.',
      },
    ],
  },
  {
    name: "Child's benefits (Survivor)",
    code: 'RS.00203.001',
    description: "Child's Survivor",
    requirements: [
      {
        minAge: {
          years: 18,
          months: 0,
        },
        maxAge: {
          years: 19,
          months: 1,
        },
        answers: {
          C: [1], // Is in high school
          S: [0], // Has lost a parent
        },
        explanation: 'The child lost a parent.',
      },
      {
        answers: {
          A: [1], // Child under 18
          Y: [0], // Child has experienced loss of parent
        },
        explanation: 'The child lost a parent.',
      },
      {
        minAge: {
          years: 18,
          months: 0,
        },
        answers: {
          G: [0], // Disabled
          H: [0], // Disabled before 22
          S: [0], // Has lost a parent
        },
        explanation:
          'You expect a condition, illness, or injury to affect your ability to work for a year or more. And it started to affect you before your 22nd birthday. You also lost a parent.',
      },
    ],
  },
  {
    name: 'Childhood disability benefit',
    code: 'DI.10115.001',
    description: 'Childhood Disability',
    requirements: [
      {
        answers: {
          A: [1], // Child under 18
          X: [0], // Child is disabled
        },
        explanation:
          "A condition or illness is expected to significantly affect the child's daily activities for a year or more.",
      },
    ],
  },
  {
    name: 'Student benefits (Auxilary)',
    code: 'RS.00205.001',
    description: 'Student Auxiliary',
    requirements: [
      {
        minAge: {
          years: 18,
          months: 0,
        },
        maxAge: {
          years: 19,
          months: 1,
        },
        answers: {
          C: [1], // Is in high school
          U: [
            0, // Parents receive SS
            2, // Unknown if parents receive SS
          ],
        },
        explanation:
          'You go to high school full time and your parent(s) may get Social Security checks every month.',
      },
    ],
  },
  {
    name: 'Student benefits (Survivor)',
    code: 'RS.00205.001',
    description: 'Student Survivor',
    requirements: [
      {
        minAge: {
          years: 18,
          months: 0,
        },
        maxAge: {
          years: 19,
          months: 1,
        },
        answers: {
          C: [1], // Is in high school
          S: [0], // Has lost a parent
        },
        explanation: 'You go to high school full time and lost a parent.',
      },
    ],
  },
  {
    name: "Mother/Father's benefits",
    code: 'RS.00208.001',
    description: "Mothers and Father's",
    requirements: [
      {
        minAge: {
          years: 18,
          months: 0,
        },
        answers: {
          P: [0], // Spouse is deceased and worked
          Q: [0], // Has children < 16
        },
        explanation:
          'You lost your spouse and they worked before they passed away. And, you take care of disabled kids over the age of 16.',
      },
    ],
  },
];

const actions: IAction[] = [
  {
    name: 'Apply Online',
    description:
      'Answer more questions and upload documents to apply for the benefits you may be eligible for.',
    title: 'How to apply',
    type: ACTION.online,
    action: '<a href="#">Start application</a>',
  },
  {
    name: 'Technician Assisted',
    description:
      "Call us to schedule an appointment to apply for the benefits you may be eligible for. When it's time for your appointment, we'll call you to complete your application over the phone.",
    title: 'How to apply',
    type: ACTION.call,
    action: 'Call <a href="#">1-800-772-1213</a> to schedule an appointment',
  },
  {
    name: 'Apply Online & Technician Assisted',
    description:
      "Answer more questions and upload documents to apply for the benefits you may be eligible for. After you submit the application here on the website, we'll call you to get more information and finalize your application.",
    title: 'How to apply',
    type: ACTION.hybrid,
    action: '<a href="#">Start application</a>',
  },
];

const sections: ISection[] = [
  {
    id: 'introduction',
    name: 'Introduction',
    requirements: [
      {
        answers: {
          A: [0, 1], // All
        },
      },
    ],
  },
  {
    id: 'a0_work',
    name: 'Work',
    requirements: [
      {
        answers: {
          A: [0], // Only for adults
        },
      },
    ],
  },
  {
    id: 'a0_family',
    name: 'Family',
    requirements: [
      {
        answers: {
          A: [0], // Adults
        },
      },
    ],
  },
  {
    id: 'a0_finances',
    name: 'Finances',
    requirements: [
      {
        answers: {
          A: [0], // Only for adults
        },
      },
    ],
  },
  {
    id: 'a1_disability',
    name: 'Disability',
    requirements: [
      {
        answers: {
          A: [1], // < 18
        },
      },
    ],
  },
  {
    id: 'a1_family',
    name: 'Family',
    requirements: [
      {
        answers: {
          A: [1], // < 18
        },
      },
    ],
  },
  {
    id: 'results',
    name: 'Results',
    requirements: [
      {
        answers: {
          A: [0, 1], // All ages
        },
      },
    ],
  },
];

export const questionnaire = new Questionnaire({
  questions,
  actions,
  header,
  sections,
  results,
});
