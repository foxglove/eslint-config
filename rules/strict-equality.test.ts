import { ESLintUtils, TSESLint } from "@typescript-eslint/utils";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const rule = require("./strict-equality") as TSESLint.RuleModule<
  "unexpected" | "unexpectedStrict",
  []
>;

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    project: "./tsconfig.test.json",
  },
});

ruleTester.run("strict-equality", rule, {
  valid: [
    "x == null",
    "x != null",
    "x == undefined",
    "x != undefined",
    "x === 5",
    "x !== 5",
  ],

  invalid: [
    {
      code: "x === null",
      errors: [
        {
          messageId: "unexpectedStrict",
          data: { expectedOp: "==", literal: "null" },
        },
      ],
    },
    {
      code: "x !== null",
      errors: [
        {
          messageId: "unexpectedStrict",
          data: { expectedOp: "!=", literal: "null" },
        },
      ],
    },
    {
      code: "x === undefined",
      errors: [
        {
          messageId: "unexpectedStrict",
          data: { expectedOp: "==", literal: "undefined" },
        },
      ],
    },
    {
      code: "x !== undefined",
      errors: [
        {
          messageId: "unexpectedStrict",
          data: { expectedOp: "!=", literal: "undefined" },
        },
      ],
    },
    {
      code: "x == 5",
      errors: [
        {
          messageId: "unexpected",
          data: { expectedOperator: "===", actualOperator: "==" },
        },
      ],
    },
    {
      code: "x != 5",
      errors: [
        {
          messageId: "unexpected",
          data: { expectedOperator: "!==", actualOperator: "!=" },
        },
      ],
    },
  ],
});
