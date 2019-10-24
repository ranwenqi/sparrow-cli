# sparrow-cli
微信小程序脚手架工具
原因：起初是因为每次上传微信小程序时需要需要手动更改环境地址。这样不智能化而且人工改很容易出错，
所以有感而发想做一个自动更改配置环境变量同时能自动上传的工具，后续会增加新建小程序组件与页面的功能尽情期待！！！

使用方法：
第一步：拉去汉光百货master代码，确保微信小程序有config/config.js文件，里面存着与此包交互的环境变量
第二步：确认项目有node环境，没有需要去官网下载的。
第三步：npm init 初始化node环境。
第四步：sudo npm i sparrow-cli -g，全局安装包。
第五步：spr-cli preview 预览。spr-cli publish 发布。

只需五步，你就拥有了一个自动化切换环境以及上传代码的神器了，妈妈再也不用担心我上传代码了！！！


