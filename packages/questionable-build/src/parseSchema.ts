import fs from 'fs';

export const parseSchema = (input = './dist/survey.json', output = './src/schema/survey.ts') => {
  const rawdata = fs.readFileSync(input);

  const schema = `// This files is code generated. Do not edit.
/* eslint-disable */
export const survey = ${rawdata};`;

  fs.writeFileSync(output, schema);
};
