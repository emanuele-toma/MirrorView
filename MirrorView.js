// MirrorView

const vm = require('vm');

function executeJS(context, rawHTML) {
  vm.createContext(context);
  
  var rawJSCode = rawHTML.match(/<\?js([\s\S]*?)\?>/g);

  jsCode = rawJSCode.map(code => code.replace(/<\?js/g, '').replace(/\?>/g, '').split('\n').map(line => line.endsWith(';') ? line : line + ';').join('\n'));

  jsCode.forEach((code, index) => {
      vm.runInContext(code, context);

      if (context.writeToDocument) {
          rawHTML = rawHTML.replace(rawJSCode[index], context.writeToDocument);
      }
  });

  var cleanHTML = rawHTML.replace(/<\?js([\s\S]*?)\?>/g, '').trim();

  return cleanHTML;
}

module.exports = { executeJS };
