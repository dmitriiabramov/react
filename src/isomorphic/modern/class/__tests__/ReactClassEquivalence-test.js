/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @emails react-core
 */

'use strict';

var spawnSync = require('child_process').spawnSync;
var path = require('path');

describe('ReactClassEquivalence', function() {
  it('tests the same thing for es6 classes and CoffeeScript', function() {
    var result1 = runJest('ReactCoffeeScriptClass-test.coffee');
    var result2 = runJest('ReactES6Class-test.js');
    compareResults(result1, result2);
  });

  it('tests the same thing for es6 classes and TypeScript', function() {
    var result1 = runJest('ReactTypeScriptClass-test.ts');
    var result2 = runJest('ReactES6Class-test.js');
    compareResults(result1, result2);
  });

});

function runJest(testFile) {
  var cwd = process.cwd();
  var jestBin = path.resolve(cwd, './node_modules/.bin/jest');
  var result = spawnSync(jestBin, [testFile, '--verbose'], {cwd});
  expect(result.status).toBe(0);
  return result.stdout.toString();
}

function compareResults(a, b) {
  var aSpecs = (a.match(/it\s.*$/gm) || []).sort().join('\n');
  var bSpecs = (b.match(/it\s.*$/gm) || []).sort().join('\n');
  expect(aSpecs).toEqual(bSpecs);
}
