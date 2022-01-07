/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: './coverage',
    verbose: true,
    testPathIgnorePatterns: [
        '/node_modules/'
    ],
    roots: ['./tests'],
    coverageThreshold: {
        // global: {
        //     branches: 100,
        //     functions: 100,
        //     lines: 100,
        //     statements: 100
        // }
    },
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        },
    }
}