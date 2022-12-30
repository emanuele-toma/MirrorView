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

The executeJS function takes two arguments: a context object and an HTML string. The context object can be used to provide variables or functions that the embedded JavaScript code can use. To output values in the HTML string you can use the echo function, it takes a string as a parameter.

For example, the following HTML string will output "2":

```html
<html>
  <body>
    <h1><?js echo(1 + 1); ?></h1>
  </body>
</html>
```

Here is another example of how you could use the executeJS function in a Node.js program:

```javascript
const mirrorview = require('mirrorview');

let html = `
  <html>
    <body>
      <h1><?js "Hello, world!" ?></h1>
      <p><?js echo("Today is " + new Date().toLocaleDateString()); ?></p>
      <ul>
        <?js
          for (let i = 1; i <= 5; i++) {
            echo('<li>Item ' + i + '</li>');
          }
        ?>
      </ul>
    </body>
  </html>
`;
let context = {};

html = mirrorview.executeJS(context, html);
console.log(html);
```

This code will output the following HTML string:

```html
<html>
  <body>
    <h1>Hello, world!</h1>
    <p>Today is [current date]</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
      <li>Item 4</li>
      <li>Item 5</li>
    </ul>
  </body>
</html>
```

## Limitations

There are a few limitations to be aware of when using MirrorView:

* Only JavaScript code embedded within <?js and ?> tags will be executed.
* The context object must be a plain JavaScript object. It cannot be a class or function, though it can include class or functions.
* The executeJS function does not provide any way to catch or handle errors that may occur while executing the embedded code. If an error occurs, it will be thrown and may crash the program.

## License

MirrorView is released under the GNU AGPL v3.0 license. See [LICENSE](https://github.com/emanuele-toma/MirrorView/blob/main/LICENSE) for more information.