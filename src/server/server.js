#!/usr/bin/env node

console.log('starting server')
console.log('please visit http://localhost:2468')

let git = require('nodegit');

const globalFolder = __dirname;
const localFolder = process.cwd()
let fs = require('fs');

const path = require('path');

let stateFilename = path.join(localFolder, 'taskstate.json')
let configFilename = path.join(localFolder, 'codeplan.config.js')

let Koa = require('koa');
let Router = require('koa-router');
const serve = require('koa-static');

const cors = require('koa-cors');

let app = new Koa();
let router = new Router();

app.use(serve(path.join(globalFolder, '../..', 'dist')));

const configLoader = require('./configLoader')

const convert = require('koa-convert')

const body = require('koa-json-body')
app.use(body({ limit: '10kb', fallback: true }))

//todo: search upwards in folders for taskstate.json
const gitroute = require('./git')
router.get('/git', gitroute)
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



router.get('/config', async (ctx, next) => {
    let json = {}

    if(fs.existsSync(configFilename)){
        let config = await configLoader(configFilename);
        json.config = config//fs.readFileSync(configFilename).toString();
    }else{
        json.error = "config not found"
        json.filename = configFilename
    }
    ctx.body = json
})

// app.use(ctx => {
//   ctx.body = 'Hello World';
// });

app.use(convert(cors()));
app.use(router.routes()).use(router.allowedMethods());


// 404 SERVE INDEX
const handle404 = require('./handle404')
app.use(handle404);

app.listen(2468)
