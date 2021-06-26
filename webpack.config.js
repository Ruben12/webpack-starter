const HtmlWebPack    = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin     = require("copy-webpack-plugin");
 
module.exports = {
 
    mode: 'development',

    // Borra los archivos de la carpeta dist
    output: {
        clean: true
    },

    module:{
        rules: [
            //Sirven para decirle que hacer con los distintos tipos de archivo
            {
                //Es la condición que debe cumplir, se usan expresiones regulares
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false,
                    minimize: false,
                },
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /styles.css$/,
                use: [ MiniCssExtract.loader, 'css-loader' ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader'
            }
        ],
    },
    //Aquí se ejecuta la instancia que hemos creado antes para que copie el index html de la carpeta src a dist para cuando se suba a producción
    plugins:[
        new HtmlWebPack({
            title: 'Webpack App',
            template: './src/index.html'
            //filename: 'index.html'
        }),

        new MiniCssExtract({
            filename: '[name].css',
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ]
 
}