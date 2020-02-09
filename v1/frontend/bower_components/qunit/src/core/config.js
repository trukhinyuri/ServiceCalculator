/**
 * Config object: Maintain internal state
 * Later exposed as QUnit.config
 * `config` initialized at top of scope
 */
var config = {

	// The queue of tests_old to run
	queue: [],

	// Block until document ready
	blocking: true,

	// By default, run previously failed tests_old first
	// very useful in combination with "Hide passed tests_old" checked
	reorder: true,

	// By default, modify document.title when suite is done
	altertitle: true,

	// HTML Reporter: collapse every test except the first failing test
	// If false, all failing tests_old will be expanded
	collapse: true,

	// By default, scroll to top of the page when suite is done
	scrolltop: true,

	// Depth up-to which object will be dumped
	maxDepth: 5,

	// When enabled, all tests_old must call expect()
	requireExpects: false,

	// Placeholder for user-configurable form-exposed URL parameters
	urlConfig: [],

	// Set of all modules.
	modules: [],

	// Stack of nested modules
	moduleStack: [],

	// The first unnamed module
	currentModule: {
		name: "",
		tests: []
	},

	callbacks: {}
};

// Push a loose unnamed module to the modules collection
config.modules.push( config.currentModule );
