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

- SCSS 全局变量 —— SCSS module
- child 进程杀死
  - 需要杀死后续创建的进程，例如 vpn 进程
  - 试一试执行命令查找 vpn 进程 pid，然后杀死——windows 和 linux 命令不同
  - 别的方法？
- vpn 相关文件处理
- 管理员方式运行程序
- tap 网卡检测——设置中检测并安装
  - 客户端修复功能
- 添加个 UI 库——暂时不用
- preload.js 中的 channel 处理——CONSTS

## Maintainers

## License
