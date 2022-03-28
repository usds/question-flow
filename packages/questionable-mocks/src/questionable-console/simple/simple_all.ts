/* eslint-disable */
export const simple_all = {
  actions: [
    {
      buttons: [
        {
          id: "b1",
          title: "Start Over",
          type: "button"
        }
      ],
      id: "0",
      label: "Restart survey",
      subTitle: "Try our survey again to see what other badges you can earn.",
      title: "Try Again",
      type: "online"
    }
  ],
  branches: [],
  config: {
    _constructor_name_: "e"
  },
  flow: [
    "Landing",
    "A",
    "B",
    "C",
    "D",
    "Summary",
    "Results",
    "No Results"
  ],
  header: "Simple Eligibility Survey",
  results: [
    {
      action: {
        id: "0"
      },
      id: "1",
      label: "Badge name",
      requirements: [
        {
          explanation: "You completed our survey.",
          responses: [
            {
              answers: [
                {
                  id: "1"
                },
                {
                  id: "0"
                }
              ],
              question: {
                id: "A"
              }
            }
          ]
        }
      ],
      title: "Participation Badge"
    },
    {
      action: {
        id: "0"
      },
      id: "2",
      label: "Badge name",
      requirements: [
        {
          explanation: "You changed your mind from liking surveys to disliking them.",
          responses: [
            {
              answers: [
                {
                  id: "0"
                }
              ],
              question: {
                id: "A"
              }
            },
            {
              answers: [
                {
                  id: "1"
                }
              ],
              question: {
                id: "C"
              }
            }
          ]
        },
        {
          explanation: "You changed your mind from not liking surveys to liking them.",
          responses: [
            {
              answers: [
                {
                  id: "1"
                }
              ],
              question: {
                id: "A"
              }
            },
            {
              answers: [
                {
                  id: "0"
                }
              ],
              question: {
                id: "B"
              }
            }
          ]
        }
      ],
      title: "Confused Choices Badge"
    },
    {
      action: {
        id: "0"
      },
      id: "3",
      label: "Badge name",
      requirements: [
        {
          explanation: "You have the guts to put it all on the line again.",
          responses: [
            {
              answers: [
                {
                  id: "0"
                }
              ],
              question: {
                id: "D"
              }
            }
          ]
        }
      ],
      title: "Daredevil Badge"
    }
  ],
  pages: {
    landingPage: {
      body: "Complete this series of questions to earn badges!",
      buttons: {
        next: {
          id: "b2",
          title: "Begin"
        }
      },
      id: "Landing",
      section: {
        id: "Landing"
      },
      subTitle: "This is a simple survey",
      title: "Welcome",
      type: "Landing"
    },
    noResultsPage: {
      footer: "While you can try again, we cannot guarantee you'll get a badge.",
      id: "No Results",
      section: {
        id: "results"
      },
      subTitle: "Try again to earn some.",
      title: "You earned no badges.",
      type: "No Results"
    },
    resultsPage: {
      id: "Results",
      info: "Each badge has an official name. You may see these names referenced in other resources online.",
      section: {
        id: "results"
      },
      title: "You have earned these badges.",
      type: "Results"
    },
    summaryPage: {
      buttons: {
        next: {
          id: "b3",
          title: "See your results"
        }
      },
      id: "Summary",
      section: {
        id: "results"
      },
      subTitle: "If everything looks correct, click \"Submit\" to view your results; otherwise, go back and change your asnwers as needed.",
      title: "Review your answers",
      type: "Summary"
    }
  },
  questions: [
    {
      answers: [
        {
          id: "0",
          title: "Yes"
        },
        {
          id: "1",
          title: "No"
        }
      ],
      id: "A",
      info: "It is a yes or no question",
      internalNotes: "everone",
      section: {
        id: "introduction"
      },
      subTitle: "Surveys, questionnaires, slides, decks, polls--they're all linear questions/statements.",
      title: "Do you like surveys?",
      type: "multiple_choice"
    },
    {
      answers: [
        {
          id: "0",
          title: "Yes"
        },
        {
          id: "1",
          title: "No"
        }
      ],
      entryRequirements: [
        {
          responses: [
            {
              answers: [
                {
                  id: "1"
                }
              ],
              question: {
                id: "A"
              }
            }
          ]
        }
      ],
      id: "B",
      internalNotes: "users who don't like surveys",
      section: {
        id: "confirmation"
      },
      subTitle: "Surveys can be important tools to help guide user interactions.",
      title: "Are you sure you don't like surveys?",
      type: "multiple_choice"
    },
    {
      answers: [
        {
          id: "0",
          title: "Yes"
        },
        {
          id: "1",
          title: "No"
        }
      ],
      entryRequirements: [
        {
          responses: [
            {
              answers: [
                {
                  id: "0"
                }
              ],
              question: {
                id: "A"
              }
            }
          ]
        }
      ],
      id: "C",
      internalNotes: "users who do like surveys",
      section: {
        id: "confirmation"
      },
      subTitle: "Surveys can be wastes of time. Do you honestly like them?",
      title: "Are you sure you like surveys?",
      type: "multiple_choice"
    },
    {
      answers: [
        {
          id: "0",
          title: "Yes"
        },
        {
          id: "1",
          title: "No"
        }
      ],
      entryRequirements: [
        {
          responses: [
            {
              answers: [
                {
                  id: "0"
                },
                {
                  id: "1"
                }
              ],
              question: {
                id: "C"
              }
            }
          ]
        },
        {
          responses: [
            {
              answers: [
                {
                  id: "0"
                },
                {
                  id: "1"
                }
              ],
              question: {
                id: "B"
              }
            }
          ]
        }
      ],
      id: "D",
      internalNotes: "users who do like surveys",
      section: {
        id: "satisfaction"
      },
      subTitle: "Given the chance to do it all over, wouldn't you like to try?",
      title: "Would you take this survey again?",
      type: "multiple_choice"
    }
  ],
  sections: [
    {
      id: "introduction",
      requirements: [],
      title: "Introduction"
    },
    {
      id: "confirmation",
      requirements: [
        {
          responses: [
            {
              answers: [
                {
                  id: "0"
                },
                {
                  id: "1"
                }
              ],
              question: {
                id: "C"
              }
            }
          ]
        }
      ],
      title: "Confirmation"
    },
    {
      id: "satisfaction",
      requirements: [
        {
          responses: [
            {
              answers: [
                {
                  id: "0"
                },
                {
                  id: "1"
                }
              ],
              question: {
                id: "A"
              }
            }
          ]
        }
      ],
      title: "Satisfaction"
    }
  ],
  steps: [
    {
      body: "Complete this series of questions to earn badges!",
      buttons: {
        next: {
          id: "b2",
          title: "Begin"
        }
      },
      id: "Landing",
      section: {
        id: "Landing"
      },
      subTitle: "This is a simple survey",
      title: "Welcome",
      type: "Landing"
    },
    {
      order: 0,
      answers: [
        {
          id: "0",
          title: "Yes"
        },
        {
          id: "1",
          title: "No"
        }
      ],
      id: "A",
      info: "It is a yes or no question",
      internalNotes: "everone",
      section: {
        id: "introduction"
      },
      subTitle: "Surveys, questionnaires, slides, decks, polls--they're all linear questions/statements.",
      title: "Do you like surveys?",
      type: "multiple_choice"
    },
    {
      order: 1,
      answers: [
        {
          id: "0",
          title: "Yes"
        },
        {
          id: "1",
          title: "No"
        }
      ],
      entryRequirements: [
        {
          responses: [
            {
              answers: [
                {
                  id: "1"
                }
              ],
              question: {
                id: "A"
              }
            }
          ]
        }
      ],
      id: "B",
      internalNotes: "users who don't like surveys",
      section: {
        id: "confirmation"
      },
      subTitle: "Surveys can be important tools to help guide user interactions.",
      title: "Are you sure you don't like surveys?",
      type: "multiple_choice"
    },
    {
      order: 2,
      answers: [
        {
          id: "0",
          title: "Yes"
        },
        {
          id: "1",
          title: "No"
        }
      ],
      entryRequirements: [
        {
          responses: [
            {
              answers: [
                {
                  id: "0"
                }
              ],
              question: {
                id: "A"
              }
            }
          ]
        }
      ],
      id: "C",
      internalNotes: "users who do like surveys",
      section: {
        id: "confirmation"
      },
      subTitle: "Surveys can be wastes of time. Do you honestly like them?",
      title: "Are you sure you like surveys?",
      type: "multiple_choice"
    },
    {
      order: 3,
      answers: [
        {
          id: "0",
          title: "Yes"
        },
        {
          id: "1",
          title: "No"
        }
      ],
      entryRequirements: [
        {
          responses: [
            {
              answers: [
                {
                  id: "0"
                },
                {
                  id: "1"
                }
              ],
              question: {
                id: "C"
              }
            }
          ]
        },
        {
          responses: [
            {
              answers: [
                {
                  id: "0"
                },
                {
                  id: "1"
                }
              ],
              question: {
                id: "B"
              }
            }
          ]
        }
      ],
      id: "D",
      internalNotes: "users who do like surveys",
      section: {
        id: "satisfaction"
      },
      subTitle: "Given the chance to do it all over, wouldn't you like to try?",
      title: "Would you take this survey again?",
      type: "multiple_choice"
    },
    {
      buttons: {
        next: {
          id: "b3",
          title: "See your results"
        }
      },
      id: "Summary",
      section: {
        id: "results"
      },
      subTitle: "If everything looks correct, click \"Submit\" to view your results; otherwise, go back and change your asnwers as needed.",
      title: "Review your answers",
      type: "Summary"
    },
    {
      id: "Results",
      info: "Each badge has an official name. You may see these names referenced in other resources online.",
      section: {
        id: "results"
      },
      title: "You have earned these badges.",
      type: "Results"
    },
    {
      footer: "While you can try again, we cannot guarantee you'll get a badge.",
      id: "No Results",
      section: {
        id: "results"
      },
      subTitle: "Try again to earn some.",
      title: "You earned no badges.",
      type: "No Results"
    }
  ],
  _constructor_name_: "e"
}
