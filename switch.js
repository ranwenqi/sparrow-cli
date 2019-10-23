/*
 * @Author: ranwenqi 
 * @Date: 2019-10-22 11:14:00 
 * @Last Modified by: ranwenqi
 * @Last Modified time: 2019-10-23 14:27:50
 */
/**
 * 根据命令行运行参数，修改 /config/config.js 里面的项目配置信息
 * 即动态的将 /config/env 下的配置文件的内容写入到 /config/config.js 中
 */

const fs = require('fs')
const path = require('path')
const configPath = require('./config');
const Log = require("./log"); // 控制台输出

//源文件
module.exports = async function (isRelease) {
  const sourceFiles = {
    prefix: '/config/env/',
    dev: 'dev.json',
    prod: 'prod.json'
  }
  //目标文件
  const targetFiles = [{
    prefix: '/config/',
    filename: 'config.js'
  }]

  const preText = 'module.exports = '
  // 获取命令行参数
  // const cliArgs = process.argv.splice(2)
  // const env = cliArgs[0]
  // // 判断是否是 prod 环境
  // const isProd = env.indexOf('prod') > -1 ? true : false;




  // 根据不同环境选择不同的源文件
  const sourceFile = isRelease ? sourceFiles.prod : sourceFiles.dev
  // 处理数据
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + sourceFiles.prefix + sourceFile,
      (err, data) => {
        if (err) {
          throw new Error(`Error occurs when reading file ${sourceFile}.\nError detail: ${err}`)
          process.exit(1)
        }
        // 获取源文件中的内容
        const targetConfig = JSON.parse(data)

        const {
          baseUrl
        } = targetConfig
        // 将获取的内容写入到目标文件中
        targetFiles.forEach(function (item, index) {
          let result = null
          if (item.filename === 'config.js') {
            let config = {
              baseUrl: baseUrl
            }
            result = preText + JSON.stringify(config, null, 2)
          }
          // 写入文件(这里只做简单的强制替换整个文件的内容)
          fs.writeFileSync(configPath.dir_root + item.prefix + item.filename, result, 'utf8', (err) => {
            if (err) {
              throw new Error(`error occurs when reading file ${sourceFile}. Error detail: ${err}`)
              process.exit(1)
            }
          })
          resolve();
          Log.success('环境变量成功改变写入文件成功');

        })
      })
  })
}