/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-relative-packages
import { getRollupConfig } from '../../rollup.config';
import pkg                 from './package.json';

const rollup = getRollupConfig(pkg);

export default rollup;
