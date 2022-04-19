import { ChildProcess, spawn } from 'child_process';
import { ipcMain } from 'electron';
import kill from 'tree-kill-promise';
import { execResultDecode, isWin } from './util';

function initEvent() {
  let childProcess: null | ChildProcess = null; // 启动进程
  let childProcessPid: undefined | number; // 启动进程的pid
  // shell vpn开启
  ipcMain.on('vpn-open', async (event, arg) => {
    // cmd执行vpn启动命令
    childProcess = spawn(isWin() ? 'vpn.exe taiyatong' : 'ls', {
      detached: false,
      shell: true,
    });
    // pid记录
    childProcessPid = childProcess.pid;
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
      // kill childProcess及其子进程
      kill(childProcessPid);
      // 清除引用
      childProcess = null;
    } else {
      // childProcess 不存在
      event.reply('vpn-close', 'error! vpn进程不存在!');
    }
  });
}

export default initEvent;
