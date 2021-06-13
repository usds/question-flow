/*
  eslint-disable max-len,
                sonarjs/no-duplicate-string,
 */
import { QUESTION_TYPE }   from '../../../../lib/enums';
import { IQuestion }       from '../../../../survey/IQuestion';
import { isFraCalculator } from './calculator.flow';

/**
 * All of the questions, their answers and dependencies
 */
export const questions: IQuestion[] = [
  {
    answers: [
      { id: '0', title: 'An adult (age 18 and over)' },
      { id: '1', title: 'A child (under age 18)' },
    ],
    id:            'A',
    internalNotes: 'Everyone',
    section:       { id: 'introduction' },
    subTitle:      'To check eligibility for someone else, answer the questions based on their situation.',
    title:         'Who do you want to check eligibility for?',
    type:          QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers:      [],
    id:           'B',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            question: { id: 'A' },
          },
        ],
        explanation: 'Is 18 or older',
      },
    ],
    section:  { id: 'introduction' },
    subTitle: "Most benefits have age requirements, so we'll use your birthday to see how old you are.",
    title:    'Enter your birthday.',
    type:     QUESTION_TYPE.DOB,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
    ],
    id:           'C',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            question: { id: 'A' },
          },
        ],
        explanation: 'Is 18 or older',
        maxAge:      {
          months: 1,
          years:  19,
        },
        minAge: {
          months: 0,
          years:  18,
        },
      },
    ],
    section: { id: 'a0_work' },
    title:   'Do you attend high school full time?',
    type:    QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
    ],
    id: 'D',

    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            question: { id: 'A' },
          },
        ],
        explanation: 'Is 18 or older',
      },
    ],
    section:  { id: 'a0_work' },
    subTitle: "When you work, part of your paycheck goes into benefits. That's why your work history is a primary consideration.",
    title:    'Have you ever had a job in the United States?',
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
    ],
    id: 'E',

    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            question: { id: 'D' },
          },
        ],
        explanation: 'Has worked at all',
        minAge:      {
          months: 8,
          years:  61,
        },
      },
    ],
    section:  { id: 'a0_work' },
    subTitle: "How long you've worked is also important. Ten years is often the magic number that's required.",
    title:    "Think about the jobs you've had in the past. Have you worked for a total of 10 years or more?",
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
    ],
    id:            'F',
    info:          'If your answer is "Yes", you may have heard doctors, social workers, and others say you have a disability.',
    internalNotes: 'Adults age 18 and over, but below FRA + 12 months',
    requirements:  [
      {
        ageCalc:     (birthday) => !isFraCalculator(birthday, 12),
        answers:     [],
        explanation: 'Younger than FRA + 12 months',
        minAge:      {
          months: 0,
          years:  18,
        },
      },
    ],
    section: { id: 'a0_work' },
    title:   'Do you have a condition, illness, or injury that limits the type of work you can do, or prevents you from working altogether? ',
    type:    QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
    ],
    id:           'G',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            question: { id: 'F' },
          },
        ],
        explanation: 'Is disabled and youger than FRA+ 12',
      },
    ],
    section:  { id: 'a0_work' },
    subTitle: 'benefits are there for you when your work is impacted for a long period of time.',
    title:    'Do you expect the condition, illness, or injury to affect your ability to work for a year or more, or be terminal?',
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', title: 'Before my 22nd birthday' },
      { id: '1', title: 'After my 22nd birthday' },
    ],
    id:           'H',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            question: { id: 'G' },
          },
        ],
        explanation: 'Has disability',
        minAge:      {
          months: 0,
          years:  22,
        },
      },
    ],
    section:  { id: 'a0_work' },
    subTitle: 'Some benefits consider if it started to affect you when you were a kid, teenager, or young adult.',
    title:    'When did the condition, illness, or injury start to affect your daily activities and ability to work?',
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: "Yes, but I'm separated from my spouse." },
      { id: '2', order: 3, title: 'No, but I was in the past.' },
      { id: '3', order: 4, title: "No, I've never been married." },
    ],
    id:           'I',
    info:         "You may be eligible for certain benefits if you're legally married now or were in the past.",
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            question: { id: 'A' },
          },
        ],
        explanation: 'Adult age 18 and over',
      },
    ],
    section:  { id: 'a0_family' },
    subTitle: 'Long-term partnerships often resemble marriage, but our benefits require legal recognition in your state.',
    title:    'Are you married?',
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
    ],
    id:           'J',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            question: { id: 'A' },
          },
          {
            answers:  [{ id: '0' }],
            question: { id: 'I' },
          },
        ],
        explanation: 'Married',
      },
    ],
    section:  { id: 'a0_family' },
    subTitle: 'Your own eligibility for certain benefits depends on whether your spouse gets payments right now.',
    title:    'Does your spouse get benefits checks every month?',
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
    ],
    id:           'K',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            question: { id: 'A' },
          },
          {
            answers:  [{ id: '1' }],
            question: { id: 'J' },
          },
        ],
        explanation: 'Spouse does not receive benefits',
        minAge:      {
          months: 0,
          years:  60,
        },
      },
    ],
    section: { id: 'a0_family' },
    title:   'Did you marry your spouse before you turned 60?',
    type:    QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
    ],
    id:           'L',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            question: { id: 'A' },
          },
          {
            answers:  [{ id: '2' }],
            question: { id: 'I' },
          },
        ],
        explanation: 'Not currently married but was in the past',
      },
    ],
    section:  { id: 'a0_family' },
    subTitle: "You may be eligible for benefits based on a former spouse's work history even though you're no longer connected to them through marriage.",
    title:    'Are you divorced?',
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
    ],
    id:           'M',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            question: { id: 'L' },
          },
        ],
        explanation: 'Divorced',
      },
    ],
    section:  { id: 'a0_family' },
    subTitle: 'How long you were married is an important factor. If you\'ve gotten divorced more than once, choose "Yes" if one of your marriages lasted for 10 years or more.',
    title:    'Were you married for 10 years or more before you got divorced?',
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
      { id: '2', title: "I don't know" },
    ],
    id:           'N',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            question: { id: 'M' },
          },
        ],
        explanation: 'Married 10 years or more before divorce',
      },
    ],
    section:  { id: 'a0_family' },
    subTitle: "How long they've worked is also important. Ten years is often the magic number that's required.",
    title:    'Has your former spouse worked for 10 years or more in the United States?',
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
    ],
    id:           'O',
    info:         '"Widowed" may not be a term you use to describe yourself. It means that your spouse passed away during your marriage. This may have happened recently or a long time ago.',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '1' }],
            question: { id: 'K' },
          },
        ],
        explanation: 'Married before 60',
      },
      {
        answers: [
          {
            answers:  [{ id: '1' }],
            question: { id: 'L' },
          },
        ],
        explanation: 'Not divorced',
      },
      {
        answers: [
          {
            answers:  [{ id: '1' }],
            question: { id: 'M' },
          },
        ],
        explanation: 'Married >= 10 years before divorce',
      },
      {
        answers: [
          {
            answers: [
              // Former spouse worked >= 10 years
              { id: '1' },
              // Former spouse work history is unknown
              { id: '2' },
            ],
            question: { id: 'N' },
          },
        ],
        explanation: 'Former spouse worked',
      },
    ],
    section: { id: 'a0_family' },
    title:   'Are you widowed?',
    type:    QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
    ],
    id:           'P',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            // Widowed
            question: { id: 'O' },
          },
        ],
      },
    ],
    section:  { id: 'a0_family' },
    subTitle: "You may be eligible for benefits based on your former spouse's work history.",
    title:    'Did your spouse ever have a job in the United States before they passed away?',
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', title: 'Yes, I have kids under the age of 16 who I take care of.' },
      { id: '1', title: 'Yes, I have kids over the age of 16 who I take care of.' },
      { id: '2', title: "No, I don't have kids who I take care of." },
    ],
    id:           'Q',
    info:         'Some benefits consider your role as a birth, adoptive, or step parent.',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            // Applying for someone who is >= 18
            question: { id: 'A' },
          },
        ],
      },
    ],
    section: { id: 'a0_family' },
    title:   'Do you have kids who you take care of?',
    type:    QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
    ],
    id:           'R',
    info:         'If your answer is "Yes", you may have heard doctors, social workers, and others say they have a disability.',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            // Have children < 16
            question: { id: 'Q' },
          },
          {
            answers:  [{ id: '1' }],
            // Have children >= 16
            question: { id: 'Q' },
          },
        ],
      },
    ],
    section: { id: 'a0_family' },
    title:   'Do any of your kids have a condition or illness that significantly affects their daily activities?',
    type:    QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
    ],
    id:           'S',
    info:         'They may have been your birth, adoptive, or step parent. And, it may have happened recently or a long time ago.',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            // Attends high school
            question: { id: 'C' },
          },
        ],
        maxAge: {
          months: 1,
          years:  19,
        },
        minAge: {
          months: 0,
          years:  18,
        },
      },
      {
        answers: [
          {
            answers:  [{ id: '1' }],
            // Does not attend high school
            question: { id: 'C' },
          },
          {
            answers:  [{ id: '0' }],
            // Is disabled
            question: { id: 'G' },
          },
        ],
        maxAge: {
          months: 1,
          years:  19,
        },
        minAge: {
          months: 0,
          years:  18,
        },
      },
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            // Disabled before 22nd birthday
            question: { id: 'H' },
          },
        ],
        minAge: {
          months: 0,
          years:  19,
        },
      },
    ],
    section: { id: 'a0_family' },
    title:   'Have you experienced the loss of a parent?',
    type:    QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
    ],
    id:           'T',
    info:         'Choose "No" if a grandparent, aunt, uncle, or someone else who isn\'t your parent takes care of you.',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            // Has not lost a parent
            question: { id: 'S' },
          },
        ],
      },
    ],
    section: { id: 'a0_family' },
    title:   "We're sorry you lost a loved one. Do you have one or multiple surviving parents who take care of you?",
    type:    QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
      { id: '2', title: "I don't know" },
    ],
    id:           'U',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            // Has surving parent
            question: { id: 'T' },
          },
        ],
      },
      {
        answers: [
          {
            answers:  [{ id: '1' }],
            // Has not lost a parent
            question: { id: 'S' },
          },
        ],
      },
    ],
    section:  { id: 'a1_family' },
    subTitle: 'Your own eligibility depends on whether your parent(s) get payments right now.',
    title:    'Do your parent(s) receive benefits checks every month?',
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', title: "Yes. I'm able to pay for food and my home without difficulty." },
      { id: '1', title: "No. I make some money, but it's still difficult to pay for food and my home." },
      { id: '2', title: "No. I don't make any money, so it's difficult to pay for food and my home." },
    ],
    id:           'V',
    requirements: [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            // Applying for someone who is > 18
            question: { id: 'A' },
          },
        ],
      },
    ],
    section:  { id: 'a0_finances' },
    subTitle: "One of our benefits considers whether it's difficult to cover basic daily needs.",
    title:    'Are you able to pay for food and a home without difficulty?',
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
    ],
    id:            'W',
    info:          'If your answer is "Yes", you may have heard doctors, social workers, and others say they have a disability.',
    internalNotes: 'Children under 18',
    requirements:  [
      {
        answers: [
          {
            answers:  [{ id: '1' }],
            // Applying for someone who is <= 18
            question: { id: 'A' },
          },
        ],
      },
    ],
    section: { id: 'a1_disability' },
    title:   'Does the child have a condition or illness that significantly affects their daily activities?',
    type:    QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
    ],
    id:            'X',
    internalNotes: 'Children under 18',
    requirements:  [
      {
        answers: [
          {
            answers:  [{ id: '1' }],
            // Applying for someone who is <= 18
            question: { id: 'A' },
          },
          {
            answers:  [{ id: '0' }],
            // Child has disability
            question: { id: 'W' },
          },
        ],
      },
    ],
    section:  { id: 'a1_disability' },
    subTitle: "benefits are there for you when the child's daily activities are affected for a long period of time.",
    title:    'Do you expect the condition or illness to significantly affect their daily activities for a year or longer, or be terminal?',
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
    ],
    id:            'Y',
    info:          'The parent may have been their birth, adoptive, or step parent. And, it may have happened recently or a long time ago.',
    internalNotes: 'Children under 18',
    requirements:  [
      {
        answers: [
          {
            answers:  [{ id: '1' }],
            // Applying for someone who is <= 18
            question: { id: 'A' },
          },
        ],
      },
    ],
    section: { id: 'a1_family' },
    title:   'Has the child experienced the loss of a birth, adoptive, or step parent?',
    type:    QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
    ],
    id:            'Z',
    internalNotes: 'Children under 18',
    requirements:  [
      {
        answers: [
          {
            answers:  [{ id: '0' }],
            // Child has lost parent
            question: { id: 'Y' },
          },
        ],
      },
    ],
    section:  { id: 'a1_family' },
    subTitle: 'We realize you may be the surviving parent if you experienced the loss of your spouse.',
    title:    "We're sorry they've lost a loved one. Do they have one or multiple surviving parents who take care of them?",
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', order: 1, title: 'Yes' },
      { id: '1', order: 2, title: 'No' },
      { id: '2', title: "I don't know" },
    ],
    id:            'AA',
    internalNotes: 'Children under 18',
    requirements:  [
      {
        answers: [
          {

            answers:  [{ id: '0' }],
            // Has surving parent
            question: { id: 'Z' },
          },
        ],
      },
    ],
    section:  { id: 'a1_family' },
    subTitle: "The child's eligibility depends on whether their parent(s) get payments right now.",
    title:    'Do their parent(s) get benefits checks every month?',
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
  },
  {
    answers: [
      { id: '0', title: "Yes, they're able to pay for food and a home without difficulty." },
      { id: '1', title: "No, they make some money but it's difficult for them to pay for food and a home." },
      { id: '2', title: "No, they don't make any money and it's very difficult for them to pay for food and a home." },
      { id: '3', title: "I don't know if it's difficult for them to pay for food and a home." },
    ],
    id:            'AB',
    internalNotes: 'Children under 18',
    requirements:  [
      {
        answers: [
          {
            answers: [
              // Parents do get SS
              { id: '0' },
              // Parents do not get SS
              { id: '1' },
              // Parents SS status unknown
              { id: '2' },
            ],
            question: { id: 'AA' },
          },
        ],
      },
      {
        answers: [
          {

            answers:  [{ id: '0' }],
            // Has surving parent
            question: { id: 'Z' },
          },
        ],
      },
    ],
    section:  { id: 'a1_family' },
    subTitle: "One of our benefits considers whether it's difficult to cover basic daily needs.",
    title:    'Are the parent(s) who take care of them able to pay for food and a home without difficulty?',
    type:     QUESTION_TYPE.MULTIPLE_CHOICE,
  },
];
