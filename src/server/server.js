#!/usr/bin/env node

console.log('starting hyperwire server')
console.log('please visit http://localhost:2468')

// console.log('__dirname', __dirname);
// console.log('process.cwd()', process.cwd());

let git = require('nodegit');

const globalFolder = __dirname;
const localFolder = process.cwd()
let fs = require('fs');

const path = require('path');

let stateFilename = path.join(localFolder, 'taskstate.json')

let Koa = require('koa');
let Router = require('koa-router');
const serve = require('koa-static');

const cors = require('koa-cors');

let app = new Koa();
let router = new Router();

app.use(serve(path.join(globalFolder, '../..', 'dist')));


const body = require('koa-json-body')
app.use(body({ limit: '10kb', fallback: true }))

//todo: search upwards in folders for taskstate.json

router.get('/git', async (ctx, next) => {
    let json = {}
    let repo = await git.Repository.open(localFolder);
    let commit = await repo.getBranchCommit("master");
    let master = await repo.getMasterCommit();
    let history = master.history();
    let config = await repo.config();
    let buf = await config.getStringBuf('url');
    
    json.commit = {message:commit.message()}
    json.config = config
    ctx.body = json
})
router.get('/state', (ctx, next) => {
    let json = {}
    if(fs.existsSync(stateFilename)){
        json = JSON.parse(fs.readFileSync(stateFilename).toString());
    }
    ctx.body = json
})

router.put('/state', (ctx, next) => {
    if(ctx.request.body){
        fs.writeFileSync(stateFilename, JSON.stringify(ctx.request.body, null, 2));
    }
})

// app.use(ctx => {
//   ctx.body = 'Hello World';
// });

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

let index = fs.readFileSync(path.join(globalFolder, '../..',  'dist/index.html')).toString()

app.use(function * notFound(next){
    yield next;
    if(this.res.statusCode == 404){ //serve index on all 404s -> history
        this.type = 'html';
        this.body = index
    }
})

app.listen(2468)
