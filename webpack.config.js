const path = require('path');


module.exports = {
    mode: 'production',
    entry: './src/DOM_plugin/index.js',
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: 'bundle.js'
    }
};
