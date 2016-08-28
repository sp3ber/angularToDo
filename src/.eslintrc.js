module.exports = {
  extends: [
    'angular'
  ],
  rules: {
    'linebreak-style': 'off',
    "arrow-parens": [1, "always"],
    "babel/arrow-parens": 0
  },
  globals: {
    firebase: true,
    process: true
  }
};
