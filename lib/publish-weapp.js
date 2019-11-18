const inquirer = require('inquirer'); // 启动交互命令行
const spawn = require('cross-spawn'); // 开启子进程
const fs = require("fs");
const jsonFormat = require("json-format"); // json格式化
const Config = require('../config'); // 配置项
const Log = require("../log"); // 控制台输出


// 修改本地版本文件
function rewriteLocalVersionFile(filepath, versionConf) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, jsonFormat(versionConf), err => {
      if (err) {
        Log.error(err);
        process.exit(1);
      } else {
        resolve(2);
      }
    })
  })
}
//修改gio版本号
function changeGioVersion(filepath, version) {
  const content = 'version';
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, content, err => {
      if (err) {
        Log.error(err);
        process.exit(1);
      } else {
        resolve(2);
      }
    })
  })
}
/* = define question
-------------------------------------------------------------- */

function getQuestion({
  version,
  versionDesc,
} = {}) {
  return [{
      type: 'confirm',
      name: 'isRelease',
      message: '是否为正式发布版本?',
      default: true
    },
    // 设置版本号
    {
      type: 'input',
      name: 'version',
      message: `版本号(当前版本号:${version}):`,
      default: version
    },
    // 设置上传描述
    {
      type: 'input',
      name: 'versionDesc',
      message: `写一个简单的介绍来描述这个版本的改动:`,
      default: versionDesc,
    }
  ]
}
// exec('"C:\Program Files (x86)\Tencent\微信web开发者?工具\微信开发者工具.exe"');
module.exports = async function () {
  let idePath; //ide路径
  let cli; //官方提供的脚手架路径
  // ide路径 判断不同的平台得到不同的ide地址
    if(process.platform == ('win32'||'win64')) {
      cli = "C:/\Program Files (x86)/\Tencent/\微信web开发者工具/\cli.bat";
    }else{
     idePath = '/Applications/wechatwebdevtools.app/';
     cli=`${idePath}/Contents/Resources/app.nw/bin/cli`;
    }
  // console.log('===第二步：写上传逻辑，2.1拿到cli路径cli', cli);

  // 版本配置文件路径    
  const versionConfPath = `${Config.dir_root}/upload.version.json`;


  //  获取版本配置
  const versionConf = require(versionConfPath);


  // console.log('===第二步：写上传逻辑，2.2取版本配置versionConf', versionConf);


  // 开始执行
  let answer = await inquirer.prompt(getQuestion(versionConf));

  // 不输入版本号会默认使用上次的版本号，好的
  if (answer.version == '') answer.version = versionConf.version;
  // console.log('====第一步：拿到你需要的answer，此时是你输入的描述这个版本的信息', answer);
  const switchFunc = require('../switch');
  switchFunc(answer.isRelease).then(() => {
    if(answer.isRelease) {
      answer.versionDesc = `正式：${answer.versionDesc}`;
    } else {
      answer.versionDesc = `测试：${answer.versionDesc}`;
    }
    versionConf.version = answer.version;
    versionConf.versionDesc = answer.versionDesc;

    // console.log('===第二步：写上传逻辑，2.3问题队列（获取用户上传信息)versionConf', versionConf);

    //上传体验版
    let res = spawn.sync(cli, ['-u', `${versionConf.version}@${Config.dir_root}`, '--upload-desc', versionConf.versionDesc], {
      stdio: 'inherit'
    });
    if (res.status !== 0) process.exit(1);
    Log.success('上传成功...')

    // console.log('===第二步：写上传逻辑，2.4执行上传（cli命令）res为上传的结果');

    // 修改本地版本文件 (当为发行版时)
    rewriteLocalVersionFile(versionConfPath, versionConf).then(data => {
    if (data == 2) {
    Log.success('上传配置文件修改成功！！！');
    }
    });
    // success tips
    Log.success(`上传体验版成功, 登录微信公众平台 https://mp.weixin.qq.com 获取体验版二维码`);
  });
  // console.log('===第二步：写上传逻辑，2.6执成功提示');


}