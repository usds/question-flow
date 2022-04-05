# Metadata

Reflection in Typscript is tenuous at times. This is an effort to type the names of a type's properties in order that they can be referenced dynamically at runtime while still providing compile time consistency.

For example, we may know in composition that `class Foo` has property `bar`, and we can reference it by index (e.g. `let x = fooInstance['bar']`) but it becomes non-trivial to allow an arbitrary external consumer to say `let y = fooInstance[someStringKey]` without either strongly typed metadata or reflection.

This provides the former, but reflection would be preferable if and when it becomes available in TypeScript without using heavily customized implementations of the transpiler.

