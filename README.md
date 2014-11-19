# grunt-flow

> Validates JavaScript with Facebook's [Flow](https://github.com/facebook/flow) Library

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-flow --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-flow');
```

## The "flow" task

### Overview
In your project's Gruntfile, add a section named `flow` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  flow: {}
})
```

### Usage

#### Config

[Flow](https://github.com/facebook/flow) requires that you have a `.flowconfig` file in the root of you project folder. Below is an example of what your `.flowconfig` file should look like:

```bash
# .flowconfig
[include]

[ignore]
.*/node_modules/flow-bin
```



## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

<strong>v0.0.1</strong> - Initial release

## License
Copyright (c) 2014 Jake Larson. Licensed under the MIT license.
