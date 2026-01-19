const js = require('@eslint/js');

module.exports = [
  {
    files: ['**/*.js'],
    ...js.configs.recommended,
  },
];