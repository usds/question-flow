/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const rawdata = fs.readFileSync('./dist/survey.json');

const schema = `// This files is code generated. Do not edit.
/* eslint-disable */
export const survey = ${rawdata};`;

fs.writeFileSync('./src/schema/survey.ts', schema);
