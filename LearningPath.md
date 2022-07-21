# 学习路径
这个日志主要记录开发的学习路径，学到的知识，用到的资源
## 2022年7月20日
Chrome开发入门，目前是v3版本
https://developer.chrome.com/docs/extensions/mv3/getstarted/
创建了manifest.json，可以在浏览器里加载插件了
如何让VSCode在开发时自动提示chrome extension api？
在项目下创建jsconfig.json，并加入
{
    "typeAcquisition": {
        "include": [
            "chrome"
        ]
    }
}