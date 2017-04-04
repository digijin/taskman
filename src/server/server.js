
let Koa = require('koa');
let Router = require('koa-router');

var cors = require('koa-cors');
let fs = require('fs');




let app = new Koa();
let router = new Router();

const body = require('koa-json-body')
app.use(body({ limit: '10kb', fallback: true }))


router.get('/', (ctx, next) => {
    let json = {}
    if(fs.fileExists('state.json')){
        json = JSON.parse(fs.readFileSync('state.json').toString());
    }
    ctx.body = json
})

router.put('/', (ctx, next) => {
    if(ctx.request.body){
        fs.writeFileSync('state.json', JSON.stringify(ctx.request.body, null, 2));
    }
})

// app.use(ctx => {
//   ctx.body = 'Hello World';
// });

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

app.listen(2468)
