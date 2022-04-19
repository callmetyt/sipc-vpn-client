## 所用模板

[Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)

<p>
  模板使用的部分库 <a href="https://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, <a href="https://github.com/reactjs/react-router">React Router</a>, <a href="https://webpack.js.org/">Webpack</a> and <a href="https://www.npmjs.com/package/react-refresh">React Fast Refresh</a>.
</p>

<br>

## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

## 待办

- ~~SCSS 全局变量~~ —— SCSS module
- ~~child 进程杀死~~
  - 已使用 tree-kill-promise 解决
  - AbortController 无法终止——不知道为啥
- vpn 开关接入 Switch 组件
  - 需要知道何时完成开启（关闭）——vpn 字符串回显确定？
- vpn 相关文件处理
  - 尝试使用 electron-builder 的 extraFiles 配置
- windows 不再进行解码？？？
- 管理员方式运行程序
  - electron-builder 貌似提供了 options
  - 手动修改某些文件？
- tap 网卡检测——设置中检测并安装
  - 客户端修复功能
- ~~添加个 UI 库~~——暂时不用

## Maintainers

## License
