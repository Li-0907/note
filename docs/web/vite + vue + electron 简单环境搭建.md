---
title: start
---

## vue 环境

使用 vite 创建一个正常得 vue 项目，在项目的 vite.config.js 中配置 **base** 属性

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 新增
  plugins: [vue()]
})
```

base 属性指定打包时默认的打开位置，默认是**/**，这种环境下，直接在浏览器打开 build 好的 index.html 是白屏，只有在服务器环境下才可以正常打开。配置了 base，才能在 electron 中正确打开网页内容。

## electron 环境

项目下安装 electron 依赖：

```javascript
npm i -D electron
```

在项目根目录下新建**main.js** 和**preload.js** 配置基本设置

```javascript
// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: './preload.js'
    }
  })

  // 加载 index.html
  mainWindow.loadFile('./dist/index.html')

  // 打开开发工具
  mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。
```

```javascript
// preload.js

// All the Node.js APIs are available in the preload process.
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
```

在 package.json 中的 main 节点改为 main.js，在 scripts 节点下添加 electron 启动脚本指令：

```json
{
  "name": "electron-test",
  "private": true,
  "version": "0.0.0",
  "type": "commonjs",
  "main": "main.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "electron ."
  },
  "dependencies": {
    "vue": "^3.2.37"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^3.1.0",
    "electron": "^20.1.4",
    "vite": "^3.1.0"
  }
}
```

## 启动

首先在启动前要先打包项目，然后再以打包后的 index.html 为基础运行 electron。

所以首先运行 **npm run build**

然后就可以运行 **npm run start** 启动项目了。

---

或者将打包命令直接包含在 start 指令中：

```json
"start": "vite build && electron ."
```
