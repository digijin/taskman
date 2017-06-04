
let git = require('nodegit');
const globalFolder = __dirname;
const localFolder = process.cwd()

module.exports = async (ctx, next) => {
    let json = {}
    let repo = await git.Repository.open(localFolder);
    let commit = await repo.getBranchCommit("master");
    let master = await repo.getMasterCommit();
    let history = master.history();
    let config = await repo.config();
    // let buf = await config.getStringBuf('url');
    let status = await repo.getStatus();
    
    json.status = status.map(s => {
        return {
            path:s.path(),
            status:s.status(),
            isNew:s.isNew(),
            isRenamed:s.isRenamed(),
            inIndex:s.inIndex(),
            inWorkingTree:s.inWorkingTree()
        }
    })
    json.commit = {message:commit.message()}
    json.config = config
    ctx.body = json
}