import fs from 'fs';

const { log, error } = console;

export const parseSchema = (input = './dist/survey.json', output = './src/schema/survey.ts') => {
  try {
    log({ input, output });
    const rawdata = fs.readFileSync(input, 'utf-8');

    const schema = `// This files is code generated. Do not edit.
/* eslint-disable */
export const survey = ${rawdata};`;

    fs.writeFileSync(output, schema);
  } catch (e) {
    error(e);
    log('Failed to make survey');
  }
};
