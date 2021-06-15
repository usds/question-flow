import { SurveyBuilder }             from '../../../composable/SurveyBuilder';
import { buildPages, buildSections } from './data';

const builder = new SurveyBuilder('Complex Eligibility Survey');

const sections = buildSections(builder);

const pages = buildPages(builder, sections);

export const builderFlow = builder.toQuestionnaire();
