/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * Defines an age relative to a date
 * @title Age Type
 */
export interface TAgeCore {
  /**
   * @minimum 0
   * @maximum 31
   * @nullable
   * @title Days
   */
  days?: number;
  /**
   * @minimum 0
   * @maximum 31
   * @nullable
   * @title Months
   */
  months: number;
  /**
   * @minimum 0
   * @maximum 100
   * @nullable
   * @title Years
   */
  years: number;
}

/**
 * Lambda that can be called to compute an age requirement
 * @hidden
 */
export type TAgeCalcCore = (birthdate: string) => boolean;

export type TReducerCore = (...params: any[]) => void;

/**
 * Key/value pairs which are both strings
 */
export type TStringDictionaryCore = {
  [key: string]: string;
};

/**
 * Generic fetch dictionary
 */
export type TGetDictionaryCore = (...params: any[]) => TStringDictionaryCore;

export interface TDateOfBirthCore {
  day?: string | undefined;
  month?: string | undefined;
  year?: string | undefined;
}

export type TProgressBarTypeCore = string;

export type TVerticalPositionCore = string;

export type THorizontalPositionCore = string;

export type TButtonModeCore = string;

/**
 * Content type for blocks of copy
 */
export interface TContentCore {
  /**
   * Main body content
   * @title Content
   */
  content?: string;
  /**
   * Text to display below the title
   * @title Subtitle
   */
  subTitle?: string;
  /**
   * Title or Header text
   * @title Title
   */
  title?: string;
}
