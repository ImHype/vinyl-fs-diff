
## Vinyl-Fs-Diff

gulp module to stream files only if target files are changed.

## Getting Started

### Install

```
$ npm install vinyl-fs-diff --save-dev
```

### Usage

This task will keep a hash reference of target files and run defined tasks only if files changed.
File hashes will be saved in `.diff/hash.json`. You might like to add `.gulp` to your `.gitignore`.

```javascript
const diff = require('vinyl-fs-diff');

const SRC = 'src';
const DEST = 'dist';

gulp.task('default', () => {
    gulp.src(SRC)
        .pipe(diff())
        .pipe(gulp.dest(DEST));
});
```

## Options

### clear

Type: `bool` Default value: `false`

flush file hashes running with clear option value: `true`

### dest

Type: `string` or `array` Default value: `undefined`

option to filter streaming files. This task will stream only files that match given paths into the gulp stream. If it is undefined, all files will be passed.

### hash

Type: `string` Defualt value: `'hash'`

options to define filename of hash references for multi tasking or multi cache control. files of hash references will be saved as `.diff/[givenName].json`.

## Example

example of building sass.

gulp task watch all of sass src files and stream only `main.sass` and `main-sp.sass` into `sass()` task.

```javascript
const diff = require('vinyl-fs-diff');

gulp.task('default', () => {
    gulp.src('src/sass/**/*.sass')
        .pipe(diff({
            clean: true,
            dest: [
                'src/sass/main.sass',
                'src/sass/main-sp.sass'
            ],
            hash: 'sass'
        }))
        .pipe(sass()),
        .pipe(gulp.dest('dest'));
});
```

## License

The MIT License (MIT)

Copyright 2016~ moshisora
