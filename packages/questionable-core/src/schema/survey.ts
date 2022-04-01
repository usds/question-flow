// This files is code generated. Do not edit.
/* eslint-disable */
export const survey = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "ActionCore": {
      "properties": {
        "#id": {
          "type": "string"
        },
        "form": {
          "$ref": "#/definitions/FormCore"
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
        "questionnaire": {
          "$ref": "#/definitions/QuestionnaireCore"
        },
        "subTitle": {
          "title": "Description",
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "#id",
        "form",
        "id",
        "label",
        "questionnaire"
      ],
      "type": "object"
    },
    "AnswerCore": {
      "properties": {
        "#id": {
          "type": "string"
        },
        "form": {
          "$ref": "#/definitions/FormCore"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "questionnaire": {
          "$ref": "#/definitions/QuestionnaireCore"
        },
        "title": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "#id",
        "form",
        "id",
        "questionnaire"
      ],
      "type": "object"
    },
    "BASE": {
      "const": "default",
      "description": "Defines the known component types for pages",
      "type": "string"
    },
    "BaseCore": {
      "properties": {
        "#id": {
          "type": "string"
        },
        "form": {
          "$ref": "#/definitions/FormCore"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "#id",
        "form",
        "id"
      ],
      "type": "object"
    },
    "BranchCore": {
      "properties": {
        "#id": {
          "type": "string"
        },
        "form": {
          "$ref": "#/definitions/FormCore"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "questionnaire": {
          "$ref": "#/definitions/QuestionnaireCore"
        },
        "questions": {
          "items": {
            "$ref": "#/definitions/QuestionCore"
          },
          "type": "array"
        },
        "title": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "#id",
        "form",
        "id",
        "questionnaire",
        "questions"
      ],
      "type": "object"
    },
    "ComposableCore": {
      "properties": {
        "#id": {
          "type": "string"
        },
        "form": {
          "$ref": "#/definitions/FormCore"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "questionnaire": {
          "$ref": "#/definitions/QuestionnaireCore"
        },
        "title": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "#id",
        "form",
        "id",
        "questionnaire"
      ],
      "type": "object"
    },
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
    "FormCore": {
      "properties": {
        "#finished": {
          "format": "date-time",
          "type": "string"
        },
        "age": {
          "$ref": "#/definitions/TAgeCore",
          "description": "Customer's age in years/months/days"
        },
        "birthdate": {
          "description": "Customer's entered birthdate",
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
            "$ref": "#/definitions/QuestionCore"
          },
          "type": "array"
        },
        "started": {
          "description": "Time the survey was started",
          "format": "date-time",
          "type": "string"
        }
      },
      "required": [
        "responses",
        "started"
      ],
      "type": "object"
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
        "default",
        "Landing",
        "No Results",
        "Results",
        "Summary"
      ],
      "type": "string"
    },
    "PROGRESS_BAR_STATUS": {
      "description": "Progress Bar status",
      "enum": [
        "complete",
        "current",
        "incomplete"
      ],
      "type": "string"
    },
    "PageCore": {
      "properties": {
        "#id": {
          "type": "string"
        },
        "body": {
          "description": "Defines the body content of the page",
          "type": "string"
        },
        "bodyHeader": {
          "description": "Optional header to display above body",
          "type": "string"
        },
        "bodySubHeader": {
          "description": "Optional sub header to display below Body Heading",
          "type": "string"
        },
        "entryRequirements": {
          "description": "Collection of requirements to view/enter this step",
          "items": {
            "$ref": "#/definitions/RequirementCore"
          },
          "type": "array"
        },
        "exitRequirements": {
          "description": "Collection of requirements to leave this step",
          "items": {
            "$ref": "#/definitions/RequirementCore"
          },
          "type": "array"
        },
        "footer": {
          "description": "Optional footer text to display at the bottom of the step",
          "type": "string"
        },
        "form": {
          "$ref": "#/definitions/FormCore"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "info": {
          "description": "Contextual content to display below the step contents and above the footer",
          "type": "string"
        },
        "internalNotes": {
          "description": "Private/internal use only notes for documenting this step",
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "order": {
          "description": "Display order of the Step. Determined at runtime.",
          "type": "number"
        },
        "questionnaire": {
          "$ref": "#/definitions/QuestionnaireCore"
        },
        "section": {
          "$ref": "#/definitions/SectionCore",
          "description": "Section to which this step belongs"
        },
        "subTitle": {
          "description": "Text to display below the title",
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "type": {
          "$ref": "#/definitions/PAGE_TYPE"
        }
      },
      "required": [
        "#id",
        "body",
        "bodyHeader",
        "bodySubHeader",
        "entryRequirements",
        "exitRequirements",
        "footer",
        "form",
        "id",
        "info",
        "internalNotes",
        "order",
        "questionnaire",
        "section",
        "subTitle",
        "title",
        "type"
      ],
      "type": "object"
    },
    "PagesCore": {
      "additionalProperties": {
        "anyOf": [
          {
            "$ref": "#/definitions/PageCore"
          },
          {
            "not": {}
          },
          {
            "$ref": "#/definitions/IPageCore"
          },
          {
            "not": {}
          }
        ]
      },
      "properties": {
        "landingPage": {
          "$ref": "#/definitions/PageCore",
          "description": "First step of the survey"
        },
        "noResultsPage": {
          "$ref": "#/definitions/PageCore",
          "description": "Last step of the survey if there are 0 results"
        },
        "resultsPage": {
          "$ref": "#/definitions/PageCore",
          "description": "Last step of the survey if there are 1 or more results"
        },
        "summaryPage": {
          "$ref": "#/definitions/PageCore",
          "description": "Preview of survery before submitting to receive results"
        }
      },
      "required": [
        "landingPage",
        "noResultsPage",
        "resultsPage",
        "summaryPage"
      ],
      "type": "object"
    },
    "QUESTION_TYPE": {
      "description": "Defines the known component types for questions",
      "enum": [
        "date_time",
        "default",
        "dob",
        "multiple_choice",
        "multiple_select",
        "path",
        "text"
      ],
      "type": "string"
    },
    "QuestionCore": {
      "properties": {
        "#answers": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "#id": {
          "type": "string"
        },
        "answers": {
          "description": "Collection of allowed answers",
          "items": {
            "$ref": "#/definitions/AnswerCore"
          },
          "type": "array"
        },
        "branch": {
          "$ref": "#/definitions/BranchCore",
          "description": "Collection of branches that use this question"
        },
        "entryRequirements": {
          "description": "Collection of requirements to view/enter this step",
          "items": {
            "$ref": "#/definitions/RequirementCore"
          },
          "type": "array"
        },
        "exitRequirements": {
          "description": "Collection of requirements to leave this step",
          "items": {
            "$ref": "#/definitions/RequirementCore"
          },
          "type": "array"
        },
        "footer": {
          "description": "Optional footer text to display at the bottom of the step",
          "type": "string"
        },
        "form": {
          "$ref": "#/definitions/FormCore"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "info": {
          "description": "Contextual content to display below the step contents and above the footer",
          "type": "string"
        },
        "internalNotes": {
          "description": "Private/internal use only notes for documenting this step",
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "order": {
          "description": "Display order of the Step. Determined at runtime.",
          "type": "number"
        },
        "questionnaire": {
          "$ref": "#/definitions/QuestionnaireCore"
        },
        "section": {
          "$ref": "#/definitions/SectionCore",
          "description": "Section to which this step belongs"
        },
        "subTitle": {
          "description": "Text to display below the title",
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "type": {
          "$ref": "#/definitions/QUESTION_TYPE"
        }
      },
      "required": [
        "#answers",
        "#id",
        "answers",
        "branch",
        "entryRequirements",
        "exitRequirements",
        "footer",
        "form",
        "id",
        "info",
        "internalNotes",
        "order",
        "questionnaire",
        "section",
        "subTitle",
        "title",
        "type"
      ],
      "type": "object"
    },
    "QuestionableConfigCore": {
      "description": "Configuration class for customizing the Questionable components\n\nThe config has opinionated defaults, but is easily modified using Partial updates",
      "properties": {
        "#id": {
          "type": "string"
        },
        "form": {
          "$ref": "#/definitions/FormCore"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "label": {
          "type": "string"
        },
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
        },
        "title": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "#id",
        "form",
        "id",
        "mode",
        "nav",
        "pages"
      ],
      "type": "object"
    },
    "QuestionnaireCore": {
      "description": "Utility wrapper for survey state",
      "properties": {
        "#id": {
          "type": "string"
        },
        "actions": {
          "items": {
            "$ref": "#/definitions/ActionCore"
          },
          "type": "array"
        },
        "branches": {
          "items": {
            "$ref": "#/definitions/BranchCore"
          },
          "type": "array"
        },
        "config": {
          "$ref": "#/definitions/QuestionableConfigCore"
        },
        "flow": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "form": {
          "$ref": "#/definitions/FormCore"
        },
        "header": {
          "type": "string"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "pages": {
          "$ref": "#/definitions/PagesCore"
        },
        "questions": {
          "items": {
            "$ref": "#/definitions/QuestionCore"
          },
          "type": "array"
        },
        "results": {
          "items": {
            "$ref": "#/definitions/ResultCore"
          },
          "type": "array"
        },
        "sections": {
          "items": {
            "$ref": "#/definitions/SectionCore"
          },
          "type": "array"
        },
        "title": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "#id",
        "actions",
        "branches",
        "config",
        "flow",
        "form",
        "header",
        "id",
        "pages",
        "questions",
        "results",
        "sections"
      ],
      "type": "object"
    },
    "RefCore": {
      "properties": {
        "#id": {
          "type": "string"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "#id",
        "id"
      ],
      "type": "object"
    },
    "RequirementCore": {
      "properties": {
        "#id": {
          "type": "string"
        },
        "ageCalc": {
          "description": "Optional, custom calculator for performing age-specific validation",
          "not": {}
        },
        "explanation": {
          "description": "User facing description of this requirement",
          "type": "string"
        },
        "form": {
          "$ref": "#/definitions/FormCore"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "maxAge": {
          "$ref": "#/definitions/TAgeCore",
          "description": "Optional maximum age allowed for this requirement"
        },
        "minAge": {
          "$ref": "#/definitions/TAgeCore",
          "description": "Optional minimum age allowed for this requirement"
        },
        "questionnaire": {
          "$ref": "#/definitions/QuestionnaireCore"
        },
        "responses": {
          "description": "Map of step id to required answer values",
          "items": {
            "$ref": "#/definitions/ResponseCore"
          },
          "type": "array"
        },
        "title": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "#id",
        "form",
        "id",
        "questionnaire",
        "responses"
      ],
      "type": "object"
    },
    "ResponseCore": {
      "properties": {
        "#id": {
          "type": "string"
        },
        "answers": {
          "items": {
            "$ref": "#/definitions/AnswerCore"
          },
          "type": "array"
        },
        "form": {
          "$ref": "#/definitions/FormCore"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "question": {
          "$ref": "#/definitions/QuestionCore"
        },
        "questionnaire": {
          "$ref": "#/definitions/QuestionnaireCore"
        },
        "title": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "#id",
        "answers",
        "form",
        "id",
        "question",
        "questionnaire"
      ],
      "type": "object"
    },
    "ResultCore": {
      "properties": {
        "#id": {
          "type": "string"
        },
        "action": {
          "$ref": "#/definitions/ActionCore",
          "description": "Defines the primary call to action for this result"
        },
        "category": {
          "description": "Optional tag/category to group results",
          "type": "string"
        },
        "form": {
          "$ref": "#/definitions/FormCore"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "match": {
          "$ref": "#/definitions/RequirementCore",
          "description": "Requirement used for applying this result Could have more than one, we only store the first"
        },
        "order": {
          "description": "Optional order",
          "type": "number"
        },
        "questionnaire": {
          "$ref": "#/definitions/QuestionnaireCore"
        },
        "reason": {
          "description": "Human readable explanation of result determination",
          "type": "string"
        },
        "requirements": {
          "description": "Collection of requirements required to achieve this result",
          "items": {
            "$ref": "#/definitions/RequirementCore"
          },
          "type": "array"
        },
        "secondaryAction": {
          "$ref": "#/definitions/ActionCore",
          "description": "Additional action which may follow after the primary"
        },
        "title": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "#id",
        "action",
        "category",
        "form",
        "id",
        "label",
        "questionnaire",
        "reason",
        "requirements"
      ],
      "type": "object"
    },
    "SectionCore": {
      "properties": {
        "#id": {
          "type": "string"
        },
        "form": {
          "$ref": "#/definitions/FormCore"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "lastStep": {
          "description": "The last step id that is covered by this section",
          "type": "number"
        },
        "order": {
          "description": "Optional order",
          "type": "number"
        },
        "questionnaire": {
          "$ref": "#/definitions/QuestionnaireCore"
        },
        "requirements": {
          "description": "Collection of requirements to enable display of this status",
          "items": {
            "$ref": "#/definitions/RequirementCore"
          },
          "type": "array"
        },
        "status": {
          "$ref": "#/definitions/PROGRESS_BAR_STATUS",
          "description": "Current display status of this section"
        },
        "title": {
          "type": "string"
        },
        "type": {
          "type": "string"
        }
      },
      "required": [
        "#id",
        "form",
        "id",
        "questionnaire",
        "requirements"
      ],
      "type": "object"
    },
    "StepCore": {
      "properties": {
        "#id": {
          "type": "string"
        },
        "entryRequirements": {
          "description": "Collection of requirements to view/enter this step",
          "items": {
            "$ref": "#/definitions/RequirementCore"
          },
          "type": "array"
        },
        "exitRequirements": {
          "description": "Collection of requirements to leave this step",
          "items": {
            "$ref": "#/definitions/RequirementCore"
          },
          "type": "array"
        },
        "footer": {
          "description": "Optional footer text to display at the bottom of the step",
          "type": "string"
        },
        "form": {
          "$ref": "#/definitions/FormCore"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "info": {
          "description": "Contextual content to display below the step contents and above the footer",
          "type": "string"
        },
        "internalNotes": {
          "description": "Private/internal use only notes for documenting this step",
          "type": "string"
        },
        "label": {
          "type": "string"
        },
        "order": {
          "description": "Display order of the Step. Determined at runtime.",
          "type": "number"
        },
        "questionnaire": {
          "$ref": "#/definitions/QuestionnaireCore"
        },
        "section": {
          "$ref": "#/definitions/SectionCore",
          "description": "Section to which this step belongs"
        },
        "subTitle": {
          "description": "Text to display below the title",
          "type": "string"
        },
        "title": {
          "type": "string"
        },
        "type": {
          "$ref": "#/definitions/TStepType"
        }
      },
      "required": [
        "#id",
        "entryRequirements",
        "exitRequirements",
        "footer",
        "form",
        "id",
        "info",
        "internalNotes",
        "order",
        "questionnaire",
        "section",
        "subTitle",
        "title",
        "type"
      ],
      "type": "object"
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
        "responses": {
          "anyOf": [
            {
              "items": {
                "$ref": "#/definitions/ResponseCore"
              },
              "type": "array"
            },
            {
              "items": {
                "$ref": "#/definitions/QuestionCore"
              },
              "type": "array"
            }
          ]
        }
      },
      "required": [
        "answer",
        "responses"
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
          "$ref": "#/definitions/FormCore"
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
        }
      },
      "required": [
        "dir"
      ],
      "title": "Event Data Type",
      "type": "object"
    },
    "TResultDataCore": {
      "description": "Event data structure for results",
      "properties": {
        "results": {
          "items": {
            "$ref": "#/definitions/ResultCore"
          },
          "type": "array"
        },
        "step": {
          "$ref": "#/definitions/StepCore"
        }
      },
      "required": [
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
        },
        {
          "$ref": "#/definitions/BASE"
        }
      ]
    }
  }
};