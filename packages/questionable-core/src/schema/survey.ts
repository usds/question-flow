// This files is code generated. Do not edit.
/* eslint-disable */
export const survey = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "DESIGN_TYPE": {
      "const": "Edit",
      "description": "Defines the known component types for design",
      "type": "string"
    },
    "DIRECTION": {
      "description": "Navigation direction for steps by array index (+1 or -1)",
      "enum": [
        1,
        -1
      ],
      "type": "number"
    },
    "IActionCore": {
      "description": "Represents something the customer can do in response to receiving a result",
      "properties": {
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
    "IBranchCore": {
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
    "IButtonConfigCore": {
      "description": "Configuration for buttons",
      "properties": {
        "core": {
          "enum": [
            "IButtonConfig",
            "I"
          ],
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
        "title": {
          "title": "Title",
          "type": "string"
        },
        "type": {
          "$ref": "#/definitions/TButtonModeCore",
          "description": "Render mode (link or button)",
          "title": "Mode"
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
    "IButtonCore": {
      "description": "Represents a navigation button",
      "properties": {
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
        "title": {
          "title": "Title",
          "type": "string"
        },
        "type": {
          "$ref": "#/definitions/TButtonModeCore",
          "description": "Render mode (link or button)",
          "title": "Mode"
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
    "IDesignDataCore": {
      "description": "Data defintion for design step",
      "properties": {
        "form": {
          "$ref": "#/definitions/IFormCore",
          "description": "The user's current form state",
          "title": "FormCore"
        },
        "step": {
          "$ref": "#/definitions/IStepCore",
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
      "description": "Event Model",
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
      "title": "Event",
      "type": "object"
    },
    "IFormCore": {
      "description": "Represents the survey as completed by the user",
      "properties": {
        "age": {
          "$ref": "#/definitions/TAgeCore",
          "description": "Customer's age in years/months/days",
          "title": "Age"
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
    "INavigationConfigCore": {
      "description": "Configuration for navigation",
      "properties": {
        "core": {
          "enum": [
            "INavigationConfig",
            "I"
          ],
          "type": "string"
        }
      },
      "type": "object"
    },
    "IPageConfigCore": {
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
      "type": "object"
    },
    "IPageCore": {
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
          "$ref": "#/definitions/PAGE_TYPE",
          "description": "Type of page",
          "title": "Page Type"
        }
      },
      "required": [
        "id",
        "section",
        "type"
      ],
      "type": "object"
    },
    "IPageDataCore": {
      "description": "Data defintion for page step",
      "properties": {
        "form": {
          "$ref": "#/definitions/IFormCore",
          "description": "The user's current form state",
          "title": "FormCore"
        },
        "step": {
          "$ref": "#/definitions/IPageCore",
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
    "IPagesConfigCore": {
      "properties": {
        "core": {
          "enum": [
            "IPagesConfig",
            "I"
          ],
          "type": "string"
        }
      },
      "type": "object"
    },
    "IPagesCore": {
      "additionalProperties": {
        "anyOf": [
          {
            "$ref": "#/definitions/IPageCore"
          },
          {
            "not": {}
          }
        ]
      },
      "description": "Defines required pages for the survey flow",
      "properties": {
        "landingPage": {
          "$ref": "#/definitions/IPageCore",
          "description": "First step of the survey",
          "title": "Landing Page"
        },
        "noResultsPage": {
          "$ref": "#/definitions/IPageCore",
          "description": "Last step of the survey if there are 0 results",
          "title": "No Results Page"
        },
        "resultsPage": {
          "$ref": "#/definitions/IPageCore",
          "description": "Last step of the survey if there are 1 or more results",
          "title": "Results Page"
        },
        "summaryPage": {
          "$ref": "#/definitions/IPageCore",
          "description": "Preview of survery before submitting to receive results",
          "title": "Summary Page"
        }
      },
      "type": "object"
    },
    "IProgressBarConfigCore": {
      "description": "Configuration options for the progress bar",
      "properties": {
        "core": {
          "enum": [
            "IProgressBarConfig",
            "I"
          ],
          "type": "string"
        }
      },
      "type": "object"
    },
    "IQuestionConfigCore": {
      "description": "Configuration for question display",
      "properties": {
        "core": {
          "enum": [
            "IQuestionConfig",
            "I"
          ],
          "type": "string"
        }
      },
      "type": "object"
    },
    "IQuestionCore": {
      "description": "Defines step content for Question type",
      "properties": {
        "answers": {
          "description": "Collection of allowed answers",
          "items": {
            "$ref": "#/definitions/IRefCore"
          },
          "title": "Answers",
          "type": "array"
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
          "$ref": "#/definitions/QUESTION_TYPE",
          "description": "Type of question",
          "title": "Question Type"
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
    "IQuestionDataCore": {
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
          "$ref": "#/definitions/IFormCore",
          "description": "The user's current form state",
          "title": "FormCore"
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
    "IQuestionableConfigCore": {
      "description": "Configuration for customized behavior of Questionable",
      "properties": {
        "mode": {
          "$ref": "#/definitions/MODE",
          "default": "MODE.VIEW",
          "description": "View or edit mode",
          "title": "Mode"
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
    "IQuestionnaireCore": {
      "description": "Definition for survey data input",
      "properties": {
        "actions": {
          "items": {
            "$ref": "#/definitions/IActionCore"
          },
          "type": "array"
        },
        "branches": {
          "items": {
            "$ref": "#/definitions/IBranchCore"
          },
          "type": "array"
        },
        "config": {
          "$ref": "#/definitions/IQuestionableConfigCore"
        },
        "form": {
          "$ref": "#/definitions/IFormCore"
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
            "$ref": "#/definitions/IResultCore"
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
        "form",
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
          "$ref": "#/definitions/TAgeCore",
          "description": "Optional maximum age allowed for this requirement",
          "title": "Maximum Age"
        },
        "minAge": {
          "$ref": "#/definitions/TAgeCore",
          "description": "Optional minimum age allowed for this requirement",
          "title": "Minimum Age"
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
              "description": "Collection of allowed answers",
              "items": {
                "$ref": "#/definitions/IRefCore"
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
              "$ref": "#/definitions/QUESTION_TYPE",
              "description": "Type of question",
              "title": "Question Type"
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
    "IResultCore": {
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
    "IStepConfigCore": {
      "description": "Customizations for styling and formatting of the steps",
      "properties": {
        "core": {
          "enum": [
            "IStepConfig",
            "I"
          ],
          "type": "string"
        }
      },
      "type": "object"
    },
    "IStepCore": {
      "description": "Generic step data definition. Applies to all types of steps.",
      "properties": {
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
          "$ref": "#/definitions/TStepType",
          "description": "Step's type, usually implemented by @see{IPageStep} or @see{IQuestionStep}",
          "title": "Step Type"
        }
      },
      "required": [
        "id",
        "section",
        "type"
      ],
      "type": "object"
    },
    "IStepDataCore": {
      "description": "Data defintion for base wizard step",
      "properties": {
        "form": {
          "$ref": "#/definitions/IFormCore",
          "description": "The user's current form state",
          "title": "FormCore"
        },
        "step": {
          "$ref": "#/definitions/IStepCore",
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
    "MODE": {
      "enum": [
        "dev",
        "edit",
        "view"
      ],
      "type": "string"
    },
    "PAGE_TYPE": {
      "description": "Defines the known component types for pages",
      "enum": [
        "Landing",
        "No Results",
        "Results",
        "Summary"
      ],
      "type": "string"
    },
    "QUESTION_TYPE": {
      "description": "Defines the known component types for questions",
      "enum": [
        "dob",
        "multiple_choice",
        "multiple_select",
        "text"
      ],
      "type": "string"
    },
    "TAgeCore": {
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
      "type": "object"
    },
    "TAnswerDataCore": {
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
    "TButtonModeCore": {
      "type": "string"
    },
    "TEventCore": {
      "anyOf": [
        {
          "$ref": "#/definitions/TPageDataCore"
        },
        {
          "$ref": "#/definitions/TAnswerDataCore"
        },
        {
          "$ref": "#/definitions/TResultDataCore"
        },
        {
          "$ref": "#/definitions/IFormCore"
        },
        {
          "$ref": "#/definitions/TGateDataCore"
        }
      ],
      "description": "Generic data input for event context"
    },
    "TGateCore": {
      "description": "Represents any type of mutation which has significant impact",
      "enum": [
        "branch",
        "age"
      ],
      "title": "Gate Type",
      "type": "string"
    },
    "TGateDataCore": {
      "properties": {
        "data": {},
        "gate": {
          "$ref": "#/definitions/TGateCore"
        }
      },
      "required": [
        "data",
        "gate"
      ],
      "type": "object"
    },
    "TPageDataCore": {
      "description": "Event data structure to be sent with event callbacks",
      "properties": {
        "dir": {
          "$ref": "#/definitions/DIRECTION"
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
    "TResultDataCore": {
      "description": "Event data structure for results",
      "properties": {
        "props": {
          "$ref": "#/definitions/IStepDataCore"
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
      "title": "Event Result Type",
      "type": "object"
    },
    "TStepType": {
      "anyOf": [
        {
          "$ref": "#/definitions/PAGE_TYPE"
        },
        {
          "$ref": "#/definitions/QUESTION_TYPE"
        },
        {
          "$ref": "#/definitions/DESIGN_TYPE"
        }
      ]
    }
  }
};