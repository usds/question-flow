// eslint-disable-next-line import/no-relative-packages
import { getRollupConfig } from '@usds.gov/questionable-build';
import pkg                 from './package.json';

const rollup = getRollupConfig(pkg);

export default rollup;
