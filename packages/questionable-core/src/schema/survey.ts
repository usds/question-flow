// This files is code generated. Do not edit.
/* eslint-disable */
export const survey = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
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
        "title"
      ],
      "type": "object"
    },
    "IAnswerCore": {
      "properties": {
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "key": {
          "type": "string"
        },
        "synonyms": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "title": {
          "title": "Title",
          "type": "string"
        },
        "type": {
          "$ref": "#/definitions/TAnswerType"
        }
      },
      "required": [
        "title"
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
            "$ref": "#/definitions/IQuestionCore"
          },
          "type": "array"
        },
        "sections": {
          "items": {
            "$ref": "#/definitions/ISectionCore"
          },
          "type": "array"
        },
        "title": {
          "title": "Title",
          "type": "string"
        },
        "type": {
          "$ref": "#/definitions/TBranchType"
        }
      },
      "required": [
        "title"
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
          "$ref": "#/definitions/TButtonType",
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
        "title"
      ],
      "type": "object"
    },
    "IEventCore": {
      "description": "Event Model",
      "title": "Event",
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
        "started"
      ],
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
        "display": {
          "type": "boolean"
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
          "$ref": "#/definitions/ISectionCore",
          "description": "Section to which this step belongs",
          "title": "Section"
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
          "$ref": "#/definitions/TPageType",
          "description": "Type of page",
          "title": "Page Type"
        }
      },
      "required": [
        "display",
        "title",
        "type"
      ],
      "type": "object"
    },
    "IPagesCore": {
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
        "pages": {
          "items": {
            "$ref": "#/definitions/IPageCore"
          },
          "type": "array"
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
    "IQuestionCore": {
      "properties": {
        "answers": {
          "description": "Collection of allowed answers",
          "items": {
            "$ref": "#/definitions/IAnswerCore"
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
          "$ref": "#/definitions/ISectionCore",
          "description": "Section to which this step belongs",
          "title": "Section"
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
          "$ref": "#/definitions/TQuestionType",
          "description": "Type of question",
          "title": "Question Type"
        }
      },
      "required": [
        "answers",
        "title",
        "type"
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
            "visible": {
              "type": "boolean"
            }
          },
          "title": "Navigation",
          "type": "object"
        },
        "pages": {
          "description": "Page configuration",
          "properties": {
            "visible": {
              "type": "boolean"
            }
          },
          "title": "Pages",
          "type": "object"
        },
        "params": {
          "additionalProperties": {
            "type": "string"
          },
          "default": {},
          "description": "Properties produced from `getRuntimeConfig()`",
          "title": "Params",
          "type": "object"
        },
        "progressBar": {
          "description": "Progress Bar configuration",
          "properties": {
            "visible": {
              "type": "boolean"
            }
          },
          "title": "Progress Bar",
          "type": "object"
        },
        "questions": {
          "description": "Question configuration",
          "properties": {
            "visible": {
              "type": "boolean"
            }
          },
          "title": "Question Configuration",
          "type": "object"
        },
        "steps": {
          "description": "Step configuration",
          "properties": {
            "visible": {
              "type": "boolean"
            }
          },
          "title": "Step Configuration",
          "type": "object"
        }
      },
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
        "pages",
        "questions"
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
        "title"
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
        "id": {
          "description": "Unique identifier",
          "title": "Id",
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
        },
        "title": {
          "title": "Title",
          "type": "string"
        },
        "type": {
          "$ref": "#/definitions/TRequirementType"
        }
      },
      "required": [
        "explanation",
        "responses",
        "title"
      ],
      "type": "object"
    },
    "IResponseCore": {
      "description": "Acceptable responses",
      "properties": {
        "answers": {
          "items": {
            "$ref": "#/definitions/IAnswerCore"
          },
          "type": "array"
        },
        "id": {
          "description": "Unique identifier",
          "title": "Id",
          "type": "string"
        },
        "question": {
          "$ref": "#/definitions/IQuestionCore"
        },
        "title": {
          "title": "Title",
          "type": "string"
        },
        "type": {
          "$ref": "#/definitions/TResponseType"
        }
      },
      "required": [
        "answers",
        "title"
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
        },
        "type": {
          "$ref": "#/definitions/TResultType"
        }
      },
      "required": [
        "title"
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
        },
        "type": {
          "$ref": "#/definitions/TSectionType"
        }
      },
      "required": [
        "title"
      ],
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
          "$ref": "#/definitions/ISectionCore",
          "description": "Section to which this step belongs",
          "title": "Section"
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
        "title",
        "type"
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
    "TActionType": {
      "enum": [
        "call",
        "hybrid",
        "none",
        "online",
        "shell"
      ],
      "type": "string"
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
                "$ref": "#/definitions/IResponseCore"
              },
              "type": "array"
            },
            {
              "items": {
                "$ref": "#/definitions/IQuestionCore"
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
    "TAnswerType": {
      "enum": [
        "fixed",
        "variable"
      ],
      "type": "string"
    },
    "TBaseType": {
      "const": "default",
      "type": "string"
    },
    "TBranchType": {
      "enum": [
        "linear",
        "non-linear"
      ],
      "type": "string"
    },
    "TButtonType": {
      "enum": [
        "button",
        "link"
      ],
      "type": "string"
    },
    "TDesignType": {
      "const": "Edit",
      "description": "Defines the known component types for design",
      "type": "string"
    },
    "TEnmBaseType": {
      "properties": {
        "DEFAULT": {
          "$ref": "#/definitions/TBaseType"
        }
      },
      "required": [
        "DEFAULT"
      ],
      "type": "object"
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
    "TOpType": {
      "enum": [
        "RERENDER",
        "RESET",
        "undo",
        "UPDATE"
      ],
      "type": "string"
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
    "TPageType": {
      "description": "Defines the known component types for pages",
      "enum": [
        "Landing",
        "No Results",
        "Results",
        "Summary"
      ],
      "type": "string"
    },
    "TPages": {
      "additionalProperties": {
        "$ref": "#/definitions/IPageCore"
      },
      "type": "object"
    },
    "TProgressBarStatusType": {
      "enum": [
        "complete",
        "current",
        "incomplete"
      ],
      "type": "string"
    },
    "TQuestionType": {
      "description": "Defines the known component types for questions",
      "enum": [
        "date_time",
        "dob",
        "multiple_choice",
        "multiple_select",
        "path",
        "text"
      ],
      "type": "string"
    },
    "TRefType": {
      "anyOf": [
        {
          "$ref": "#/definitions/TStepType"
        },
        {
          "$ref": "#/definitions/TActionType"
        },
        {
          "$ref": "#/definitions/TAnswerType"
        },
        {
          "$ref": "#/definitions/TBranchType"
        },
        {
          "$ref": "#/definitions/TButtonType"
        },
        {
          "$ref": "#/definitions/TRequirementType"
        },
        {
          "$ref": "#/definitions/TResponseType"
        },
        {
          "$ref": "#/definitions/TResultType"
        },
        {
          "$ref": "#/definitions/TSectionType"
        }
      ]
    },
    "TRequirementType": {
      "enum": [
        "required",
        "non-required"
      ],
      "type": "string"
    },
    "TResponseType": {
      "enum": [
        "complete",
        "incomplete"
      ],
      "type": "string"
    },
    "TResultDataCore": {
      "description": "Event data structure for results",
      "properties": {
        "results": {
          "items": {
            "$ref": "#/definitions/IResultCore"
          },
          "type": "array"
        },
        "step": {
          "$ref": "#/definitions/IStepCore"
        }
      },
      "required": [
        "results",
        "step"
      ],
      "title": "Event Result Type",
      "type": "object"
    },
    "TResultType": {
      "enum": [
        "match",
        "non-match"
      ],
      "type": "string"
    },
    "TSectionType": {
      "enum": [
        "locked",
        "unlocked"
      ],
      "type": "string"
    },
    "TStepType": {
      "anyOf": [
        {
          "$ref": "#/definitions/TPageType"
        },
        {
          "$ref": "#/definitions/TQuestionType"
        },
        {
          "$ref": "#/definitions/TDesignType"
        },
        {
          "$ref": "#/definitions/TBaseType"
        }
      ]
    }
  }
};