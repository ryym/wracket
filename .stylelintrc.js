const OFF = null;

module.exports = {
  extends: 'stylelint-config-standard',

  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['include', 'mixin', 'content'],
      },
    ],

    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes'],
      },
    ],

    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['local', 'global'],
      },
    ],

    'no-duplicate-selectors': true,
    'max-nesting-depth': 5,
    'selector-max-compound-selectors': 5,
    'selector-max-id': 0,

    // Disallow hyphens to make it easier to access classes using CSS modules.
    // But exclude MDC classes.
    'selector-class-pattern': '^(mdc-.+|[a-zA-Z0-9_]+)$',

    // Prioritize Prettier formatting.
    'value-list-comma-newline-after': OFF,
    'declaration-colon-newline-after': OFF,

    // Too noisy
    'custom-property-empty-line-before': OFF,

    // https://github.com/stylelint/stylelint/issues/2489
    'no-descending-specificity': OFF,
  },
};
