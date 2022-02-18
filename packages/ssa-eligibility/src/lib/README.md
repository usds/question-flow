# Application Library Methods

These utilities define interaction with Google Analytics and Drupal, as well as a fetch implementation and a set of interfaces for data binding.

## Analytics

Questionable emits events whenever the page loads, the customer navigates (next/prev), the customer answers a question or the survey concludes with or without results. For current analytics, only the hooks for survey completion and step navigation are registered.

This implementation assumes that `dataLayer` will be available in the global scope (Drupal provides this for us) and safely executes that GA api. 

## Drupal

Drupal injects settings as a global object. These interfaces define some (not all) of the possible properties available on that object.
