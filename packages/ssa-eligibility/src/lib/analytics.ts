/* eslint-disable @typescript-eslint/no-explicit-any */
import { log, TEvent, TOnError } from '@usds.gov/questionable';
import { isDebug }               from '../flow/lib/debug';
import { DrupalSettings }        from './drupal';

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
    drupalSettings: DrupalSettings;
 } 
}

export const gtag = (...args: any[]) => {
  const debug = isDebug();
  if (debug) {
    log('gtag', ...args);
  }
  try {
    const { dataLayer } = window;
    if (!dataLayer) {
      if (debug) {
        log('gtag', 'dataLayer is not defined');
      }
      return;
    }
    dataLayer.push(...args);
  } catch (e) {
    // eslint-disable-next-line no-console
    log('gtag', e, 'Google Tag Manager error');
  }
};

export const onInit = (data?: TEvent) => {
  gtag({
    event: 'begin_benefits_quest',
    ...data,
  });
};

export const onResults = (data?: TEvent) => {
  gtag({
    event: 'complete_benefits_quest',
    ...data,
  });
};

export const onNoResults = (data?: TEvent) => {
  gtag({
    event: 'defer_benefits_quest',
    ...data,
  });
};

export const onError: TOnError = (e: Error, data?: TEvent) => {
  gtag({
    description: e.message,
    event:       'exception',
    fatal:       false,
    ...data,
  });
};

export const onPage = (data: any) => {
  gtag({
    event:         'step_benefits_quest',
    page_location: `${window.location.href}/#ssa-eligibility-wizard`,
    page_path:     data.props.step?.id || data.step,
    page_title:    data.props.step?.title || data.step,
    ...data,
  });
};
