let webpack = require('webpack');
var MemoryFS = require("memory-fs");
const load = require('webpack-to-memory');

module.exports = async function loadConfig(filename){
    console.log('loading config from', filename)
    var fs = new MemoryFS();

    let webpackConfig = {
        entry: filename,
        output: {
            path: '/tmp',
            libraryTarget: 'commonjs2',
            filename: 'bundle.js'
        },
        externals:[],

    }

    let compiler = webpack(webpackConfig);

    // let files = await load(compiler)

    // console.log(files.length);

    compiler.outputFileSystem = fs;
    let out = await new Promise((resolve, reject) => {
        compiler.run(function(err, stats) {
            // var fileContent = fs.readFileSync("bundle.js");
            // console.log(fileContent);
            // console.log('stats', stats);
            resolve({err, stats})
            // if(err){
            //     console.log('Webpack Error', err);
                
            // }else{
            //     // console.log('worked?');
            //     let file = fs.readFileSync('/tmp/bundle.js');
            //     console.log(file.toString())
            // }
        });
    });
    if(out.err){
        //TODO error handling
        console.log('Webpack Error', err)
        
    }
    let file = fs.readFileSync('/tmp/bundle.js');

    return file.toString();
}
