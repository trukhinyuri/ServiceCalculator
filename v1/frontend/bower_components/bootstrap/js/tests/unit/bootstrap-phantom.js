// Logging setup for phantom integration
// adapted from Modernizr

QUnit.begin = function () {
  console.log("Starting test suite")
  console.log("================================================\n")
}

QUnit.moduleDone = function (opts) {
  if (opts.failed === 0) {
    console.log("\u2714 All tests_old passed in '" + opts.name + "' module")
  } else {
    console.log("\u2716 " + opts.failed + " tests_old failed in '" + opts.name + "' module")
  }
}

QUnit.done = function (opts) {
  console.log("\n================================================")
  console.log("Tests completed in " + opts.runtime + " milliseconds")
  console.log(opts.passed + " tests_old of " + opts.total + " passed, " + opts.failed + " failed.")
}