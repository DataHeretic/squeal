const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const TSConsoleReporter = require('jasmine-ts-console-reporter');

jasmine.getEnv().clearReporters(); // Clear default console reporter
jasmine.getEnv().addReporter(new TSConsoleReporter());
jasmine.getEnv().addReporter(new SpecReporter({
                                   displayFailuresSummary: true,
                                   displayFailuredSpec: true,
                                   displaySuiteNumber: true,
                                   displaySpecDuration: true
                            }));