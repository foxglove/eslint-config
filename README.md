# @foxglove/eslint-plugin

[![npm package](https://img.shields.io/npm/v/@foxglove/eslint-plugin)](https://www.npmjs.com/package/@foxglove/eslint-plugin)

Foxglove default eslint configuration & rules.

Please err on the side of conservative changes to this repo - multiple Foxglove projects should adopt a change before making it a default.

## Installation

The following configurations are available:

- `plugin:@foxglove/base`
- `plugin:@foxglove/react`
- `plugin:@foxglove/typescript`

**Typescript + React Example**

```sh
yarn add -D \
    @foxglove/eslint-plugin \
    @typescript-eslint/eslint-plugin \
    @typescript-eslint/parser \
    eslint \
    eslint-config-prettier \
    eslint-plugin-import \
    eslint-plugin-prettier \
    eslint-plugin-react \
    eslint-plugin-react-hooks \
    prettier
```

In your `.eslintrc.js`:

```js
module.exports = {
  extends: ["plugin:@foxglove/base", "plugin:@foxglove/react"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["plugin:@foxglove/typescript"],
      parserOptions: {
        project: "tsconfig.json",
      },
    },
  ],
};
```

You can add `"plugin:@foxglove/typescript"` to the top level `extends` instead of using `overrides` if your project contains no `.js` files.

## Releasing

**Note**: You must use npm 7+ (not yarn) to test this repo locally, due to the self link in `package.json`.

```sh
npm version [major|minor|patch]
git push && git push --tags
```

GitHub Actions will automatically publish the tag to NPM.
