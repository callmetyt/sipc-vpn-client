import { ChildProcess, exec } from 'child_process';
import { ipcMain } from 'electron';
import { execResultDecode, isWin } from './util';

function initEvent() {
  let childProcess: null | ChildProcess = null;
  // shell vpn开启
  ipcMain.on('vpn-open', async (event, arg) => {
    // cmd执行vpn启动命令
    childProcess = exec(isWin() ? 'vpn.exe taiyatong' : 'ls', {
      encoding: 'binary',
    });
    // pid记录
    event.reply('vpn-open', `进程PID:${childProcess.pid}`);
    // err信息
    childProcess.stderr?.on('data', (data) => {
      event.reply('vpn-open', execResultDecode(data));
    });
    // 普通信息
    childProcess.stdout?.on('data', (data) => {
      event.reply('vpn-open', execResultDecode(data));
    });
    // 进程退出信息
    childProcess.stdout?.on('close', () => {
      event.reply('vpn-close', 'vpn进程已关闭'); // 仅给 vpn-close 发送
    });
  });
  // shell vpn关闭
  ipcMain.on('vpn-close', async (event, arg) => {
    if (childProcess) {
      // 调用childProcess kill事件
      const killRes = childProcess.kill();
    } else {
      // childProcess 不存在
      event.reply('vpn-close', 'error! vpn进程不存在!');
    }
  });
}

export default initEvent;
