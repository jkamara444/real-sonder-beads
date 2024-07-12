const path = require('path');

module.exports = {
    entry: '/server/public/js/index.js', // Adjust the entry point to match your existing structure
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'server') // Adjust the output path as needed
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    mode: 'production'
};
