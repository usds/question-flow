import {
  IButton, IQuestion, IResult, ISection,
} from '@usds.gov/questionable-react-component';

type TActionContent = {
  buttons: Partial<IButton>[];
  id: string;
  label: string;
  subTitle: string;
  title: string;
};

export type TActionMap = {
  [key: string]: Partial<TActionContent>;
};

export type TQuestionMap = {
  [key: string]: Partial<IQuestion>;
};

export type TResultMap = {
  [key: string]: Partial<IResult>;
};

export type TSectionMap = {
  [key: string]: Partial<ISection>;
};
