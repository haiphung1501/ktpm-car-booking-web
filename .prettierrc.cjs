const tailwindPlugin = require('prettier-plugin-tailwindcss');
const sortImportsPlugin = require('@ianvs/prettier-plugin-sort-imports');

const plugins = {
  parsers: {
    typescript: {
      ...tailwindPlugin.parsers.typescript,
      preprocess: sortImportsPlugin.parsers.typescript.preprocess,
    },
  },
  options: {
    ...sortImportsPlugin.options,
  },
};

module.exports = {
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: false,
  printWidth: 100,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true,
  singleAttributePerLine: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
  plugins: [plugins],
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^types$',
    '^@/*/(.*)$',
    '^[./]',
  ],
  importOrderBuiltinModulesToTop: true,
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  pluginSearchDirs: false,
  tailwindConfig: './tailwind.config.js',
};
