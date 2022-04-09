/* eslint-disable import/no-extraneous-dependencies */
import { parseSchema } from '@usds.gov/questionable-build';

parseSchema('./dist/survey.json', './src/schema/survey.ts');
