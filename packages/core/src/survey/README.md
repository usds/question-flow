# Survey

Interfaces that define the schema. 

Requirements for inclusion in this (the `/survey`) folder:

- [ ] File includes only interfaces
- [ ] All interfaces are exported (public)
- [ ] Interfaces do not use types that are incompatible with JSON Schema Draft 7 (e.g. `function`, etc)
  - [ ] If an interface requires an incompatible property, use the `@hidden` annotation to exclude it from the schema
