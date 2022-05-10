import { parseSchema } from '@usds.gov/questionable-build';

try {
  parseSchema('./dist/survey.json', './src/schema/survey.ts');
} catch (e) {
  console.error(e);
}