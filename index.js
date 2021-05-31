module.exports = {
  rules: {
    "license-header": require("./rules/license-header"),
    "no-private-identifier": require("./rules/no-private-identifier"),
    "strict-equality": require("./rules/strict-equality"),
  },
  configs: {
    base: require("./configs/base"),
    react: require("./configs/react"),
    typescript: require("./configs/typescript"),
  },
};
