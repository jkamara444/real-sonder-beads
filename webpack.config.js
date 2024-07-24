const path = require('path');

module.exports = {
    entry: './server/public/js/index.js', 
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'server/public') // Adjust the output path as needed
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        static: path.resolve(__dirname, 'server/public'), // The directory to serve static files from
        compress: true,
        port: 9000 // You can choose a different port if needed
    },
    mode: 'development' // Use 'development' mode for better debugging and automatic reloading
};
