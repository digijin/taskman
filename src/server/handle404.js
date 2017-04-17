const fs = require('fs')
const path = require('path')

const globalFolder = __dirname;

const index = fs.readFileSync(path.join(globalFolder, '../..',  'dist/index.html')).toString()
module.exports = async function handle404(ctx, next) {
    await next;
    if(ctx.res.statusCode == 404){ //serve index on all 404s -> history
        ctx.type = 'html';
        ctx.body = index
    }
}