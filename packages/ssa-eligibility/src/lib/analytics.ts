/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IResult,
  log,
  TOnError,
} from '@usds.gov/questionable';
import { cloneDeep, snakeCase } from 'lodash';
import { isDebug }              from '../flow/lib/debug';
import { DrupalSettings }       from './drupal';

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

export const onActionClick = (obj?: any) => {
  const data   = cloneDeep(obj || { buttons: [] });
  const action = data.buttons;
  if (!action?.length) return;

  const button = action[0];
  if (!button) return;

  const link_text = button.title?.toLowerCase().split(' ').join('_');
  const link_url  = button.link;
  gtag({
    click_type:     'cta',
    event:          'click',
    event_category: 'click',
    event_label:    link_text,
    event_name:     `${link_text}_quest`,
    link_text,
    link_url,
  });
};

export const onInit = (obj?: any) => {
  const data = cloneDeep(obj || {});
  gtag({
    event: 'begin_benefits_quest',
    ...data,
  });
};

export const onResults = (obj?: any) => {
  const data    = cloneDeep(obj || { results: [] });
  const results = data.results as IResult[];
  for (const r of results) {
    r.title = snakeCase(r.title);
    if (!r.category) {
      r.category = r.title;
    }
  }
  gtag({
    event: 'complete_benefits_quest',
    ...data,
  });
};

export const onNoResults = (obj?: any) => {
  const data = cloneDeep(obj || {});
  gtag({
    event: 'defer_benefits_quest',
    ...data,
  });
};

export const onError: TOnError = (e: Error, obj?: any) => {
  const data = cloneDeep(obj || {});
  gtag({
    description: e.message,
    event:       'exception',
    fatal:       false,
    ...data,
  });
};

export const onPage = (obj: any) => {
  const data = cloneDeep(obj || {});
  gtag({
    event:         'step_benefits_quest',
    page_location: `${window.location.href}/#ssa-eligibility-wizard`,
    page_path:     data.props.step?.id || data.step,
    page_title:    data.props.step?.title || data.step,
    ...data,
  });
};
