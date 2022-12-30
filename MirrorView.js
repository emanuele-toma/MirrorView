const vm = require('vm');

/**
 * Executes JavaScript code embedded within an HTML string and replaces the code with the output.
 * @param {object} context - A JavaScript object that can be used to provide variables or functions that the embedded code can use. Any output produced by the code will be written to the `writeToDocument` property of the context object.
 * @param {string} rawHTML - The HTML string containing the embedded JavaScript code.
 * @returns {string} The modified HTML string with the embedded code executed and replaced with the output.
 */

function executeJS(context, rawHTML) {
  // Create a new context using the `vm` module's `createContext` function
  vm.createContext(context);
  
  // Extract any JavaScript code embedded within the raw HTML using a regular expression
  var rawJSCode = rawHTML.match(/<\?js([\s\S]*?)\?>/g);

  // If there is no JavaScript code embedded within the raw HTML, return the raw HTML
  if (!rawJSCode) return rawHTML;

  // Process the code by adding a semicolon at the end of each line and joining the lines together
  jsCode = rawJSCode.map(code => code.replace(/<\?js/g, '').replace(/\?>/g, '').split('\n').map(line => line.endsWith(';') ? line : line + ';').join('\n'));

  // Execute each block of code in the specified context using the `vm` module's `runInContext` function
  jsCode.forEach((code, index) => {
      vm.runInContext(code, context);

      // If the context has a property `writeToDocument`, replace the JavaScript code with its value
      if (context.writeToDocument) {
          rawHTML = rawHTML.replace(rawJSCode[index], context.writeToDocument);
          delete context.writeToDocument;
      }
  });

  // Clean up the HTML by removing the `<?js` and `?>` tags and any leading or trailing white space
  var cleanHTML = rawHTML.replace(/<\?js([\s\S]*?)\?>/g, '').trim();

  // Return the modified HTML
  return cleanHTML;
}

// Make the `executeJS` function available for other parts of the program to use by exporting it as a property of an object
module.exports = { executeJS };