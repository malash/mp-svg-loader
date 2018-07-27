import test from 'ava';
import path from 'path';
import webpack from 'webpack';
import fsExtra from 'fs-extra';
import '../src';

const FIXTURES_PREFIX = path.resolve(__dirname, '../fixtures');

const runWebpack = fixturePath => new Promise((resolve, reject) => {
  const configPath = path.resolve(fixturePath, './webpack.config.js');
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const config = require(configPath);
  const compiler = webpack(config);
  compiler.run((err, stats) => {
    if (err) {
      return reject(err);
    }
    if (stats.hasErrors()) {
      return reject(new Error(stats.compilation.errors.join('\n')));
    }
    resolve();
  });
});

const run = async (t, fixtureName) => {
  const fixturePath = path.resolve(FIXTURES_PREFIX, fixtureName);
  const tmpDir = path.resolve(fixturePath, './.tmp');
  await fsExtra.remove(tmpDir);
  try {
    await runWebpack(fixturePath);
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const bundle = require(tmpDir);
    await bundle.main(t);
  } catch (e) {
    throw e;
  } finally {
    await fsExtra.remove(tmpDir);
  }
};

run.title = (providedTitle, fixtureName) => `${providedTitle} fixture ${fixtureName}`.trim();


test(run, 'file-loader');
