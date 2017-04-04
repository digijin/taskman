
let Koa = require('koa');
let Router = require('koa-router');
const serve = require('koa-static');

var cors = require('koa-cors');
let fs = require('fs');




let app = new Koa();
let router = new Router();


app.use(serve('dist'));


const body = require('koa-json-body')
app.use(body({ limit: '10kb', fallback: true }))


router.get('/state', (ctx, next) => {
    let json = {}
    if(fs.fileExists('state.json')){
        json = JSON.parse(fs.readFileSync('state.json').toString());
    }
    ctx.body = json
})

router.put('/state', (ctx, next) => {
    if(ctx.request.body){
        fs.writeFileSync('state.json', JSON.stringify(ctx.request.body, null, 2));
    }
})

// app.use(ctx => {
//   ctx.body = 'Hello World';
// });

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

let index = fs.readFileSync('dist/index.html').toString()

app.use(function * notFound(next){
    yield next;
    if(this.res.statusCode == 404){ //serve index on all 404s -> history
        this.type = 'html';
        this.body = index
    }
})

app.listen(2468)
