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
    if (file.saved) {
        return;
    }
    let dir = path.relative(sourceDir, file.dir);
    dir = path.join(outputDir, dir);
    let filename = path.join(dir, file.name + '.' + file.extname);

    if (file.type !== 'html' && await exists(filename)) {
        file.saved = true;
        return;
    }

    let isExists = await exists(dir);
    if (!isExists) {
        await mkdir(dir);
    }
    await write(filename, file.data);
    callback(filename);
    file.saved = true;

    for (let item of file.dependences) {
        await save(item.file, sourceDir, outputDir, callback);
    }
}

export default async function (files, sourceDir, outputDir, callback) {
    for (let file of files) {
        await save(file, sourceDir, outputDir, callback);
    }
}
