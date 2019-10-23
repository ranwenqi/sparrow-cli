const inquirer = require('inquirer'); // 启动交互命令行
const spawn = require('cross-spawn'); // 开启子进程
const Config = require('../config'); // 配置项
const Log = require("../log"); // 控制台输出


const question = [
  // 选择使用的环境
  {
    type: 'list',
    name: 'mode',
    message: '选择使用的环境',
    choices: [
      '正式环境',
      '测试环境',
      '默认上次环境'
    ]
  }
];
module.exports = async function (userConf) {
  let answer = await inquirer.prompt(question);
  const switchFunc = require('../switch');
  switch (answer.mode) {
    case '正式环境':
      switchFunc(true);
      break;
    case '测试环境':
      switchFunc(false);
      break;
    case '默认上次环境':
      break;
  }
  // 自动化预览
  // const idePath = userConf.idePath || '/Applications/wechatwebdevtools.app/';
  // const cli = `${idePath}/Contents/Resources/app.nw/bin/cli`;
  // let res = spawn.sync(cli, ['-p', Config.dir_root], {
  //   stdio: 'inherit'
  // });
  // if (res.status !== 0) process.exit(1);


  switch (answer.mode) {
    case '正式环境':
      switchFunc(true);
      break;
    case '测试环境':
      switchFunc(false);
      break;
    case '默认上次环境':
      break;
  }
  //success
  Log.success('预览成功成功, 在微信开发者工具获取体验版二维码吧!');


}