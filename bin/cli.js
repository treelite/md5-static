#!/usr/bin/env node
/**
 * @file CLI
 * @author treelite(c.xinle@gmail.com)
 */

import path from 'path';
import yargs from 'yargs';
import seek from 'seek-dep';
import save from '../lib/save';
import rename from '../lib/rename';

let argv = yargs
    .usage('Usage: $0 source_dir [-d output_dir] [-x exclude_dirs]')
    .demand(1)
    .argv;

let sourceDir = argv._[0];
let outputDir = argv.d || sourceDir;

let excludes = [];
if (argv.x) {
    excludes.push(path.join(sourceDir, argv.x));
    let files = argv._.slice(1);
    excludes = excludes.concat(files.map(file => path.join(sourceDir, file)));
}

let log = msg => console.log(msg);
seek(sourceDir, excludes)
    .then(rename)
    .then(files => save(files, sourceDir, outputDir, log))
    .then(
        () => {},
        error => console.error(error)
    );
