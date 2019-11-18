const inquirer = require('inquirer'); // 启动交互命令行
const Log = require("../log"); // 控制台输出
const switchFunc = require('../switch');



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
async function choice(){
  let answer = await inquirer.prompt(question);
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
};
module.exports = async function (userConf) {
  if(userConf === 'pro') {
    switchFunc(true);
  } else if (userConf === 'dev') {
    switchFunc(false);
  } else {
    await choice();
  }
  
  //success
  Log.success('预览成功, 在微信开发者工具获取体验版二维码吧!');
}