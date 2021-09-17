# gulpBase

A gulp-file and folder-structure to start develop frontend-projects.

Note: This is a single-starting-point, so once your application is up and running, there is no need to keep it compatible with this Git-version. Feel free to customize it to your personal needs.

## File-Structure

```
gulpBase
├── index.html
├── favicon.png
├── README.md
├── src
│   ├── fonts
│   │   └── fonts.css
│   ├── js
│   │   └── *
│   ├── libs
│   │   └── *
│   └── scss
│       ├── style.scss
│       ├── variables.scss
│       ├── base
│       │   ├── _all.scss
│       │   └── *
│       ├── functions
│       │   ├── _all.scss
│       │   └── *
│       ├── mixins
│       │   ├── _all.scss
│       │   └── *
│       ├── modules
│       │   ├── _all.scss
│       │   └── *
│       └── placeholders
│           ├── _all.scss
│           └── *
├── dist
│   ├── css
│   │   └── styles.min.css
│   ├── js
│   │   └── script.min.js
│   └── libs
│       ├── vendor.min.css
│       └── vendor.min.js
├── media
│   └── *
├── node_modules
│   └── *
│
├── gulpfile.js
├── _build.bat
├── _build_debug.bat
├── _watch.bat
├── _watch_debug.bat
│
├── package.json
└── package-lock.json
```

## Working with the files

**Images** and other static media-files should be placed in the "media"-folder on siteroot-level.

**JS** is concatenated file-by-file in alphabetical order (no special bundling). Scripts that must be included first should be markes by underscore or number.

**Styles** are defined using **Sass**. The entry-file is "style.scss" where all further definitions are referenced.

* variables.scss: global values like colors or font-families/-sizes
* /functions: all of your Sass-functions
* /mixins: all of your Sass-mixins
* /placeholders: all of your Sass-placeholders
* /base: base-styles like font-definitions, grid, etc.
* /modules: the styles for each individual module of your application

Each of the folders has a file "_all.scss" in which new sass-files inside this fodler should be registered.

Normally, the "styles.scss" does not need to be edited, as it simply bundles all the files and folders listed above.

**Libraries** like jQuery or Bootstrap can be concatenated in a single vendor-file as well. This does __not__ work automatically, as all Libraries use a custom file-structure. These files must be registered in the gulp-file under "compile-js-libs" and "compile-css-libs". If they remain empty, they should be removed or commented out, because gulp thows an error otherwise.

**Fonts** can be included as GoogleFonts or as local files. Make sure to either reference the fonts.css in your sass (current implementation) and/or to correctly reference the font-files from the built-directory.

## Working with Gulp

Gulp is used in the windows-terminal as usual.

```
gulp
```

is the default-task that builds and copies all assets to the built-folder and starts the file-watcher so that you can directly start to develop. It detects changes in the js- and sass-files, but not in libs or fonts.


```
gulp build-assets
```

only builds the assets, but does not start the watcher. Usefull if you want to check something live without the intention to develop.

All other tasks are registered as gulp-tasks as well, like "compile-sass" or "compile-js-libs" - they build and copy only the part specified in the name. For more details check the gulp-file :-)

```
gulp [build-assets] --debug
```

works like the commands above, but skips the uglyfying and minifying for easier debugging.