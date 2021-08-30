## Rules

The following rules are provided by `@foxglove/eslint-plugin`.

**Key:** 🔧 = fixable, 💭 = requires type information (TypeScript only)

### [`@foxglove/no-boolean-parameters`](./no-boolean-parameters.js) 💭 🔧

Prohibit boolean parameters to functions, including optional parameters and default values.

In languages without [argument labels](https://docs.swift.org/swift-book/LanguageGuide/Functions.html), boolean parameters often point to an API anti-pattern called the [**boolean trap**](https://ariya.io/2011/08/hall-of-api-shame-boolean-trap). For example, with a function like `repaint(immediate: boolean)`, a reader looking at a call site sees `repaint(true);` and loses key context that `true` means the repaint should be `immediate`.

This rule does currently allow unions of booleans and other types like `value: boolean | number`. This approach was chosen because some common library types like `React.ReactNode` are unions of primitives, and it would be too noisy to prohibit all of these.

Examples of **incorrect** code for this rule:

```ts
function draw(immediate: boolean) {}
const draw = (immediate?: boolean) => {};
const draw = (immediate = false) => {};
```

Examples of **correct** code for this rule:

```ts
function draw({ immediate }: { immediate: boolean }) {}
const draw = ({ immediate }: { immediate?: boolean }) => {};
const draw = ({ immediate = false }: { immediate: boolean }) => {};
```

### [`@foxglove/no-meaningless-void-operator`](./no-meaningless-void-operator.js) 💭 🔧

Disallow the `void` operator when its argument is already of type `void` or `undefined`.

The `void` operator is a useful tool to convey the programmer's intent to discard a value. For example, it is recommended as one way of suppressing [`@typescript-eslint/no-floating-promises`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md) instead of adding `.catch()` to a promise.

This rule helps an author catch API changes where previously a value was being discarded at a call site, but the callee changed so it no longer returns a value. When combined with [no-unused-expressions](https://eslint.org/docs/rules/no-unused-expressions), it also helps _readers_ of the code by ensuring consistency: a statement that looks like `void foo();` is **always** discarding a return value, and a statement that looks like `foo();` is **never** discarding a return value.

Examples of **incorrect** code for this rule:

```ts
void (() => {})();

function foo() {}
void foo();
```

Examples of **correct** code for this rule:

```ts
(() => {})();

function foo() {}
foo(); // nothing to discard

function bar(x: number) {
  void x; // discarding a number
  return 2;
}
void bar(); // discarding a number
```

### Options

This rule accepts a single object option with the following default configuration:

```json
{
  "@typescript-eslint/no-meaningless-void-operator": [
    "error",
    {
      "checkNever": false
    }
  ]
}
```

- `checkNever: true` will suggest removing `void` when the argument has type `never`.

### [`@foxglove/no-return-promise-resolve`](./no-return-promise-resolve.js) 🔧

Disallow returning `Promise.resolve(...)` or `Promise.reject(...)` inside an async function. This is redundant since an async function will always return a Promise — use `return` or `throw` directly instead.

Examples of **incorrect** code for this rule:

```ts
async function foo() {
  return Promise.resolve(0);
}
const bar = async function () {
  return Promise.resolve(9);
};
async () => Promise.resolve(3);
async () => Promise.reject(new Error("boom"));
```

Examples of **correct** code for this rule:

```ts
async function foo() {
  return 0;
}
const bar = async function () {
  return 9;
};
async () => 3;
async () => {
  throw new Error("boom");
};
```
