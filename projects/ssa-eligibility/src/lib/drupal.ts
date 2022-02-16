/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DrupalSettings {
  ajax?: any[];
  ajaxPageState?: AjaxPageState;
  ajaxTrustedUrl?: AjaxTrustedURL;
  component?: Component;
  data?: Data;
  path?: Path;
  pluralDelimiter?: string;
  ssa_benefit?: SSABenefit;
  ssa_search?: SSASearch;
  ssa_secure?: SSASecure;
  suppressDeprecationErrors?: boolean;
  user?: User;
}

export interface AjaxPageState {
  libraries?: string;
  theme?: string;
  theme_token?: null;
}

export interface AjaxTrustedURL {
  [key: string]: boolean;
}

export interface Component {
  [key: number]: SubComponent;
  eligibility?: Eligibility;
  plugins?: any[];
}

export interface Eligibility {
  survey?: 1 | 0;
}

export interface SubComponent {
  form_configuration?: null;
  id?: string;
  page_title?: string;
  plugin_id?: string;
  uuid?: string;
}

export interface Data {
  extlink?: Extlink;
}

export interface Extlink {
  extAlert?: boolean;
  extAlertText?: string;
  extClass?: string;
  extCssExclude?: string;
  extCssExplicit?: string;
  extExclude?: string;
  extFaLinkClasses?: string;
  extFaMailtoClasses?: string;
  extFollowNoOverride?: boolean;
  extIconPlacement?: string;
  extImgClass?: boolean;
  extInclude?: string;
  extLabel?: string;
  extNofollow?: boolean;
  extNoreferrer?: boolean;
  extSubdomains?: boolean;
  extTarget?: boolean;
  extTargetNoOverride?: boolean;
  extUseFontAwesome?: boolean;
  mailtoClass?: string;
  mailtoLabel?: string;
  whitelistedDomains?: any[];
}

export interface Path {
  baseUrl?: string;
  currentLanguage?: string;
  currentPath?: string;
  currentPathIsAdmin?: boolean;
  isFront?: boolean;
  pathPrefix?: string;
  scriptPath?: null;
}

export interface SSABenefit {
  default_fields?: DefaultFields;
}

export interface DefaultFields {
  application_process_heading?: string;
  appointment_heading_combo?: string;
  appointment_heading_secondary?: string;
  benefit_recipient_question?: string;
  benefit_supplement_question?: string;
  benefit_supplement_supporting_text?: string;
  edit_answers?: string;
  edit_answers_eligibility_link?: string;
  edit_answers_eligibility_sentence?: string;
  eligibility_label?: string;
  eligibility_link?: string;
  online_heading_combo?: string;
  online_multiple_combo_description?: string;
  online_single_combo_description?: string;
  post_app_desc_child_combo_multiple?: string;
  post_app_desc_disability_multiple?: string;
  post_app_desc_online_multiple?: string;
  post_app_heading?: string;
  post_app_inline_action?: string;
  recommended_info_heading?: string;
  secondary_service_channel_heading?: string;
  selection_box_heading?: string;
  selection_eligibility_action_link?: string;
  selection_medicare_action_link?: string;
  selection_primary_cta_title?: string;
  when_to_apply_description?: string;
}

export interface SSASearch {
  site_handle?: string;
}

export interface SSASecure {
  cookie?: Cookie;
}

export interface Cookie {
  name?: string;
}

export interface User {
  permissionsHash?: string;
  uid?: number;
}
