# gulpBase

A gulp-file and folder-structure to start develop frontend-projects.

## File-Structure

```
gulpBase
+ README.md
+ gulpfile.js
+ package.json
+ package-lock.json
+ favicon.png
+ index.html
+ assets
- + src
  - + fonts
    - + fonts.css
  - + js
    - + *
  - + libs
    - + *
  - + sass
    - + style.scss
    - + variables.scss
    - + base
      - + _all.scss
        + *
    - + mixins
      - + _all.scss
        + *
    - + modules
      - + _all.scss
        + *
  + built
  - + css
    - + style.css
  - + js
    - + script.js
  - + libs
    - + vendor.css
    - + vendor.js
+ node_modules
- + *
```

## Working with the files

**Images** and other media-files should be placed in an extra "media"-folder on siteroot-level.

**JS** is concatinated file-by-file in alphabetical order (no special bundling). Scripts that must be included first should be markes by underscore or number.

**Styles** are defined using **Sass**. The entry-file is "style.scss" where all further definitions are referenced. There are /mixins, which include general snippets that can be reused, and /modules, which include the styles for the different modules on the page. Each of them has a file "_all.scss" in which new sass-files should be registered.

**Libraries** like jQuery or Bootstrap can be concatenated in a single vendor-file as well. This does __not__ work automatically, as all Libraries use a custom file-structure. These files should be registered in the gulp-file under "compile-js-libs" and "compile-css-libs". If they remain empty, they should be removed or commented out, because gulp thows an error otherwise.

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