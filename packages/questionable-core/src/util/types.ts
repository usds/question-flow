/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * Defines an age relative to a date
 * @title Age Type
 */
interface TAgeCore {
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
 * @hidden Functions must be hidden from schema
 */
type TAgeCalcCore = (birthdate: string) => boolean;
/**
 * @hidden Functions must be hidden from schema
 */
type TReducerCore = (...params: any[]) => void;

/**
 * Key/value pairs which are both strings
 */
type TStringDictionaryCore = {
  [key: string]: string;
};

/**
 * Generic fetch dictionary
 *
 * @hidden Functions must be hidden from schema
 */
type TGetDictionaryCore = (...params: any[]) => TStringDictionaryCore;

interface TDateOfBirthCore {
  day?: string | undefined;
  month?: string | undefined;
  year?: string | undefined;
}

type TProgressBarTypeCore = string;

type TVerticalPositionCore = string;

type THorizontalPositionCore = string;

type TButtonModeCore = string;

/**
 * Content type for blocks of copy
 */
interface TContentCore {
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

/**
 * Flatten object
 * @hidden
 */
type FlatStrings<T> = T extends object ? T[keyof T] : T

/**
 * Grab the properties
 * @hidden
 */
type CoreProperties<X> = X[keyof X];
/**
 * Construct a type using property names
 * @hidden
 */
type ClassProperties<T> = FlatStrings<CoreProperties<T>>;
// type PrivateProperties<T> = T[keyof ClassProperties<T>]

export {
  type ClassProperties,
  // type CoreProperties,
  // type FlatStrings,
  type TAgeCalcCore,
  type TAgeCore,
  type TButtonModeCore,
  type TContentCore,
  type TDateOfBirthCore,
  type TGetDictionaryCore,
  type THorizontalPositionCore,
  type TProgressBarTypeCore,
  type TReducerCore,
  type TStringDictionaryCore,
  type TVerticalPositionCore,
};
