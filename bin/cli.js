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

let cwd = process.cwd();
let sourceDir = path.resolve(cwd, argv._[0]);
let outputDir = path.resolve(cwd, argv.d || argv._[0]);

let excludes = [];
if (argv.x) {
    excludes.push(path.resolve(cwd, sourceDir, argv.x));
    let files = argv._.slice(1);
    excludes = excludes.concat(files.map(file => path.resolve(cwd, sourceDir, file)));
}

let log = msg => console.log(msg);
seek(sourceDir, excludes)
    .then(rename)
    .then(files => save(files, sourceDir, outputDir, log))
    .then(
        () => log('Finish'),
        error => console.error(error)
    );
