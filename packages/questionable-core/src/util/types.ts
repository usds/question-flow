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

type TVerticalPositionCore = 'top' | 'bottom';
const VERTICAL_POSITION: {
  BOTTOM: TVerticalPositionCore & 'bottom',
  TOP: TVerticalPositionCore & 'top'
} = {
  BOTTOM: 'bottom',
  TOP:    'top',
};
type THorizontalPositionCore = 'left' | 'right';
const HORIZONTAL_POSITION: {
  LEFT: THorizontalPositionCore & 'left',
  RIGHT: THorizontalPositionCore & 'right'
} = {
  LEFT:  'left',
  RIGHT: 'right',
};
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

type TPointerDirection = 'in' | 'out';

export {
  HORIZONTAL_POSITION,
  VERTICAL_POSITION,
  type ClassProperties,
  type TPointerDirection,
  type TAgeCalcCore,
  type TAgeCore,
  type TContentCore,
  type TDateOfBirthCore,
  type TGetDictionaryCore,
  type THorizontalPositionCore,
  type TReducerCore,
  type TStringDictionaryCore,
  type TVerticalPositionCore,
};
