// This files is code generated. Do not edit.
/* eslint-disable */
export const survey = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "IAction": {
      "description": "Represents something the customer can do in response to receiving a result",
      "properties": {
        "icon": {
          "description": "Optional icon for the action",
          "title": "Icon",
          "type": "string"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "label": {
          "title": "Label",
          "type": "string"
        },
        "subTitle": {
          "title": "Description",
          "type": "string"
        },
        "title": {
          "title": "Title",
          "type": "string"
        }
      },
      "required": [
        "id",
        "label"
      ],
      "type": "object"
    },
    "IBranch": {
      "properties": {
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "questions": {
          "items": {
            "$ref": "#/definitions/IRefCore"
          },
          "type": "array"
        },
        "title": {
          "title": "Title",
          "type": "string"
        }
      },
      "required": [
        "id",
        "questions"
      ],
      "type": "object"
    },
    "IButton": {
      "description": "Represents a navigation button",
      "properties": {
        "horizontalPos": {
          "default": "left",
          "description": "Horizontal orientation (left or right)",
          "title": "Horizontal Position",
          "type": "string"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "link": {
          "description": "Link to tie to button click",
          "title": "Link",
          "type": "string"
        },
        "outline": {
          "description": "Show an outline",
          "title": "Outline",
          "type": "boolean"
        },
        "title": {
          "title": "Title",
          "type": "string"
        },
        "type": {
          "description": "Render mode (link or button)",
          "title": "Mode",
          "type": "string"
        },
        "verticalPos": {
          "description": "Vertical orientation (top or bottom)",
          "title": "Vertical Position",
          "type": "string"
        },
        "visible": {
          "description": "Visibility status of the button (show/hide)",
          "title": "Visible",
          "type": "boolean"
        }
      },
      "required": [
        "id"
      ],
      "type": "object"
    },
    "IButtonConfig": {
      "description": "Configuration for buttons",
      "properties": {
        "core": {
          "enum": [
            "IButtonConfig",
            "I"
          ],
          "type": "string"
        },
        "defaultLabel": {
          "description": "Default text to display if none is defined",
          "type": "string"
        },
        "horizontalPos": {
          "default": "left",
          "description": "Horizontal orientation (left or right)",
          "title": "Horizontal Position",
          "type": "string"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "link": {
          "description": "Link to tie to button click",
          "title": "Link",
          "type": "string"
        },
        "outline": {
          "description": "Show an outline",
          "title": "Outline",
          "type": "boolean"
        },
        "title": {
          "title": "Title",
          "type": "string"
        },
        "type": {
          "description": "Render mode (link or button)",
          "title": "Mode",
          "type": "string"
        },
        "verticalPos": {
          "description": "Vertical orientation (top or bottom)",
          "title": "Vertical Position",
          "type": "string"
        },
        "visible": {
          "description": "Toggle whether button is visible",
          "title": "Visible",
          "type": "boolean"
        }
      },
      "required": [
        "defaultLabel",
        "horizontalPos",
        "id",
        "type",
        "verticalPos",
        "visible"
      ],
      "type": "object"
    },
    "IDesignData": {
      "description": "Data defintion for design step",
      "properties": {
        "form": {
          "description": "The user's current form state",
          "properties": {
            "age": {
              "description": "Customer's age in years/months/days",
              "properties": {
                "days": {
                  "maximum": 31,
                  "minimum": 0,
                  "title": "Days",
                  "type": [
                    "number",
                    "null"
                  ]
                },
                "months": {
                  "maximum": 31,
                  "minimum": 0,
                  "title": "Months",
                  "type": [
                    "number",
                    "null"
                  ]
                },
                "years": {
                  "maximum": 100,
                  "minimum": 0,
                  "title": "Years",
                  "type": [
                    "number",
                    "null"
                  ]
                }
              },
              "required": [
                "months",
                "years"
              ],
              "title": "Age",
              "type": "object"
            },
            "birthdate": {
              "description": "Customer's entered birthdate",
              "title": "Birthdate",
              "type": "string"
            },
            "finished": {
              "description": "Time the survey was completed",
              "format": "date-time",
              "title": "Finished",
              "type": "string"
            },
            "responses": {
              "description": "All currently provided responses",
              "items": {
                "description": "Defines step content for Question type",
                "properties": {
                  "answers": {
                    "description": "Collection of allowed answers",
                    "items": {
                      "description": "Generic reference object",
                      "properties": {
                        "id": {
                          "description": "Unique identifier",
                          "title": "Id",
                          "type": "string"
                        },
                        "title": {
                          "title": "Title",
                          "type": "string"
                        }
                      },
                      "required": [
                        "id"
                      ],
                      "type": "object"
                    },
                    "title": "Answers",
                    "type": "array"
                  },
                  "entryRequirements": {
                    "description": "Collection of requirements to view/enter this step",
                    "items": {
                      "$ref": "#/definitions/interface-d.ts-6522-7299-d.ts-0-61553408250476"
                    },
                    "title": "Requirements",
                    "type": "array"
                  },
                  "exitRequirements": {
                    "description": "Collection of requirements to leave this step",
                    "items": {
                      "$ref": "#/definitions/interface-d.ts-6522-7299-d.ts-0-61553408250476"
                    },
                    "title": "Exit Requirements",
                    "type": "array"
                  },
                  "footer": {
                    "description": "Optional footer text to display at the bottom of the step",
                    "title": "Footer",
                    "type": "string"
                  },
                  "id": {
                    "description": "Unique identifier",
                    "title": "Id",
                    "type": "string"
                  },
                  "info": {
                    "description": "Contextual content to display below the step contents and above the footer",
                    "title": "Info",
                    "type": "string"
                  },
                  "internalNotes": {
                    "description": "Private/internal use only notes for documenting this step",
                    "title": "Internal Notes",
                    "type": "string"
                  },
                  "section": {
                    "description": "Section to which this step belongs",
                    "properties": {
                      "id": {},
                      "requirements": {
                        "description": "Collection of requirements to enable display of this status",
                        "items": {
                          "$ref": "#/definitions/interface-d.ts-6522-7299-d.ts-0-61553408250476"
                        },
                        "title": "Requirements",
                        "type": "array"
                      },
                      "title": {}
                    },
                    "title": "Section",
                    "type": "object"
                  },
                  "subTitle": {
                    "description": "Text to display below the title",
                    "title": "Subtitle",
                    "type": "string"
                  },
                  "title": {
                    "title": "Title",
                    "type": "string"
                  },
                  "type": {
                    "description": "Type of question",
                    "enum": [
                      "dob",
                      "multiple_choice",
                      "multiple_select"
                    ],
                    "title": "Question Type",
                    "type": "string"
                  }
                },
                "required": [
                  "answers",
                  "id",
                  "section",
                  "type"
                ],
                "type": "object"
              },
              "title": "Responses",
              "type": "array"
            },
            "started": {
              "description": "Time the survey was started",
              "format": "date-time",
              "title": "Started",
              "type": "string"
            }
          },
          "required": [
            "responses",
            "started"
          ],
          "title": "FormCore",
          "type": "object"
        },
        "step": {
          "$ref": "#/definitions/IStep",
          "description": "Current step"
        },
        "stepId": {
          "description": "Internally unique identifier",
          "title": "Step ID",
          "type": [
            "string",
            "number"
          ]
        }
      },
      "required": [
        "form",
        "step",
        "stepId"
      ],
      "type": "object"
    },
    "IEventCore": {
      "properties": {
        "onActionClick": {
          "not": {}
        },
        "onAnswer": {
          "not": {}
        },
        "onAnyEvent": {
          "not": {}
        },
        "onError": {
          "not": {}
        },
        "onGateSwitch": {
          "not": {}
        },
        "onInit": {
          "not": {}
        },
        "onNoResults": {
          "not": {}
        },
        "onPage": {
          "not": {}
        },
        "onResults": {
          "not": {}
        }
      },
      "type": "object"
    },
    "IFormCore": {
      "description": "Represents the survey as completed by the user",
      "properties": {
        "age": {
          "description": "Customer's age in years/months/days",
          "properties": {
            "days": {
              "maximum": 31,
              "minimum": 0,
              "title": "Days",
              "type": [
                "number",
                "null"
              ]
            },
            "months": {
              "maximum": 31,
              "minimum": 0,
              "title": "Months",
              "type": [
                "number",
                "null"
              ]
            },
            "years": {
              "maximum": 100,
              "minimum": 0,
              "title": "Years",
              "type": [
                "number",
                "null"
              ]
            }
          },
          "required": [
            "months",
            "years"
          ],
          "title": "Age",
          "type": "object"
        },
        "birthdate": {
          "description": "Customer's entered birthdate",
          "title": "Birthdate",
          "type": "string"
        },
        "finished": {
          "description": "Time the survey was completed",
          "format": "date-time",
          "title": "Finished",
          "type": "string"
        },
        "responses": {
          "description": "All currently provided responses",
          "items": {
            "$ref": "#/definitions/IQuestionCore"
          },
          "title": "Responses",
          "type": "array"
        },
        "started": {
          "description": "Time the survey was started",
          "format": "date-time",
          "title": "Started",
          "type": "string"
        }
      },
      "required": [
        "responses",
        "started"
      ],
      "type": "object"
    },
    "INavigationConfig": {
      "description": "Configuration for navigation",
      "properties": {
        "core": {
          "enum": [
            "INavigationConfig",
            "I"
          ],
          "type": "string"
        },
        "next": {
          "description": "Next/Forward button",
          "properties": {
            "core": {},
            "defaultLabel": {
              "description": "Default text to display if none is defined",
              "type": "string"
            },
            "horizontalPos": {
              "default": "left",
              "description": "Horizontal orientation (left or right)",
              "title": "Horizontal Position",
              "type": "string"
            },
            "id": {},
            "link": {},
            "outline": {},
            "title": {},
            "type": {
              "description": "Render mode (link or button)",
              "title": "Mode",
              "type": "string"
            },
            "verticalPos": {
              "description": "Vertical orientation (top or bottom)",
              "title": "Vertical Position",
              "type": "string"
            },
            "visible": {
              "description": "Toggle whether button is visible",
              "title": "Visible",
              "type": "boolean"
            }
          },
          "type": "object"
        },
        "prev": {
          "description": "Previous/Go back button",
          "properties": {
            "core": {},
            "defaultLabel": {
              "description": "Default text to display if none is defined",
              "type": "string"
            },
            "horizontalPos": {
              "default": "left",
              "description": "Horizontal orientation (left or right)",
              "title": "Horizontal Position",
              "type": "string"
            },
            "id": {},
            "link": {},
            "outline": {},
            "title": {},
            "type": {
              "description": "Render mode (link or button)",
              "title": "Mode",
              "type": "string"
            },
            "verticalPos": {
              "description": "Vertical orientation (top or bottom)",
              "title": "Vertical Position",
              "type": "string"
            },
            "visible": {
              "description": "Toggle whether button is visible",
              "title": "Visible",
              "type": "boolean"
            }
          },
          "type": "object"
        }
      },
      "required": [
        "next",
        "prev"
      ],
      "type": "object"
    },
    "IPage": {
      "description": "Defines step content for Page types",
      "properties": {
        "body": {
          "description": "Defines the body content of the page",
          "title": "Body",
          "type": "string"
        },
        "bodyHeader": {
          "description": "Optional header to display above body",
          "title": "Body Heading",
          "type": "string"
        },
        "bodySubHeader": {
          "description": "Optional sub header to display below Body Heading",
          "title": "Body Subheading",
          "type": "string"
        },
        "buttons": {
          "description": "Collection of navigation buttons",
          "properties": {
            "next": {
              "$ref": "#/definitions/IButton",
              "default": {
                "label": "Next"
              },
              "description": "Next button",
              "title": "Next Button"
            },
            "prev": {
              "$ref": "#/definitions/IButton",
              "default": {
                "label": "Prev"
              },
              "description": "Previous / Back button",
              "title": "Prev Button"
            }
          },
          "title": "Buttons",
          "type": "object"
        },
        "entryRequirements": {
          "description": "Collection of requirements to view/enter this step",
          "items": {
            "$ref": "#/definitions/IRequirementCore"
          },
          "title": "Requirements",
          "type": "array"
        },
        "exitRequirements": {
          "description": "Collection of requirements to leave this step",
          "items": {
            "$ref": "#/definitions/IRequirementCore"
          },
          "title": "Exit Requirements",
          "type": "array"
        },
        "footer": {
          "description": "Optional footer text to display at the bottom of the step",
          "title": "Footer",
          "type": "string"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "info": {
          "description": "Contextual content to display below the step contents and above the footer",
          "title": "Info",
          "type": "string"
        },
        "internalNotes": {
          "description": "Private/internal use only notes for documenting this step",
          "title": "Internal Notes",
          "type": "string"
        },
        "section": {
          "description": "Section to which this step belongs",
          "properties": {
            "id": {},
            "requirements": {
              "description": "Collection of requirements to enable display of this status",
              "items": {
                "$ref": "#/definitions/IRequirementCore"
              },
              "title": "Requirements",
              "type": "array"
            },
            "title": {}
          },
          "title": "Section",
          "type": "object"
        },
        "subTitle": {
          "description": "Text to display below the title",
          "title": "Subtitle",
          "type": "string"
        },
        "title": {
          "title": "Title",
          "type": "string"
        },
        "type": {
          "description": "Step's type, usually implemented by @see{IPageStep} or @see{IQuestionStep}",
          "enum": [
            "Landing",
            "No Results",
            "Results",
            "Summary"
          ],
          "title": "Step Type",
          "type": "string"
        }
      },
      "required": [
        "id",
        "section",
        "type"
      ],
      "type": "object"
    },
    "IPageConfig": {
      "properties": {
        "core": {
          "enum": [
            "IPageConfig",
            "I"
          ],
          "type": "string"
        },
        "visible": {
          "type": "boolean"
        }
      },
      "required": [
        "visible"
      ],
      "type": "object"
    },
    "IPageData": {
      "description": "Data defintion for page step",
      "properties": {
        "form": {
          "description": "The user's current form state",
          "properties": {
            "age": {
              "description": "Customer's age in years/months/days",
              "properties": {
                "days": {
                  "maximum": 31,
                  "minimum": 0,
                  "title": "Days",
                  "type": [
                    "number",
                    "null"
                  ]
                },
                "months": {
                  "maximum": 31,
                  "minimum": 0,
                  "title": "Months",
                  "type": [
                    "number",
                    "null"
                  ]
                },
                "years": {
                  "maximum": 100,
                  "minimum": 0,
                  "title": "Years",
                  "type": [
                    "number",
                    "null"
                  ]
                }
              },
              "required": [
                "months",
                "years"
              ],
              "title": "Age",
              "type": "object"
            },
            "birthdate": {
              "description": "Customer's entered birthdate",
              "title": "Birthdate",
              "type": "string"
            },
            "finished": {
              "description": "Time the survey was completed",
              "format": "date-time",
              "title": "Finished",
              "type": "string"
            },
            "responses": {
              "description": "All currently provided responses",
              "items": {
                "description": "Defines step content for Question type",
                "properties": {
                  "answers": {
                    "description": "Collection of allowed answers",
                    "items": {
                      "description": "Generic reference object",
                      "properties": {
                        "id": {
                          "description": "Unique identifier",
                          "title": "Id",
                          "type": "string"
                        },
                        "title": {
                          "title": "Title",
                          "type": "string"
                        }
                      },
                      "required": [
                        "id"
                      ],
                      "type": "object"
                    },
                    "title": "Answers",
                    "type": "array"
                  },
                  "entryRequirements": {
                    "description": "Collection of requirements to view/enter this step",
                    "items": {
                      "$ref": "#/definitions/interface-d.ts-6522-7299-d.ts-0-61553408250476"
                    },
                    "title": "Requirements",
                    "type": "array"
                  },
                  "exitRequirements": {
                    "description": "Collection of requirements to leave this step",
                    "items": {
                      "$ref": "#/definitions/interface-d.ts-6522-7299-d.ts-0-61553408250476"
                    },
                    "title": "Exit Requirements",
                    "type": "array"
                  },
                  "footer": {
                    "description": "Optional footer text to display at the bottom of the step",
                    "title": "Footer",
                    "type": "string"
                  },
                  "id": {
                    "description": "Unique identifier",
                    "title": "Id",
                    "type": "string"
                  },
                  "info": {
                    "description": "Contextual content to display below the step contents and above the footer",
                    "title": "Info",
                    "type": "string"
                  },
                  "internalNotes": {
                    "description": "Private/internal use only notes for documenting this step",
                    "title": "Internal Notes",
                    "type": "string"
                  },
                  "section": {
                    "description": "Section to which this step belongs",
                    "properties": {
                      "id": {},
                      "requirements": {
                        "description": "Collection of requirements to enable display of this status",
                        "items": {
                          "$ref": "#/definitions/interface-d.ts-6522-7299-d.ts-0-61553408250476"
                        },
                        "title": "Requirements",
                        "type": "array"
                      },
                      "title": {}
                    },
                    "title": "Section",
                    "type": "object"
                  },
                  "subTitle": {
                    "description": "Text to display below the title",
                    "title": "Subtitle",
                    "type": "string"
                  },
                  "title": {
                    "title": "Title",
                    "type": "string"
                  },
                  "type": {
                    "description": "Type of question",
                    "enum": [
                      "dob",
                      "multiple_choice",
                      "multiple_select"
                    ],
                    "title": "Question Type",
                    "type": "string"
                  }
                },
                "required": [
                  "answers",
                  "id",
                  "section",
                  "type"
                ],
                "type": "object"
              },
              "title": "Responses",
              "type": "array"
            },
            "started": {
              "description": "Time the survey was started",
              "format": "date-time",
              "title": "Started",
              "type": "string"
            }
          },
          "required": [
            "responses",
            "started"
          ],
          "title": "FormCore",
          "type": "object"
        },
        "step": {
          "$ref": "#/definitions/IPage",
          "description": "Current step"
        },
        "stepId": {
          "description": "Internally unique identifier",
          "title": "Step ID",
          "type": [
            "string",
            "number"
          ]
        }
      },
      "required": [
        "form",
        "step",
        "stepId"
      ],
      "type": "object"
    },
    "IPagesCore": {
      "description": "Defines required pages for the survey flow",
      "properties": {
        "landingPage": {
          "$ref": "#/definitions/IPage",
          "description": "First step of the survey",
          "title": "Landing Page"
        },
        "noResultsPage": {
          "$ref": "#/definitions/IPage",
          "description": "Last step of the survey if there are 0 results",
          "title": "No Results Page"
        },
        "resultsPage": {
          "$ref": "#/definitions/IPage",
          "description": "Last step of the survey if there are 1 or more results",
          "title": "Results Page"
        },
        "summaryPage": {
          "$ref": "#/definitions/IPage",
          "description": "Preview of survery before submitting to receive results",
          "title": "Summary Page"
        }
      },
      "required": [
        "noResultsPage",
        "resultsPage",
        "summaryPage"
      ],
      "type": "object"
    },
    "IPagesConfig": {
      "properties": {
        "core": {
          "enum": [
            "IPagesConfig",
            "I"
          ],
          "type": "string"
        },
        "landing": {
          "properties": {
            "core": {},
            "visible": {
              "type": "boolean"
            }
          },
          "type": "object"
        },
        "noresults": {
          "properties": {
            "core": {},
            "visible": {
              "type": "boolean"
            }
          },
          "type": "object"
        },
        "results": {
          "properties": {
            "core": {},
            "visible": {
              "type": "boolean"
            }
          },
          "type": "object"
        },
        "summary": {
          "properties": {
            "core": {},
            "visible": {
              "type": "boolean"
            }
          },
          "type": "object"
        }
      },
      "type": "object"
    },
    "IProgressBarConfig": {
      "description": "Configuration options for the progress bar",
      "properties": {
        "baseBgColor": {
          "description": "Color of the non-completed pb",
          "title": "Base Background Color",
          "type": "string"
        },
        "bgColor": {
          "description": "Color of the completed pb",
          "title": "Background Color",
          "type": "string"
        },
        "core": {
          "enum": [
            "IProgressBarConfig",
            "I"
          ],
          "type": "string"
        },
        "hide": {
          "default": false,
          "description": "Toggles whether to show progress bar",
          "title": "Show Progress Bar",
          "type": "boolean"
        },
        "position": {
          "default": "bottom",
          "description": "Vertical orientation of the progress bar",
          "title": "Position",
          "type": "string"
        },
        "type": {
          "default": "progress-bar",
          "description": "Component type\n\nCan be one of two types: (1) The USWDS Step Indicator @see https://trussworks.github.io/react-uswds/?path=/docs/components-step-indicator (2) React progress bar @see https://katerinalupacheva.github.io/react-progress-bar/",
          "title": "Type",
          "type": "string"
        }
      },
      "required": [
        "baseBgColor",
        "bgColor",
        "hide",
        "position",
        "type"
      ],
      "type": "object"
    },
    "IQuestionCore": {
      "description": "Defines step content for Question type",
      "properties": {
        "answers": {
          "description": "Collection of allowed answers",
          "items": {
            "description": "Generic reference object",
            "properties": {
              "id": {
                "description": "Unique identifier",
                "title": "Id",
                "type": "string"
              },
              "title": {
                "title": "Title",
                "type": "string"
              }
            },
            "required": [
              "id"
            ],
            "type": "object"
          },
          "title": "Answers",
          "type": "array"
        },
        "buttons": {
          "description": "Collection of navigation buttons",
          "properties": {
            "next": {
              "$ref": "#/definitions/IButton",
              "default": {
                "label": "Next"
              },
              "description": "Next button",
              "title": "Next Button"
            },
            "prev": {
              "$ref": "#/definitions/IButton",
              "default": {
                "label": "Prev"
              },
              "description": "Previous / Back button",
              "title": "Prev Button"
            }
          },
          "title": "Buttons",
          "type": "object"
        },
        "entryRequirements": {
          "description": "Collection of requirements to view/enter this step",
          "items": {
            "$ref": "#/definitions/IRequirementCore"
          },
          "title": "Requirements",
          "type": "array"
        },
        "exitRequirements": {
          "description": "Collection of requirements to leave this step",
          "items": {
            "$ref": "#/definitions/IRequirementCore"
          },
          "title": "Exit Requirements",
          "type": "array"
        },
        "footer": {
          "description": "Optional footer text to display at the bottom of the step",
          "title": "Footer",
          "type": "string"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "info": {
          "description": "Contextual content to display below the step contents and above the footer",
          "title": "Info",
          "type": "string"
        },
        "internalNotes": {
          "description": "Private/internal use only notes for documenting this step",
          "title": "Internal Notes",
          "type": "string"
        },
        "section": {
          "description": "Section to which this step belongs",
          "properties": {
            "id": {},
            "requirements": {
              "description": "Collection of requirements to enable display of this status",
              "items": {
                "$ref": "#/definitions/IRequirementCore"
              },
              "title": "Requirements",
              "type": "array"
            },
            "title": {}
          },
          "title": "Section",
          "type": "object"
        },
        "subTitle": {
          "description": "Text to display below the title",
          "title": "Subtitle",
          "type": "string"
        },
        "title": {
          "title": "Title",
          "type": "string"
        },
        "type": {
          "description": "Step's type, usually implemented by @see{IPageStep} or @see{IQuestionStep}",
          "enum": [
            "dob",
            "multiple_choice",
            "multiple_select"
          ],
          "title": "Step Type",
          "type": "string"
        }
      },
      "required": [
        "answers",
        "id",
        "section",
        "type"
      ],
      "type": "object"
    },
    "IQuestionConfig": {
      "description": "Configuration for question display",
      "properties": {
        "core": {
          "enum": [
            "IQuestionConfig",
            "I"
          ],
          "type": "string"
        },
        "showAnswerBorder": {
          "default": true,
          "description": "Determines whether to show border on radios and checkboxes",
          "title": "Show Answer Border",
          "type": "boolean"
        }
      },
      "required": [
        "showAnswerBorder"
      ],
      "type": "object"
    },
    "IQuestionData": {
      "description": "Data defintion for question step",
      "properties": {
        "core": {
          "enum": [
            "IQuestionData",
            "I"
          ],
          "type": "string"
        },
        "form": {
          "description": "The user's current form state",
          "properties": {
            "age": {
              "description": "Customer's age in years/months/days",
              "properties": {
                "days": {
                  "maximum": 31,
                  "minimum": 0,
                  "title": "Days",
                  "type": [
                    "number",
                    "null"
                  ]
                },
                "months": {
                  "maximum": 31,
                  "minimum": 0,
                  "title": "Months",
                  "type": [
                    "number",
                    "null"
                  ]
                },
                "years": {
                  "maximum": 100,
                  "minimum": 0,
                  "title": "Years",
                  "type": [
                    "number",
                    "null"
                  ]
                }
              },
              "required": [
                "months",
                "years"
              ],
              "title": "Age",
              "type": "object"
            },
            "birthdate": {
              "description": "Customer's entered birthdate",
              "title": "Birthdate",
              "type": "string"
            },
            "finished": {
              "description": "Time the survey was completed",
              "format": "date-time",
              "title": "Finished",
              "type": "string"
            },
            "responses": {
              "description": "All currently provided responses",
              "items": {
                "description": "Defines step content for Question type",
                "properties": {
                  "answers": {
                    "description": "Collection of allowed answers",
                    "items": {
                      "description": "Generic reference object",
                      "properties": {
                        "id": {
                          "description": "Unique identifier",
                          "title": "Id",
                          "type": "string"
                        },
                        "title": {
                          "title": "Title",
                          "type": "string"
                        }
                      },
                      "required": [
                        "id"
                      ],
                      "type": "object"
                    },
                    "title": "Answers",
                    "type": "array"
                  },
                  "entryRequirements": {
                    "description": "Collection of requirements to view/enter this step",
                    "items": {
                      "$ref": "#/definitions/interface-d.ts-6522-7299-d.ts-0-61553408250476"
                    },
                    "title": "Requirements",
                    "type": "array"
                  },
                  "exitRequirements": {
                    "description": "Collection of requirements to leave this step",
                    "items": {
                      "$ref": "#/definitions/interface-d.ts-6522-7299-d.ts-0-61553408250476"
                    },
                    "title": "Exit Requirements",
                    "type": "array"
                  },
                  "footer": {
                    "description": "Optional footer text to display at the bottom of the step",
                    "title": "Footer",
                    "type": "string"
                  },
                  "id": {
                    "description": "Unique identifier",
                    "title": "Id",
                    "type": "string"
                  },
                  "info": {
                    "description": "Contextual content to display below the step contents and above the footer",
                    "title": "Info",
                    "type": "string"
                  },
                  "internalNotes": {
                    "description": "Private/internal use only notes for documenting this step",
                    "title": "Internal Notes",
                    "type": "string"
                  },
                  "section": {
                    "description": "Section to which this step belongs",
                    "properties": {
                      "id": {},
                      "requirements": {
                        "description": "Collection of requirements to enable display of this status",
                        "items": {
                          "$ref": "#/definitions/interface-d.ts-6522-7299-d.ts-0-61553408250476"
                        },
                        "title": "Requirements",
                        "type": "array"
                      },
                      "title": {}
                    },
                    "title": "Section",
                    "type": "object"
                  },
                  "subTitle": {
                    "description": "Text to display below the title",
                    "title": "Subtitle",
                    "type": "string"
                  },
                  "title": {
                    "title": "Title",
                    "type": "string"
                  },
                  "type": {
                    "description": "Type of question",
                    "enum": [
                      "dob",
                      "multiple_choice",
                      "multiple_select"
                    ],
                    "title": "Question Type",
                    "type": "string"
                  }
                },
                "required": [
                  "answers",
                  "id",
                  "section",
                  "type"
                ],
                "type": "object"
              },
              "title": "Responses",
              "type": "array"
            },
            "started": {
              "description": "Time the survey was started",
              "format": "date-time",
              "title": "Started",
              "type": "string"
            }
          },
          "required": [
            "responses",
            "started"
          ],
          "title": "FormCore",
          "type": "object"
        },
        "step": {
          "$ref": "#/definitions/IQuestionCore",
          "description": "Current step"
        },
        "stepId": {
          "description": "Internally unique identifier",
          "title": "Step ID",
          "type": [
            "string",
            "number"
          ]
        }
      },
      "required": [
        "form",
        "step",
        "stepId"
      ],
      "type": "object"
    },
    "IQuestionable": {
      "properties": {
        "questionnaire": {
          "$ref": "#/definitions/Questionnaire"
        }
      },
      "required": [
        "questionnaire"
      ],
      "type": "object"
    },
    "IQuestionableConfig": {
      "description": "Configuration for customized behavior of Questionable",
      "properties": {
        "mode": {
          "default": "MODE.VIEW",
          "description": "View or edit mode",
          "enum": [
            "dev",
            "edit",
            "view"
          ],
          "title": "Mode",
          "type": "string"
        },
        "nav": {
          "description": "Navigation configuration",
          "properties": {
            "core": {},
            "next": {
              "description": "Next/Forward button",
              "properties": {
                "core": {},
                "defaultLabel": {
                  "description": "Default text to display if none is defined",
                  "type": "string"
                },
                "horizontalPos": {
                  "default": "left",
                  "description": "Horizontal orientation (left or right)",
                  "title": "Horizontal Position",
                  "type": "string"
                },
                "id": {},
                "link": {},
                "outline": {},
                "title": {},
                "type": {
                  "description": "Render mode (link or button)",
                  "title": "Mode",
                  "type": "string"
                },
                "verticalPos": {
                  "description": "Vertical orientation (top or bottom)",
                  "title": "Vertical Position",
                  "type": "string"
                },
                "visible": {
                  "description": "Toggle whether button is visible",
                  "title": "Visible",
                  "type": "boolean"
                }
              },
              "type": "object"
            },
            "prev": {
              "description": "Previous/Go back button",
              "properties": {
                "core": {},
                "defaultLabel": {
                  "description": "Default text to display if none is defined",
                  "type": "string"
                },
                "horizontalPos": {
                  "default": "left",
                  "description": "Horizontal orientation (left or right)",
                  "title": "Horizontal Position",
                  "type": "string"
                },
                "id": {},
                "link": {},
                "outline": {},
                "title": {},
                "type": {
                  "description": "Render mode (link or button)",
                  "title": "Mode",
                  "type": "string"
                },
                "verticalPos": {
                  "description": "Vertical orientation (top or bottom)",
                  "title": "Vertical Position",
                  "type": "string"
                },
                "visible": {
                  "description": "Toggle whether button is visible",
                  "title": "Visible",
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          },
          "title": "Navigation",
          "type": "object"
        },
        "pages": {
          "description": "Page configuration",
          "properties": {
            "core": {},
            "landing": {
              "properties": {
                "core": {},
                "visible": {
                  "type": "boolean"
                }
              },
              "type": "object"
            },
            "noresults": {
              "properties": {
                "core": {},
                "visible": {
                  "type": "boolean"
                }
              },
              "type": "object"
            },
            "results": {
              "properties": {
                "core": {},
                "visible": {
                  "type": "boolean"
                }
              },
              "type": "object"
            },
            "summary": {
              "properties": {
                "core": {},
                "visible": {
                  "type": "boolean"
                }
              },
              "type": "object"
            }
          },
          "title": "Pages",
          "type": "object"
        },
        "progressBar": {
          "description": "Progress Bar configuration",
          "properties": {
            "baseBgColor": {
              "description": "Color of the non-completed pb",
              "title": "Base Background Color",
              "type": "string"
            },
            "bgColor": {
              "description": "Color of the completed pb",
              "title": "Background Color",
              "type": "string"
            },
            "core": {},
            "hide": {
              "default": false,
              "description": "Toggles whether to show progress bar",
              "title": "Show Progress Bar",
              "type": "boolean"
            },
            "position": {
              "default": "bottom",
              "description": "Vertical orientation of the progress bar",
              "title": "Position",
              "type": "string"
            },
            "type": {
              "default": "progress-bar",
              "description": "Component type\n\nCan be one of two types: (1) The USWDS Step Indicator @see https://trussworks.github.io/react-uswds/?path=/docs/components-step-indicator (2) React progress bar @see https://katerinalupacheva.github.io/react-progress-bar/",
              "title": "Type",
              "type": "string"
            }
          },
          "title": "Progress Bar",
          "type": "object"
        },
        "questions": {
          "description": "Question configuration",
          "properties": {
            "core": {},
            "showAnswerBorder": {
              "default": true,
              "description": "Determines whether to show border on radios and checkboxes",
              "title": "Show Answer Border",
              "type": "boolean"
            }
          },
          "title": "Question Configuration",
          "type": "object"
        },
        "steps": {
          "description": "Step configuration",
          "properties": {
            "borderClass": {
              "default": "border-0",
              "description": "Class determines whether cards have borders",
              "enum": [
                "border-ink",
                "border-0"
              ],
              "title": "Border Class",
              "type": "string"
            },
            "core": {},
            "showStepId": {
              "default": false,
              "description": "Toggles whether steps' ids are shown next to the question text",
              "title": "Show Step Id",
              "type": "boolean"
            },
            "titleClass": {
              "default": "",
              "description": "Class to apply to title. Use to add background to question text",
              "enum": [
                "bg-base-lightest",
                ""
              ],
              "title": "Title Class",
              "type": "string"
            }
          },
          "title": "Step Configuration",
          "type": "object"
        }
      },
      "required": [
        "mode",
        "nav",
        "pages"
      ],
      "type": "object"
    },
    "IQuestionnaire": {
      "description": "Definition for survey data input",
      "properties": {
        "actions": {
          "items": {
            "$ref": "#/definitions/IAction"
          },
          "type": "array"
        },
        "branches": {
          "items": {
            "$ref": "#/definitions/IBranch"
          },
          "type": "array"
        },
        "config": {
          "$ref": "#/definitions/IQuestionableConfig"
        },
        "header": {
          "type": "string"
        },
        "pages": {
          "$ref": "#/definitions/IPagesCore"
        },
        "questions": {
          "items": {
            "$ref": "#/definitions/IQuestionCore"
          },
          "type": "array"
        },
        "results": {
          "items": {
            "$ref": "#/definitions/IResult"
          },
          "type": "array"
        },
        "sections": {
          "items": {
            "$ref": "#/definitions/ISectionCore"
          },
          "type": "array"
        }
      },
      "required": [
        "actions",
        "branches",
        "config",
        "header",
        "pages",
        "questions",
        "results",
        "sections"
      ],
      "type": "object"
    },
    "IRefCore": {
      "description": "Generic reference object",
      "properties": {
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "title": {
          "title": "Title",
          "type": "string"
        }
      },
      "required": [
        "id"
      ],
      "type": "object"
    },
    "IRequirementCore": {
      "description": "Defines an individual requirement for accessing a step",
      "properties": {
        "explanation": {
          "description": "User facing description of this requirement",
          "title": "Exlanation",
          "type": "string"
        },
        "maxAge": {
          "description": "Optional maximum age allowed for this requirement",
          "properties": {
            "days": {
              "maximum": 31,
              "minimum": 0,
              "title": "Days",
              "type": [
                "number",
                "null"
              ]
            },
            "months": {
              "maximum": 31,
              "minimum": 0,
              "title": "Months",
              "type": [
                "number",
                "null"
              ]
            },
            "years": {
              "maximum": 100,
              "minimum": 0,
              "title": "Years",
              "type": [
                "number",
                "null"
              ]
            }
          },
          "required": [
            "months",
            "years"
          ],
          "title": "Maximum Age",
          "type": "object"
        },
        "minAge": {
          "description": "Optional minimum age allowed for this requirement",
          "properties": {
            "days": {
              "maximum": 31,
              "minimum": 0,
              "title": "Days",
              "type": [
                "number",
                "null"
              ]
            },
            "months": {
              "maximum": 31,
              "minimum": 0,
              "title": "Months",
              "type": [
                "number",
                "null"
              ]
            },
            "years": {
              "maximum": 100,
              "minimum": 0,
              "title": "Years",
              "type": [
                "number",
                "null"
              ]
            }
          },
          "required": [
            "months",
            "years"
          ],
          "title": "Minimum Age",
          "type": "object"
        },
        "responses": {
          "description": "Map of step id to required answer values",
          "items": {
            "$ref": "#/definitions/IResponseCore"
          },
          "title": "Answers",
          "type": "array"
        }
      },
      "required": [
        "responses"
      ],
      "type": "object"
    },
    "IResponseCore": {
      "description": "Acceptable responses",
      "properties": {
        "answers": {
          "items": {
            "properties": {
              "id": {
                "description": "Unique identifier",
                "title": "Id",
                "type": "string"
              },
              "title": {
                "title": "Title",
                "type": "string"
              }
            },
            "type": "object"
          },
          "type": "array"
        },
        "question": {
          "properties": {
            "answers": {
              "properties": {},
              "type": "object"
            },
            "buttons": {
              "description": "Collection of navigation buttons",
              "properties": {
                "next": {
                  "$ref": "#/definitions/IButton",
                  "default": {
                    "label": "Next"
                  },
                  "description": "Next button",
                  "title": "Next Button"
                },
                "prev": {
                  "$ref": "#/definitions/IButton",
                  "default": {
                    "label": "Prev"
                  },
                  "description": "Previous / Back button",
                  "title": "Prev Button"
                }
              },
              "title": "Buttons",
              "type": "object"
            },
            "entryRequirements": {
              "description": "Collection of requirements to view/enter this step",
              "properties": {},
              "title": "Requirements",
              "type": "object"
            },
            "exitRequirements": {
              "description": "Collection of requirements to leave this step",
              "properties": {},
              "title": "Exit Requirements",
              "type": "object"
            },
            "footer": {
              "description": "Optional footer text to display at the bottom of the step",
              "title": "Footer",
              "type": "string"
            },
            "id": {},
            "info": {
              "description": "Contextual content to display below the step contents and above the footer",
              "title": "Info",
              "type": "string"
            },
            "internalNotes": {
              "description": "Private/internal use only notes for documenting this step",
              "title": "Internal Notes",
              "type": "string"
            },
            "section": {
              "description": "Section to which this step belongs",
              "properties": {
                "id": {},
                "requirements": {
                  "description": "Collection of requirements to enable display of this status",
                  "items": {
                    "$ref": "#/definitions/IRequirementCore"
                  },
                  "title": "Requirements",
                  "type": "array"
                },
                "title": {}
              },
              "title": "Section",
              "type": "object"
            },
            "subTitle": {
              "description": "Text to display below the title",
              "title": "Subtitle",
              "type": "string"
            },
            "title": {},
            "type": {
              "anyOf": [
                {
                  "properties": {},
                  "type": "object"
                },
                {
                  "properties": {},
                  "type": "object"
                },
                {
                  "properties": {},
                  "type": "object"
                }
              ],
              "description": "Step's type, usually implemented by @see{IPageStep} or @see{IQuestionStep}",
              "title": "Step Type"
            }
          },
          "type": "object"
        }
      },
      "required": [
        "answers",
        "question"
      ],
      "type": "object"
    },
    "IResult": {
      "description": "Represents a potential result based on a customer's answers",
      "properties": {
        "category": {
          "description": "Optional tag/category to group results",
          "type": "string"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "label": {
          "description": "Identify the result (e.g. 'Benefit name')",
          "title": "Label",
          "type": "string"
        },
        "reason": {
          "description": "Human readable explanation of result determination",
          "title": "Reason",
          "type": "string"
        },
        "requirements": {
          "description": "Collection of requirements required to achieve this result",
          "items": {
            "$ref": "#/definitions/IRequirementCore"
          },
          "title": "Requirements",
          "type": "array"
        },
        "title": {
          "title": "Title",
          "type": "string"
        }
      },
      "required": [
        "id",
        "label",
        "requirements"
      ],
      "type": "object"
    },
    "ISectionCore": {
      "description": "Defines a survey section, used in progress bar",
      "properties": {
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "requirements": {
          "description": "Collection of requirements to enable display of this status",
          "items": {
            "$ref": "#/definitions/IRequirementCore"
          },
          "title": "Requirements",
          "type": "array"
        },
        "title": {
          "title": "Title",
          "type": "string"
        }
      },
      "required": [
        "id",
        "requirements"
      ],
      "type": "object"
    },
    "IStep": {
      "description": "Generic step data definition. Applies to all types of steps.",
      "properties": {
        "buttons": {
          "description": "Collection of navigation buttons",
          "properties": {
            "next": {
              "$ref": "#/definitions/IButton",
              "default": {
                "label": "Next"
              },
              "description": "Next button",
              "title": "Next Button"
            },
            "prev": {
              "$ref": "#/definitions/IButton",
              "default": {
                "label": "Prev"
              },
              "description": "Previous / Back button",
              "title": "Prev Button"
            }
          },
          "title": "Buttons",
          "type": "object"
        },
        "entryRequirements": {
          "description": "Collection of requirements to view/enter this step",
          "items": {
            "$ref": "#/definitions/IRequirementCore"
          },
          "title": "Requirements",
          "type": "array"
        },
        "exitRequirements": {
          "description": "Collection of requirements to leave this step",
          "items": {
            "$ref": "#/definitions/IRequirementCore"
          },
          "title": "Exit Requirements",
          "type": "array"
        },
        "footer": {
          "description": "Optional footer text to display at the bottom of the step",
          "title": "Footer",
          "type": "string"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "info": {
          "description": "Contextual content to display below the step contents and above the footer",
          "title": "Info",
          "type": "string"
        },
        "internalNotes": {
          "description": "Private/internal use only notes for documenting this step",
          "title": "Internal Notes",
          "type": "string"
        },
        "section": {
          "description": "Section to which this step belongs",
          "properties": {
            "id": {},
            "requirements": {
              "description": "Collection of requirements to enable display of this status",
              "items": {
                "$ref": "#/definitions/IRequirementCore"
              },
              "title": "Requirements",
              "type": "array"
            },
            "title": {}
          },
          "title": "Section",
          "type": "object"
        },
        "subTitle": {
          "description": "Text to display below the title",
          "title": "Subtitle",
          "type": "string"
        },
        "title": {
          "title": "Title",
          "type": "string"
        },
        "type": {
          "description": "Step's type, usually implemented by @see{IPageStep} or @see{IQuestionStep}",
          "enum": [
            "Landing",
            "No Results",
            "Results",
            "Summary",
            "dob",
            "multiple_choice",
            "multiple_select",
            "Edit"
          ],
          "title": "Step Type",
          "type": "string"
        }
      },
      "required": [
        "id",
        "section",
        "type"
      ],
      "type": "object"
    },
    "IStepConfig": {
      "description": "Customizations for styling and formatting of the steps",
      "properties": {
        "borderClass": {
          "default": "border-0",
          "description": "Class determines whether cards have borders",
          "enum": [
            "border-ink",
            "border-0"
          ],
          "title": "Border Class",
          "type": "string"
        },
        "core": {
          "enum": [
            "IStepConfig",
            "I"
          ],
          "type": "string"
        },
        "showStepId": {
          "default": false,
          "description": "Toggles whether steps' ids are shown next to the question text",
          "title": "Show Step Id",
          "type": "boolean"
        },
        "titleClass": {
          "default": "",
          "description": "Class to apply to title. Use to add background to question text",
          "enum": [
            "bg-base-lightest",
            ""
          ],
          "title": "Title Class",
          "type": "string"
        }
      },
      "required": [
        "borderClass",
        "showStepId",
        "titleClass"
      ],
      "type": "object"
    },
    "IStepData": {
      "description": "Data defintion for base wizard step",
      "properties": {
        "form": {
          "$ref": "#/definitions/IFormCore",
          "description": "The user's current form state",
          "title": "Form"
        },
        "step": {
          "$ref": "#/definitions/IStep",
          "description": "Current step",
          "title": "Step"
        },
        "stepId": {
          "description": "Internally unique identifier",
          "title": "Step ID",
          "type": [
            "string",
            "number"
          ]
        }
      },
      "required": [
        "form",
        "stepId"
      ],
      "type": "object"
    },
    "QuestionableConfig": {
      "description": "Configuration class for customizing the Questionable components\n\nThe config has opinionated defaults, but is easily modified using Partial updates",
      "properties": {
        "mode": {
          "default": "MODE.VIEW",
          "description": "View or edit mode",
          "enum": [
            "dev",
            "edit",
            "view"
          ],
          "title": "Mode",
          "type": "string"
        },
        "nav": {
          "description": "Navigation configuration",
          "properties": {
            "core": {
              "enum": [
                "INavigationConfig",
                "I"
              ],
              "type": "string"
            }
          },
          "title": "Navigation",
          "type": "object"
        },
        "pages": {
          "description": "Page configuration",
          "properties": {
            "core": {
              "enum": [
                "IPagesConfig",
                "I"
              ],
              "type": "string"
            }
          },
          "title": "Pages",
          "type": "object"
        },
        "progressBar": {
          "description": "Progress Bar configuration",
          "properties": {
            "core": {
              "enum": [
                "IProgressBarConfig",
                "I"
              ],
              "type": "string"
            }
          },
          "title": "Progress Bar",
          "type": "object"
        },
        "questions": {
          "description": "Question configuration",
          "properties": {
            "core": {
              "enum": [
                "IQuestionConfig",
                "I"
              ],
              "type": "string"
            }
          },
          "title": "Question Configuration",
          "type": "object"
        },
        "steps": {
          "description": "Step configuration",
          "properties": {
            "core": {
              "enum": [
                "IStepConfig",
                "I"
              ],
              "type": "string"
            }
          },
          "title": "Step Configuration",
          "type": "object"
        }
      },
      "required": [
        "mode",
        "nav",
        "pages"
      ],
      "type": "object"
    },
    "Questionnaire": {
      "description": "Utility wrapper for survey state",
      "properties": {
        "actions": {
          "items": {
            "$ref": "#/definitions/IAction"
          },
          "type": "array"
        },
        "branches": {
          "items": {
            "$ref": "#/definitions/IBranch"
          },
          "type": "array"
        },
        "config": {
          "$ref": "#/definitions/QuestionableConfig"
        },
        "flow": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "header": {
          "type": "string"
        },
        "pages": {
          "$ref": "#/definitions/IPagesCore"
        },
        "questions": {
          "items": {
            "$ref": "#/definitions/IQuestionCore"
          },
          "type": "array"
        },
        "results": {
          "items": {
            "$ref": "#/definitions/IResult"
          },
          "type": "array"
        },
        "sections": {
          "items": {
            "$ref": "#/definitions/ISectionCore"
          },
          "type": "array"
        }
      },
      "required": [
        "actions",
        "branches",
        "config",
        "flow",
        "header",
        "pages",
        "questions",
        "results",
        "sections"
      ],
      "type": "object"
    },
    "TAnswerData": {
      "description": "Event data structure to be sent with event callbacks",
      "properties": {
        "answer": {
          "type": "string"
        },
        "step": {
          "type": "string"
        }
      },
      "required": [
        "answer",
        "step"
      ],
      "title": "Event Data Type",
      "type": "object"
    },
    "TEvent": {
      "anyOf": [
        {
          "$ref": "#/definitions/TPageData"
        },
        {
          "$ref": "#/definitions/TAnswerData"
        },
        {
          "$ref": "#/definitions/TResultData"
        },
        {
          "$ref": "#/definitions/IFormCore"
        }
      ]
    },
    "TPageData": {
      "description": "Event data structure to be sent with event callbacks",
      "properties": {
        "dir": {
          "description": "Navigation direction for steps by array index (+1 or -1)",
          "enum": [
            1,
            -1
          ],
          "type": "number"
        },
        "step": {
          "type": "string"
        }
      },
      "required": [
        "dir",
        "step"
      ],
      "title": "Event Data Type",
      "type": "object"
    },
    "TResultData": {
      "properties": {
        "props": {
          "description": "Data defintion for base wizard step",
          "properties": {
            "form": {
              "description": "The user's current form state",
              "properties": {
                "age": {
                  "description": "Customer's age in years/months/days",
                  "properties": {
                    "days": {
                      "maximum": 31,
                      "minimum": 0,
                      "title": "Days",
                      "type": [
                        "number",
                        "null"
                      ]
                    },
                    "months": {
                      "maximum": 31,
                      "minimum": 0,
                      "title": "Months",
                      "type": [
                        "number",
                        "null"
                      ]
                    },
                    "years": {
                      "maximum": 100,
                      "minimum": 0,
                      "title": "Years",
                      "type": [
                        "number",
                        "null"
                      ]
                    }
                  },
                  "required": [
                    "months",
                    "years"
                  ],
                  "title": "Age",
                  "type": "object"
                },
                "birthdate": {
                  "description": "Customer's entered birthdate",
                  "title": "Birthdate",
                  "type": "string"
                },
                "finished": {
                  "description": "Time the survey was completed",
                  "format": "date-time",
                  "title": "Finished",
                  "type": "string"
                },
                "responses": {
                  "description": "All currently provided responses",
                  "items": {
                    "description": "Defines step content for Question type",
                    "properties": {
                      "answers": {
                        "description": "Collection of allowed answers",
                        "items": {
                          "description": "Generic reference object",
                          "properties": {
                            "id": {
                              "description": "Unique identifier",
                              "title": "Id",
                              "type": "string"
                            },
                            "title": {
                              "title": "Title",
                              "type": "string"
                            }
                          },
                          "required": [
                            "id"
                          ],
                          "type": "object"
                        },
                        "title": "Answers",
                        "type": "array"
                      },
                      "entryRequirements": {
                        "description": "Collection of requirements to view/enter this step",
                        "items": {
                          "$ref": "#/definitions/interface-d.ts-6522-7299-d.ts-0-61553408250476"
                        },
                        "title": "Requirements",
                        "type": "array"
                      },
                      "exitRequirements": {
                        "description": "Collection of requirements to leave this step",
                        "items": {
                          "$ref": "#/definitions/interface-d.ts-6522-7299-d.ts-0-61553408250476"
                        },
                        "title": "Exit Requirements",
                        "type": "array"
                      },
                      "footer": {
                        "description": "Optional footer text to display at the bottom of the step",
                        "title": "Footer",
                        "type": "string"
                      },
                      "id": {
                        "description": "Unique identifier",
                        "title": "Id",
                        "type": "string"
                      },
                      "info": {
                        "description": "Contextual content to display below the step contents and above the footer",
                        "title": "Info",
                        "type": "string"
                      },
                      "internalNotes": {
                        "description": "Private/internal use only notes for documenting this step",
                        "title": "Internal Notes",
                        "type": "string"
                      },
                      "section": {
                        "description": "Section to which this step belongs",
                        "properties": {
                          "id": {},
                          "requirements": {
                            "description": "Collection of requirements to enable display of this status",
                            "items": {
                              "$ref": "#/definitions/interface-d.ts-6522-7299-d.ts-0-61553408250476"
                            },
                            "title": "Requirements",
                            "type": "array"
                          },
                          "title": {}
                        },
                        "title": "Section",
                        "type": "object"
                      },
                      "subTitle": {
                        "description": "Text to display below the title",
                        "title": "Subtitle",
                        "type": "string"
                      },
                      "title": {
                        "title": "Title",
                        "type": "string"
                      },
                      "type": {
                        "description": "Type of question",
                        "enum": [
                          "dob",
                          "multiple_choice",
                          "multiple_select"
                        ],
                        "title": "Question Type",
                        "type": "string"
                      }
                    },
                    "required": [
                      "answers",
                      "id",
                      "section",
                      "type"
                    ],
                    "type": "object"
                  },
                  "title": "Responses",
                  "type": "array"
                },
                "started": {
                  "description": "Time the survey was started",
                  "format": "date-time",
                  "title": "Started",
                  "type": "string"
                }
              },
              "required": [
                "responses",
                "started"
              ],
              "title": "FormCore",
              "type": "object"
            },
            "step": {
              "description": "Current step",
              "properties": {
                "entryRequirements": {
                  "description": "Collection of requirements to view/enter this step",
                  "items": {
                    "description": "Defines an individual requirement for accessing a step",
                    "properties": {
                      "explanation": {
                        "description": "User facing description of this requirement",
                        "title": "Exlanation",
                        "type": "string"
                      },
                      "maxAge": {
                        "description": "Optional maximum age allowed for this requirement",
                        "properties": {
                          "days": {
                            "maximum": 31,
                            "minimum": 0,
                            "title": "Days",
                            "type": [
                              "number",
                              "null"
                            ]
                          },
                          "months": {
                            "maximum": 31,
                            "minimum": 0,
                            "title": "Months",
                            "type": [
                              "number",
                              "null"
                            ]
                          },
                          "years": {
                            "maximum": 100,
                            "minimum": 0,
                            "title": "Years",
                            "type": [
                              "number",
                              "null"
                            ]
                          }
                        },
                        "required": [
                          "months",
                          "years"
                        ],
                        "title": "Maximum Age",
                        "type": "object"
                      },
                      "minAge": {
                        "description": "Optional minimum age allowed for this requirement",
                        "properties": {
                          "days": {
                            "maximum": 31,
                            "minimum": 0,
                            "title": "Days",
                            "type": [
                              "number",
                              "null"
                            ]
                          },
                          "months": {
                            "maximum": 31,
                            "minimum": 0,
                            "title": "Months",
                            "type": [
                              "number",
                              "null"
                            ]
                          },
                          "years": {
                            "maximum": 100,
                            "minimum": 0,
                            "title": "Years",
                            "type": [
                              "number",
                              "null"
                            ]
                          }
                        },
                        "required": [
                          "months",
                          "years"
                        ],
                        "title": "Minimum Age",
                        "type": "object"
                      },
                      "responses": {
                        "description": "Map of step id to required answer values",
                        "items": {
                          "description": "Acceptable responses",
                          "properties": {
                            "answers": {
                              "items": {
                                "properties": {
                                  "id": {
                                    "description": "Unique identifier",
                                    "title": "Id",
                                    "type": "string"
                                  },
                                  "title": {
                                    "title": "Title",
                                    "type": "string"
                                  }
                                },
                                "type": "object"
                              },
                              "type": "array"
                            },
                            "question": {
                              "properties": {
                                "answers": {
                                  "description": "Collection of allowed answers",
                                  "items": {
                                    "description": "Generic reference object",
                                    "properties": {
                                      "id": {
                                        "description": "Unique identifier",
                                        "title": "Id",
                                        "type": "string"
                                      },
                                      "title": {
                                        "title": "Title",
                                        "type": "string"
                                      }
                                    },
                                    "required": [
                                      "id"
                                    ],
                                    "type": "object"
                                  },
                                  "title": "Answers",
                                  "type": "array"
                                },
                                "entryRequirements": {},
                                "exitRequirements": {},
                                "footer": {},
                                "id": {},
                                "info": {},
                                "internalNotes": {},
                                "section": {},
                                "subTitle": {},
                                "title": {},
                                "type": {
                                  "description": "Type of question",
                                  "enum": [
                                    "dob",
                                    "multiple_choice",
                                    "multiple_select"
                                  ],
                                  "title": "Question Type",
                                  "type": "string"
                                }
                              },
                              "type": "object"
                            }
                          },
                          "required": [
                            "answers",
                            "question"
                          ],
                          "type": "object"
                        },
                        "title": "Answers",
                        "type": "array"
                      }
                    },
                    "required": [
                      "responses"
                    ],
                    "type": "object"
                  },
                  "title": "Requirements",
                  "type": "array"
                },
                "exitRequirements": {
                  "description": "Collection of requirements to leave this step",
                  "items": {
                    "description": "Defines an individual requirement for accessing a step",
                    "properties": {
                      "explanation": {
                        "description": "User facing description of this requirement",
                        "title": "Exlanation",
                        "type": "string"
                      },
                      "maxAge": {
                        "description": "Optional maximum age allowed for this requirement",
                        "properties": {
                          "days": {
                            "maximum": 31,
                            "minimum": 0,
                            "title": "Days",
                            "type": [
                              "number",
                              "null"
                            ]
                          },
                          "months": {
                            "maximum": 31,
                            "minimum": 0,
                            "title": "Months",
                            "type": [
                              "number",
                              "null"
                            ]
                          },
                          "years": {
                            "maximum": 100,
                            "minimum": 0,
                            "title": "Years",
                            "type": [
                              "number",
                              "null"
                            ]
                          }
                        },
                        "required": [
                          "months",
                          "years"
                        ],
                        "title": "Maximum Age",
                        "type": "object"
                      },
                      "minAge": {
                        "description": "Optional minimum age allowed for this requirement",
                        "properties": {
                          "days": {
                            "maximum": 31,
                            "minimum": 0,
                            "title": "Days",
                            "type": [
                              "number",
                              "null"
                            ]
                          },
                          "months": {
                            "maximum": 31,
                            "minimum": 0,
                            "title": "Months",
                            "type": [
                              "number",
                              "null"
                            ]
                          },
                          "years": {
                            "maximum": 100,
                            "minimum": 0,
                            "title": "Years",
                            "type": [
                              "number",
                              "null"
                            ]
                          }
                        },
                        "required": [
                          "months",
                          "years"
                        ],
                        "title": "Minimum Age",
                        "type": "object"
                      },
                      "responses": {
                        "description": "Map of step id to required answer values",
                        "items": {
                          "description": "Acceptable responses",
                          "properties": {
                            "answers": {
                              "items": {
                                "properties": {
                                  "id": {
                                    "description": "Unique identifier",
                                    "title": "Id",
                                    "type": "string"
                                  },
                                  "title": {
                                    "title": "Title",
                                    "type": "string"
                                  }
                                },
                                "type": "object"
                              },
                              "type": "array"
                            },
                            "question": {
                              "properties": {
                                "answers": {
                                  "description": "Collection of allowed answers",
                                  "items": {
                                    "description": "Generic reference object",
                                    "properties": {
                                      "id": {
                                        "description": "Unique identifier",
                                        "title": "Id",
                                        "type": "string"
                                      },
                                      "title": {
                                        "title": "Title",
                                        "type": "string"
                                      }
                                    },
                                    "required": [
                                      "id"
                                    ],
                                    "type": "object"
                                  },
                                  "title": "Answers",
                                  "type": "array"
                                },
                                "entryRequirements": {},
                                "exitRequirements": {},
                                "footer": {},
                                "id": {},
                                "info": {},
                                "internalNotes": {},
                                "section": {},
                                "subTitle": {},
                                "title": {},
                                "type": {
                                  "description": "Type of question",
                                  "enum": [
                                    "dob",
                                    "multiple_choice",
                                    "multiple_select"
                                  ],
                                  "title": "Question Type",
                                  "type": "string"
                                }
                              },
                              "type": "object"
                            }
                          },
                          "required": [
                            "answers",
                            "question"
                          ],
                          "type": "object"
                        },
                        "title": "Answers",
                        "type": "array"
                      }
                    },
                    "required": [
                      "responses"
                    ],
                    "type": "object"
                  },
                  "title": "Exit Requirements",
                  "type": "array"
                },
                "footer": {
                  "description": "Optional footer text to display at the bottom of the step",
                  "title": "Footer",
                  "type": "string"
                },
                "id": {
                  "description": "Unique identifier",
                  "title": "Id",
                  "type": "string"
                },
                "info": {
                  "description": "Contextual content to display below the step contents and above the footer",
                  "title": "Info",
                  "type": "string"
                },
                "internalNotes": {
                  "description": "Private/internal use only notes for documenting this step",
                  "title": "Internal Notes",
                  "type": "string"
                },
                "section": {
                  "description": "Section to which this step belongs",
                  "properties": {
                    "id": {},
                    "requirements": {
                      "description": "Collection of requirements to enable display of this status",
                      "items": {
                        "$ref": "#/definitions/interface-d.ts-6522-7299-d.ts-0-61553408250476"
                      },
                      "title": "Requirements",
                      "type": "array"
                    },
                    "title": {}
                  },
                  "title": "Section",
                  "type": "object"
                },
                "subTitle": {
                  "description": "Text to display below the title",
                  "title": "Subtitle",
                  "type": "string"
                },
                "title": {
                  "title": "Title",
                  "type": "string"
                },
                "type": {
                  "description": "Step's type, usually implemented by @see{IPageStep} or @see{IQuestionStep}",
                  "enum": [
                    "Landing",
                    "No Results",
                    "Results",
                    "Summary",
                    "dob",
                    "multiple_choice",
                    "multiple_select",
                    "Edit"
                  ],
                  "title": "Step Type",
                  "type": "string"
                }
              },
              "required": [
                "id",
                "section",
                "type"
              ],
              "title": "Step",
              "type": "object"
            },
            "stepId": {
              "description": "Internally unique identifier",
              "title": "Step ID",
              "type": [
                "string",
                "number"
              ]
            }
          },
          "required": [
            "form",
            "stepId"
          ],
          "type": "object"
        },
        "results": {
          "items": {
            "properties": {
              "id": {
                "type": "string"
              },
              "label": {
                "type": "string"
              },
              "reason": {
                "type": "string"
              },
              "title": {
                "type": "string"
              }
            },
            "required": [
              "id",
              "label",
              "reason"
            ],
            "type": "object"
          },
          "type": "array"
        },
        "step": {
          "const": "results",
          "type": "string"
        }
      },
      "required": [
        "props",
        "results",
        "step"
      ],
      "type": "object"
    },
    "interface-d.ts-6522-7299-d.ts-0-61553408250476": {
      "description": "Defines an individual requirement for accessing a step",
      "properties": {
        "explanation": {
          "description": "User facing description of this requirement",
          "title": "Exlanation",
          "type": "string"
        },
        "maxAge": {
          "description": "Optional maximum age allowed for this requirement",
          "properties": {
            "days": {
              "maximum": 31,
              "minimum": 0,
              "title": "Days",
              "type": [
                "number",
                "null"
              ]
            },
            "months": {
              "maximum": 31,
              "minimum": 0,
              "title": "Months",
              "type": [
                "number",
                "null"
              ]
            },
            "years": {
              "maximum": 100,
              "minimum": 0,
              "title": "Years",
              "type": [
                "number",
                "null"
              ]
            }
          },
          "required": [
            "months",
            "years"
          ],
          "title": "Maximum Age",
          "type": "object"
        },
        "minAge": {
          "description": "Optional minimum age allowed for this requirement",
          "properties": {
            "days": {
              "maximum": 31,
              "minimum": 0,
              "title": "Days",
              "type": [
                "number",
                "null"
              ]
            },
            "months": {
              "maximum": 31,
              "minimum": 0,
              "title": "Months",
              "type": [
                "number",
                "null"
              ]
            },
            "years": {
              "maximum": 100,
              "minimum": 0,
              "title": "Years",
              "type": [
                "number",
                "null"
              ]
            }
          },
          "required": [
            "months",
            "years"
          ],
          "title": "Minimum Age",
          "type": "object"
        },
        "responses": {
          "description": "Map of step id to required answer values",
          "items": {
            "description": "Acceptable responses",
            "properties": {
              "answers": {
                "items": {
                  "properties": {
                    "id": {
                      "description": "Unique identifier",
                      "title": "Id",
                      "type": "string"
                    },
                    "title": {
                      "title": "Title",
                      "type": "string"
                    }
                  },
                  "type": "object"
                },
                "type": "array"
              },
              "question": {
                "properties": {
                  "answers": {
                    "description": "Collection of allowed answers",
                    "items": {
                      "description": "Generic reference object",
                      "properties": {
                        "id": {
                          "description": "Unique identifier",
                          "title": "Id",
                          "type": "string"
                        },
                        "title": {
                          "title": "Title",
                          "type": "string"
                        }
                      },
                      "required": [
                        "id"
                      ],
                      "type": "object"
                    },
                    "title": "Answers",
                    "type": "array"
                  },
                  "entryRequirements": {},
                  "exitRequirements": {},
                  "footer": {},
                  "id": {},
                  "info": {},
                  "internalNotes": {},
                  "section": {},
                  "subTitle": {},
                  "title": {},
                  "type": {
                    "description": "Type of question",
                    "enum": [
                      "dob",
                      "multiple_choice",
                      "multiple_select"
                    ],
                    "title": "Question Type",
                    "type": "string"
                  }
                },
                "type": "object"
              }
            },
            "required": [
              "answers",
              "question"
            ],
            "type": "object"
          },
          "title": "Answers",
          "type": "array"
        }
      },
      "required": [
        "responses"
      ],
      "type": "object"
    }
  }
};
