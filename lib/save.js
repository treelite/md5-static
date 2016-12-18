/**
 * @file Save file
 * @author treelite(c.xinle@gmail.com)
 */

import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

let write = (file, data) => new Promise(
    (resolve, reject) => fs.writeFile(file, data, error => error ? reject(error) : resolve())
);
let exists = file => new Promise(
    resolve => fs.access(file, error => resolve(!error))
);
let mkdir = dir => new Promise(
    (resolve, reject) => mkdirp(dir, error => error ? reject(error) : resolve())
);

async function save(file, sourceDir, outputDir, callback) {
    let dir = path.relative(sourceDir, file.dir);
    dir = path.resolve(outputDir, dir);
    let filename = path.resolve(dir, file.name + '.' + file.extname);

    let isExists = await exists(dir);
    if (!isExists) {
        await mkdir(dir);
    }
    await write(filename, file.data);
    callback('generate: ' + filename);

    for (let item of file.dependences) {
        await save(item.file, sourceDir, outputDir, callback);
    }
}

export default async function (files, sourceDir, outputDir, callback) {
    for (let file of files) {
        await save(file, sourceDir, outputDir, callback);
    }
}
