# 学习路径
这个日志主要记录开发的学习路径，学到的知识，用到的资源
## 2022年7月20日
Chrome开发入门，目前是v3版本
https://developer.chrome.com/docs/extensions/mv3/getstarted/
按照官方教程增加代码
创建了manifest.json，可以在浏览器里加载插件了.

问题：如何让VSCode在开发时自动提示chrome extension api？
在项目下创建jsconfig.json，并加入
{
    "typeAcquisition": {
        "include": [
            "chrome"
        ]
    }
}
重新打开js文件就可以自动提示了

知识：官方案例教程使用chrome.storage.sync来存储数据
sync这种方式实现了不同设备间的自动数据同步，相同的用户可以共享存储的数据。
