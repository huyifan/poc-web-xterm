# poc-web-xterm
use basical stack such as webpack/html/node to create a minimize xterm project which can use  command as native cmd .

博客说明可以查看：
https://www.jianshu.com/p/fc831ebfd9c1

# EXAMPLE

![demo](https://upload-images.jianshu.io/upload_images/5471980-4b1028e097383eb7.gif?imageMogr2/auto-orient/strip)


# USE

> 注意：在使用之前，可能需要安装一些依赖，请仔细阅读上面简书博客链接或xterm、node-pty官网文档，务必保证相关环境的一致；
 
 
1、
> npm install 

这里node-pty会编译，请根据node-pty官网部分下载所必须的内容

对于windows平台：
（1）npm安装windows-build-tools
（2）安装windowsSDK
（3）nodeJs 10+（笔者在12.18.2的情况下安装成功了）

2、

> webpack

3、
> npm run server

4、
> click index.html ,open in browser

# TODO LIST

- [ ] resize the terminal when the window's size change
- [ ] use react 
- [ ] create terminal in Multi-window

