import { ESLintUtils, TSESLint } from "@typescript-eslint/utils";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rule = require("./no-return-promise-resolve") as TSESLint.RuleModule<
  "returnResolve" | "returnReject",
  []
>;

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    project: "./tsconfig.test.json",
  },
});

ruleTester.run("no-return-promise-resolve", rule, {
  valid: [
    `
// wrap in an async function to ensure no false positive in nested non-async functions
async function noReturnPromiseResolve() {
  await Promise.resolve();
  function foo() {
    return Promise.resolve();
    return Promise.resolve<number>(42);
    return Promise.reject(42);
    return Promise.reject<number>(42);
  }
  (function () { return Promise.resolve(); })();
  () => Promise.resolve(42);
  async () => {
    Promise.resolve(42);
  };
  () => Promise.reject(42);
  async () => {
    Promise.reject(42);
  };
}
`,
  ],
  invalid: [
    {
      code: `
async function fooAsync() {
  return Promise.resolve();
  return Promise.resolve<number>(42);
  return Promise.reject(42);
  return Promise.reject<number>(42);
}
      `.trimRight(),
      errors: [
        { messageId: "returnResolve", line: 3, column: 10 },
        { messageId: "returnResolve", line: 4, column: 10 },
        { messageId: "returnReject", line: 5, column: 3 },
        { messageId: "returnReject", line: 6, column: 3 },
      ],
      output: `
async function fooAsync() {
  return undefined;
  return 42;
  throw 42;
  throw 42;
}
      `.trimRight(),
    },
    {
      code: "(async function () { return Promise.resolve(); })()",
      errors: [{ messageId: "returnResolve", line: 1, column: 29 }],
      output: "(async function () { return undefined; })()",
    },
    {
      code: "(async function () { return Promise.resolve({ x: 42 }); })()",
      errors: [{ messageId: "returnResolve", line: 1, column: 29 }],
      output: "(async function () { return { x: 42 }; })()",
    },
    {
      code: "async () => Promise.resolve(42);",
      errors: [{ messageId: "returnResolve", line: 1, column: 13 }],
      output: "async () => 42;",
    },
    {
      code: "async () => Promise.resolve({ x: 42 });",
      errors: [{ messageId: "returnResolve", line: 1, column: 13 }],
      output: "async () => ({ x: 42 });",
    },
    {
      code: "async () => Promise.reject(42);",
      errors: [{ messageId: "returnReject", line: 1, column: 13 }],
      output: "async () => { throw 42; };",
    },
  ],
});
