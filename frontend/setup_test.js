/* eslint-env node */

// Configure ts-node via environment variables.
process.env['TS_NODE_CACHE'] = '0';
process.env['TS_NODE_PROJECT'] = 'tsconfig.test.json';

// MDC packages in '@material/*' use 'import/export'.
require('babel-register')({
  only: /@material/,
});

// Configure enzyme.
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({adapter: new Adapter()});

// XXX: Ignore SCSS loadings during test.
// But this API is deprecated. It seems we should use webpack for test.
// https://nodejs.org/api/modules.html#modules_require_extensions
require.extensions['.scss'] = () => ({});

/*
 * Set up component tests on Node.js environment using JSDOM.
 * Note that we don't need JSDOM when using 'shallow'.
 * The following code is copied from https://github.com/airbnb/enzyme/blob/68f1959767fb06b429aec535b12b197803d3af69/docs/guides/jsdom.md.
 */
const {JSDOM} = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const {window} = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop),
      }),
      {},
    );
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);
