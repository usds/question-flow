/* eslint-disable sonarjs/no-duplicate-string  */
import { merge }       from 'lodash';
import { ISection }    from '../../../../survey';
import { TSectionMap } from '../lib/contentMap';

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const buildSections = (json: TSectionMap): ISection[] => [
  merge(
    {
      id:           'introduction',
      requirements: [
        {
          explanation: 'Answered the first question',
          responses:   [
            {
              answers:  [{ id: '0' }, { id: '1' }],
              question: { id: 'A' },
            },
          ],
        },
      ],
      title: 'Introduction',
    },
    json.introduction,
  ),
  merge(
    {
      id:           'a0_work',
      requirements: [
        {
          explanation: '18 or older',
          responses:   [
            {
              answers:  [{ id: '0' }],
              question: { id: 'A' },
            },
          ],
        },
      ],
      title: 'Work',
    },
    json.a0_work,
  ),
  merge(
    {
      id:           'a0_family',
      requirements: [
        {
          explanation: '18 or older',
          responses:   [
            {
              answers:  [{ id: '0' }],
              question: { id: 'A' },
            },
          ],
        },
      ],
      title: 'Family',
    },
    json.a0_family,
  ),
  merge(
    {
      id:           'a0_finances',
      requirements: [
        {
          explanation: '18 or older',
          responses:   [
            {
              answers:  [{ id: '0' }],
              question: { id: 'A' },
            },
          ],
        },
      ],
      title: 'Finances',
    },
    json.a0_finances,
  ),
  merge(
    {
      id:           'a1_disability',
      requirements: [
        {
          explanation: 'Is younger than 18',
          responses:   [
            {
              answers:  [{ id: '1' }],
              question: { id: 'A' },
            },
          ],
        },
      ],
      title: 'Disability',
    },
    json.a1_disability,
  ),
  merge(
    {
      id:           'a1_family',
      requirements: [
        {
          explanation: 'Is younger than 18',
          responses:   [
            {
              answers:  [{ id: '1' }],
              question: { id: 'A' },
            },
          ],
        },
      ],
      title: 'Family',
    },
    json.a1_family,
  ),
  merge(
    {
      id:           'results',
      requirements: [
        {
          explanation: 'Has answered the age question',
          responses:   [
            {
              answers:  [{ id: '0' }, { id: '1' }],
              question: { id: 'A' },
            },
          ],
        },
      ],
      title: 'Results',
    },
    json.results,
  ),
];
