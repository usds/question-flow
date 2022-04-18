import { BASE_TYPE, TEnmBaseType } from './TBaseType';

/**
 * Defines the known component types for pages
 */

export type TPageType = 'Landing' | 'No Results' | 'Results' | 'Summary';
type TEnmPageType = TEnmBaseType & {
  LANDING: TPageType & 'Landing';
  NO_RESULTS: TPageType & 'No Results';
  RESULTS: TPageType & 'Results';
  SUMMARY: TPageType & 'Summary';
};
export const PAGE_TYPE: TEnmPageType = {
  ...BASE_TYPE,
  LANDING:    'Landing',
  NO_RESULTS: 'No Results',
  RESULTS:    'Results',
  SUMMARY:    'Summary',
};
