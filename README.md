# MirrorView

MirrorView is a Node.js module that allows you to execute JavaScript code embedded within an HTML string and replace the code with the output.

## Installation

To install MirrorView, use npm:

```
npm install mirrorview
```


## Usage

To use MirrorView in your Node.js program, require the module and call the `executeJS` function:

```javascript
const mirrorview = require('mirrorview');

let html = '<html><body><h1><?js "Hello, world!" ?></h1></body></html>';
let context = {};

html = mirrorview.executeJS(context, html);
```

The executeJS function takes two arguments: a context object and an HTML string. The context object can be used to provide variables or functions that the embedded JavaScript code can use. Any output produced by the code will be written to the writeToDocument property of the context object. This property will then be used to replace the embedded JavaScript code in the HTML string.

For example, the following HTML string will output "2":

```html
<html>
  <body>
    <h1><?js let writeToDocument = 1 + 1; ?></h1>
  </body>
</html>
```

## Limitations

There are a few limitations to be aware of when using MirrorView:

* Only JavaScript code embedded within <?js and ?> tags will be executed. Any other JavaScript code in the HTML string will be ignored.
* The context object must be a plain JavaScript object. It cannot be a class or function.
* The executeJS function does not provide any way to catch or handle errors that may occur while executing the embedded code. If an error occurs, it will be thrown and may crash the program.

## License

MirrorView is released under the GNU AGPL v3.0 license. See [LICENSE](https://github.com/emanuele-toma/MirrorView/blob/main/LICENSE) for more information.