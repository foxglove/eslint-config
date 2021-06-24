module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  rules: {
    // Avoid #member syntax for performance
    "@foxglove/no-private-identifier": "error",

    // `<T>x` style assertions are not compatible with JSX code,
    // so for consistency we prefer `x as T` everywhere.
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "as",
      },
    ],

    "@typescript-eslint/explicit-module-boundary-types": "error",
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",

    // The ! assertion may be used sparingly in cases where tsc cannot automatically do bounds
    // checking such as indexed array iteration
    "@typescript-eslint/no-non-null-assertion": "off",

    // unused vars must have `_` prefix
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
      },
    ],

    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",

    // both sides of `+` must be either string or number
    "@typescript-eslint/restrict-plus-operands": [
      "error",
      {
        checkCompoundAssignments: true,
      },
    ],

    // require all cases to be checked in switch statements
    "@typescript-eslint/switch-exhaustiveness-check": "error",

    // require strict boolean comparisons for all types, except allow
    // nullable string conditionals to avoid verbose "empty or undefined" checks
    "@typescript-eslint/strict-boolean-expressions": [
      "error",
      {
        allowString: true,
        allowNullableString: true,
        allowNumber: false,
        allowNullableNumber: false,
        allowNullableBoolean: false,
        allowNullableObject: false,
        allowAny: false,
      },
    ],
  },
};
