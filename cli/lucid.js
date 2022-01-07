#!/usr/bin/env node
'use strict';

const shell = require('shelljs');

// Command arguments
const [,, ...args] = process.argv;

// Run dev commands
let hasDev = args.find( x => x === '--dev' );
if(hasDev) shell.exec(`tsc-watch --onSuccess \"nodemon ${__dirname}/../dist/server.js\"`);

// Run start commands
let hasStart = args.find( x => x === '--start' );
if(hasStart) shell.exec(`tsc && node ${__dirname}/../dist/server.js`);

// Generate - generates the static app
let hasGenerate = args.find( x => x === '--generate' );
if(hasGenerate) console.log('generate the app!');