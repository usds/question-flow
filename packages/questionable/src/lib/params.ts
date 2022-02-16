/**
 * Safely extracts parameter values from the URL
 * @returns query string parameters as object
 */
export const getQueryParams = (): {
  [key: string]: string
} => {
  const params: {
  [key: string]: string
} = {};
  try {
    const urlSearchParams = new URLSearchParams(window.location.search);
    // NOTE: `entries` does not yet exist on object in TS
    // params                = Object.fromEntries(urlSearchParams.entries());
    urlSearchParams.forEach((value, key) => {
      params[key] = value;
    });
  } catch (e) {
    // do nothing
  }
  return params;
};
