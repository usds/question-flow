/* eslint-disable camelcase */
export interface CMS {
    data: Datum[];
    jsonapi: Jsonapi;
    links: Links;
}

export interface Datum {
    attributes: Attributes;
    id: string;
    links: Links;
    type: Type;
}

export interface Attributes {
    answers: Answer[];
    drupal_internal__qid: number;
    drupal_internal__vid: number;
    id: string;
    info: null | string;
    moderation_state: ModerationState;
    question_id: string;
    status: boolean;
    subTitle: null | string;
    title: string;
}

export interface Answer {
    id: number;
    title: string;
}

export enum ModerationState {
    Published = 'published',
}

export interface Links {
    self: Self;
}

export interface Self {
    href: string;
}

export enum Type {
    QuestionEligibility = 'question--eligibility',
}

export interface Jsonapi {
    meta: Meta;
    version: string;
}

export interface Meta {
    links: Links;
}

export interface IFetchAPI {
    url: string;
}

export interface IJsonData {
  questions: IQuestionData;
}

export interface IQuestionData {
    [key: string]: Attributes;
}
