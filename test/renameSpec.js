/**
 * @file Rename spec
 * @author treelite(c.xinle@gmail.com)
 */

import rename from '../lib/rename';

describe('rename', () => {

    it('normal', () => {
        let htmlData = '<script src="src/app.js"></script>';
        let appData = 'import format from "./util/format";';
        let formatData = 'console.log("Hello, World!");';
        let files = [
            {
                filename: '/web/index.html',
                type: 'html',
                data: htmlData,
                dependences: [
                    {
                        filename: '/web/src/app.js',
                        start: 13,
                        end: 23,
                        len: 10,
                        relativeDir: 'src/',
                        file: {
                            filename: '/web/src/app.js',
                            type: 'js',
                            data: appData,
                            name: 'app',
                            extname: 'js',
                            dependences: [
                                {
                                    filename: '/web/src/util/format.js',
                                    start: 20,
                                    end: 33,
                                    len: 13,
                                    relativeDir: './util/',
                                    file: {
                                        filename: '/web/src/util/format.js',
                                        type: 'js',
                                        name: 'format',
                                        extname: 'js',
                                        data: formatData,
                                        dependences: []
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        ];

        let file = rename(files)[0];
        expect(file.md5).not.toBeUndefined();
        expect(file.data).not.toEqual(htmlData);
        expect(file.dependences[0].file.md5).not.toBeUndefined();
        expect(file.dependences[0].file.data).not.toEqual(appData);
        expect(file.dependences[0].file.dependences[0].file.md5).not.toBeUndefined();
        expect(file.dependences[0].file.dependences[0].file.data).toEqual(formatData);
    });

});
