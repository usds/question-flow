/* eslint-disable  */

export const content = {
  actions: {
    a0: {
      buttons: [
        {
          id: 'ab1',
          link: 'https://www.ssa.gov',
          title: 'Start Application',
        },
      ],
      id: 'a0',
      label: 'How to apply',
      subTitle:
        "First, enter your personal information to start an application online. Then, we'll call you to get more details and complete your application over the phone.",
      title: 'Start an application online and complete it by phone',
    },
    a1: {
      buttons: [
        {
          id: 'ab2',
          link: 'tel:+18007721213',
          title: '1-800-772-1213',
          type: 'link',
        },
        {
          id: 'ab3',
          link: 'tel:+18003250778',
          title: 'TTY 1-800-325-0778',
          type: 'link',
        },
      ],
      id: 'a1',
      label: 'How to apply',
      subTitle:
        "Call us to schedule an appointment. When it's time for your appointment, we'll call you and complete your application over the phone.",
      title: 'Complete an application by phone',
    },
    a2: {
      buttons: [
        {
          id: 'ab1',
          link: 'https://www.ssa.gov',
          title: 'Start Application',
        },
        {
          id: 'ab2',
          link: 'tel:+18007721213',
          title: '1-800-772-1213',
          type: 'link',
        },
        {
          id: 'ab3',
          link: 'tel:+18003250778',
          title: 'TTY 1-800-325-0778',
          type: 'link',
        },
      ],
      id: 'a2',
      label: 'How to apply',
      subTitle:
        "Answer more questions and upload documents to apply for the benefits you may be eligible for. After you submit the application here on the website, we'll call you to get more information and finalize your application.",
      title: 'Start online, then schedule an appointment by phone',
    },
    a3: {
      buttons: [
        {
          id: 'ab1',
          link: 'https://www.ssa.gov',
          title: 'Start Application',
        },
        {
          id: 'ab2',
          link: 'tel:+18007721213',
          title: '1-800-772-1213',
          type: 'link',
        },
        {
          id: 'ab3',
          link: 'tel:+18003250778',
          title: 'TTY 1-800-325-0778',
          type: 'link',
        },
      ],
      id: 'a3',
      label: 'How to apply',
      title:
        'Call us if you have questions or think you may be eligible for benefits',
    },
  },
  pages: {
    landingPage: {
      body: "To receive benefits, you have to meet certain requirements. We'll guide you through a series of questions to determine if you may be eligible.",
      buttons: {
        next: {
          id: 'pb1',
          title: 'Get Started',
        },
      },
      id: 'Landing',
      title: 'Check eligibility for benefits',
    },
    noResultsPage: {
      body: 'If you want to apply anyway, review the process and start an application.',
      id: 'No Results',
      subTitle:
        'Based on your answers, you may not be eligible for benefits right now. As you age and aspects of your life change, you may become eligible.',
      title: 'You may not be eligible for benefits.',
    },
    resultsPage: {
      body: "The answers you shared today told us what's going on in your life right now. As you age and aspects of your life change, you may be eligible for other Social Security benefits.",
      bodyHeader:
        "This gives you an idea of what you may be eligible for, but we can't guarantee you'll get these benefits. We'll provide a definite answer after you complete the application process.",
      id: 'Results',
      info: 'Each benefit we provide has an official name. You may see these names in other materials or hear our employees use them on the phone and in our offices.',
      subTitle:
        "Based on your answers, here's what you may be eligible for and why:",
      title: 'You may be eligible for Social Security benefits.',
    },
    summaryPage: {
      buttons: {
        next: {
          id: 'pb2',
          title: 'Submit',
        },
      },
      id: 'Summary',
      subTitle:
        'If everything looks correct, click "Submit" to view your results; otherwise, go back and change your answers as needed.',
      title: 'Review your answers',
    },
  },
  questions: {
    A: {
      answers: [
        {
          id: '0',
          title: 'An adult (age 18 and over)',
        },
        {
          id: '1',
          title: 'A child (under age 18)',
        },
      ],
      id: 'A',
      title: 'Who do you want to check eligibility for?',
    },
    AA: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'AA',
      title:
        "We're sorry for their loss. Do they have one or multiple surviving parents?",
    },
    B: {
      answers: [],
      id: 'B',
      info: "Most Social Security benefits have age requirements, so we'll use your birthday to see how old you are.",
      subTitle: 'M DD YYYY',
      title: 'Enter your birthday.',
    },
    BB: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
        {
          id: '2',
          title: "I don't know",
        },
      ],
      id: 'BB',
      info: 'If their parent(s) get Social Security payments right now, they may be eligible for one of our benefits for children.',
      title: 'Do their parent(s) get Social Security benefits?',
    },
    C: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'C',
      title: 'Do you go to high school full time?',
    },
    CC: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
        {
          id: '2',
          title: "I don't know",
        },
      ],
      id: 'CC',
      title: 'Do their parent(s) receive income from a job right now?',
    },
    D: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'D',
      info: "When you work, part of your paycheck goes into Social Security. That's why your work history is a primary consideration.",
      title: 'Have you ever had a job in the United States?',
    },
    DD: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
        {
          id: '2',
          title: "I don't know",
        },
      ],
      id: 'DD',
      subTitle:
        'Supplemental Nutritional Assistance Program (SNAP), Medicaid, and Temporary Assistance for Needy Families (TANF) are a few examples.',
      title:
        'Do their parent(s) get state or federal government assistance to help cover basic needs?',
    },
    E: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'E',
      title: 'Do you receive income from a job right now?',
    },
    EE: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
        {
          id: '2',
          title: "I don't know",
        },
      ],
      id: 'EE',
      info: 'One of our benefits provides assistance if their income and financial resources are limited.',
      title:
        'Is it hard for their parent(s) to pay for basic needs like food, clothing, and a home?',
    },
    F: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'F',
      info: "How long you've worked is also important. Ten years is often what's required.",
      title:
        "Think about the jobs you've had in the past. Have you worked for a total of 10 years or more?",
    },
    G: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'G',
      subTitle:
        'If your answer is "Yes," you may have heard doctors, social workers, and others say you have a disability.',
      title:
        "Do you have a condition that prevents you from working or limits the type of work you're able to do?",
    },
    H: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'H',
      info: 'Our disability benefit is there for you when your ability to work is affected for a long time.',
      title:
        'Do you expect the condition to affect your ability to work for a year or more or be terminal?',
    },
    I: {
      answers: [
        {
          id: '0',
          title: 'Before my 22nd birthday',
        },
        {
          id: '1',
          title: 'After my 22nd birthday',
        },
      ],
      id: 'I',
      info: 'One of our benefits looks at whether the condition started to affect you when you were a kid, teenager, or young adult.',
      title:
        'When did the condition start to affect your daily activities and ability to work?',
    },
    J: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'J',
      subTitle:
        'Supplemental Nutritional Assistance Program (SNAP), Medicaid, and Temporary Assistance for Needy Families (TANF) are a few examples.',
      title:
        'Do you get state or federal government assistance to help cover your basic needs?',
    },
    K: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'K',
      info: 'One of our benefits provides assistance if your income and financial resources are limited.',
      title:
        'Is it hard to pay for basic needs like food, clothing, and a home?',
    },
    L: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: "Yes, but I'm separated from my spouse.",
        },
        {
          id: '2',
          order: 3,
          title: 'No, but I was in the past.',
        },
        {
          id: '3',
          order: 4,
          title: "No, I've never been married.",
        },
      ],
      id: 'L',
      info: "You may be eligible for spousal benefits based on a current or former spouse's work history.",
      subTitle:
        'Long-term partnerships often resemble marriage, but our benefits require legal recognition in your state.',
      title: 'Are you married?',
    },
    M: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'M',
      info: 'If they get Social Security payments right now, you may be eligible for some of our spousal benefits.',
      title: 'Does your spouse get Social Security benefits?',
    },
    N: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'N',
      title: 'Did you marry your spouse before you turned 60?',
    },
    O: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'O',
      info: "You may be eligible for spousal benefits based on a former spouse's work history even though you're no longer connected to them through marriage.",
      title: 'Are you divorced?',
    },
    P: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'P',
      subTitle:
        'If you\'ve gotten divorced more than once, choose "Yes" if one of your marriages lasted for 10 years or more.',
      title: 'Were you married for 10 years or more before you got divorced?',
    },
    Q: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
        {
          id: '2',
          title: "I don't know",
        },
      ],
      id: 'Q',
      info: "How long you've worked is also important. Ten years is often what's required.",
      title:
        'Has your former spouse worked for 10 years or more in the United States?',
    },
    R: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'R',
      subTitle:
        '"Widowed" may not be a term you use to describe yourself. It means that your spouse passed away during your marriage. It may have happened recently or a long time ago.',
      title: 'Are you widowed?',
    },
    S: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'S',
      info: "You may be eligible for spousal benefits based on your former spouse's work history.",
      title:
        'Did your spouse ever have a job in the United States before they passed away?',
    },
    T: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'T',
      info: 'One of our spousal benefits looks at whether you take care of disabled or young children.',
      title: 'Do you have kids who are disabled or under 16?',
    },
    U: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'U',
      subTitle:
        'They may have been your birth, adoptive, or step parent, and may have passed away recently or a long time ago.',
      title: 'Did you lose a parent?',
    },
    V: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'V',
      title:
        "We're sorry for your loss. Do you have one or multiple surviving parents?",
    },
    W: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
        {
          id: '2',
          title: "I don't know",
        },
      ],
      id: 'W',
      info: 'If they get Social Security payments right now, you may be eligible for one of our benefits for children.',
      title: 'Do your parent(s) get Social Security benefits?',
    },
    X: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'X',
      internalNotes: 'Children under 18',
      subTitle:
        'If your answer is "Yes", you may have heard doctors, social workers, and others say they have a disability.',
      title:
        'Does the child have a condition that significantly affects their daily activities?',
    },
    Y: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'Y',
      info: "One of our benefits is there for you when the child's daily activities are affected for a long time.",
      title:
        'Do you expect the condition to significantly affect their daily activities for a year or longer or be terminal?',
      type: 'multiple_choice',
    },
    Z: {
      answers: [
        {
          id: '0',
          order: 1,
          title: 'Yes',
        },
        {
          id: '1',
          order: 2,
          title: 'No',
        },
      ],
      id: 'Z',
      internalNotes: 'Children under 18',
      subTitle:
        'The parent may have been their birth, adoptive, or step parent, and may have passed away recently or a long time ago.',
      title: 'Did the child lose a parent?',
    },
  },
  results: {
    r1: {
      id: 'r1',
      label: 'Benefit name',
      secondaryAction: {
        buttons: [
          {
            id: 'rb1',
            link: '#',
            title: 'Estimate payment amount at various ages',
            type: 'link',
          },
        ],
        id: 'sa3',
        subTitle:
          "You may meet the requirements to receive Retirement, but it's up to you to decide when you want to apply. The monthly amount you can receive increases as you get older. You'll get the highest possible amount if you apply at age 70.",
        title: 'When to apply for Retirement',
      },
      title: 'Retirement',
    },
    r10: {
      id: 'r10',
      label: 'Benefit name',
      title: 'Lump Sum Death Payment, a one-time payment',
    },
    r11: {
      id: 'r11',
      label: 'Benefit name',
      title: "Child's Auxiliary",
    },
    r12: {
      id: 'r12',
      label: 'Benefit name',
      title: "Child's Survivor",
    },
    r13: {
      id: 'r13',
      label: 'Benefit name',
      title: 'Childhood Disability',
    },
    r14: {
      id: 'r14',
      label: 'Benefit name',
      title: 'Student Auxiliary',
    },
    r15: {
      id: 'r15',
      label: 'Benefit name',
      title: 'Student Survivor',
    },
    r16: {
      id: 'r16',
      label: 'Benefit name',
      title: "Mother/Father's",
    },
    r2: {
      id: 'r2',
      label: 'Benefit name',
      title:
        'Disability, also referred to as benefits Disability Insurance (SSDI)',
    },
    r3: {
      id: 'r3',
      label: 'Benefit name',
      title: 'Supplemental Security Income (SSI)',
    },
    r4: {
      id: 'r4',
      label: 'Benefit name',
      secondaryAction: {
        buttons: [
          {
            id: 'rb2',
            link: '#',
            title: 'Determine when to sign up for Medicare',
            type: 'link',
          },
        ],
        id: 'sa3',
        subTitle:
          "The deadline to sign up for Medicare Parts A & B depends on what age you want to apply for your Retirement benefit. Plan ahead to make sure you don't miss the enrollment period.",
        title: 'Plan ahead for Medicare Parts A & B',
      },
      title: 'Medicare',
    },
    r5: {
      id: 'r5',
      label: 'Benefit name',
      title: 'Spouse',
    },
    r6: {
      id: 'r6',
      label: 'Benefit name',
      title: 'Spouse with Child in Care',
    },
    r7: {
      id: 'r7',
      label: 'Benefit name',
      title: 'Divorced Spouse',
    },
    r8: {
      id: 'r8',
      label: 'Benefit name',
      title: 'Widowers',
    },
    r9: {
      id: 'r9',
      label: 'Benefit name',
      title: 'Disabled Widowers',
    },
  },
  sections: {
    a0_family: {
      id: 'a0_family',
      title: 'Family',
    },
    a0_finances: {
      id: 'a0_finances',
      title: 'Finances',
    },
    a0_work: {
      id: 'a0_work',
      title: 'Work',
    },
    a1_diability: {
      id: 'a1_disability',
      title: 'Disability',
    },
    a1_family: {
      id: 'a1_family',
      title: 'Family',
    },
    introduction: {
      id: 'introduction',
      title: 'Introduction',
    },
    results: {
      id: 'results',
      title: 'Results',
    },
  },
};
