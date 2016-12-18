/**
 * @file Rename static files
 * @author treelite(c.xinle@gmail.com)
 */

import md5 from 'md5';
import path from 'path';

function rename(file) {
    if (file.md5) {
        return;
    }
    let deps = file.dependences || [];
    for (let [index, item] of deps.entries()) {
        let depFile = item.file;
        if (!depFile) {
            continue;
        }
        rename(depFile);
        let relativePath = item.relativeDir + depFile.name;
        if (file.type !== 'js') {
            relativePath += '.' + depFile.extname;
        }
        let data = file.data;
        file.data = data.substring(0, item.start) + relativePath + data.substring(item.end);
        let offset = relativePath.length - item.len;
        for (let i = index; i < deps.length; i++) {
            if (i !== index) {
                deps[i].start += offset;
            }
            deps[i].end += offset;
        }
    }
    let code = file.md5 = md5(file.data).substring(0, 8);
    if (file.type !== 'html') {
        file.name += '-' + code;
    }
}

export default function(files) {
    for (let file of files) {
        rename(file);
    }
    return files;
}
