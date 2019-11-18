// const { exec } = require('child_process');
// console.log("==========================");




const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function lsExample() {
  const { stdout } = await exec('"C:/\Program Files (x86)/\Tencent/\微信web开发者工具/\cli.bat"');
}
lsExample();