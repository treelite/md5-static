# md5-static

Add md5 summary as a part of file name for static files and modify the reference paths.

## Usage

```sh
# Handle 'src' dir, output files in 'output' dir, excludes 'atom.xml' and 'pic/draft' directory
$ md5-static src -d output -x atom.xml,pic/draft
```

## How It works

`md5-static` handles four types of files: html, css, js and resources(e.g. images)

### HTML

Not change the name, just care about the reference paths of all dependence files, including:

* __CSS__, included by `<link>`
* __JS__, included by `<script>`
* __Image__, included by `<img>` and `<link type="image/x-icon">`

### CSS

Add md5 summary in the name and modify the reference paths which defined by `url()`.

### JS

Only handle the ES6 modules import.

#### Resource

Just add md5 summary.
