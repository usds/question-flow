/* eslint-disable max-len */
import { merge }     from 'lodash';
import { PAGE_TYPE } from '../../../../lib';
import { IPages }    from '../../../../survey';

const pageLogic: IPages = {
  noResultsPage: {
    id:      PAGE_TYPE.NO_RESULTS,
    section: { id: PAGE_TYPE.RESULTS },
    type:    PAGE_TYPE.NO_RESULTS,
  },
  resultsPage: {
    id:      PAGE_TYPE.RESULTS,
    section: { id: PAGE_TYPE.RESULTS },
    type:    PAGE_TYPE.RESULTS,
  },
  summaryPage: {
    buttons: {
      prev: {
        id:      's_prev',
        visible: false,
      },
    },
    id:      PAGE_TYPE.SUMMARY,
    section: { id: 'results' },
    type:    PAGE_TYPE.SUMMARY,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const buildPages = (json: any): IPages => merge(pageLogic, json);
