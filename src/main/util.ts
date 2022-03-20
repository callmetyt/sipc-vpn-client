/* eslint import/prefer-default-export: off, import/no-mutable-exports: off */
import { URL } from 'url';
import path from 'path';
import iconv from 'iconv-lite';

export let resolveHtmlPath: (htmlFileName: string) => string;

if (process.env.NODE_ENV === 'development') {
  const port = process.env.PORT || 1212;
  resolveHtmlPath = (htmlFileName: string) => {
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  };
} else {
  resolveHtmlPath = (htmlFileName: string) => {
    return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
  };
}

export const isWin = () => {
  return process.platform === 'win32';
};

export const isMac = () => {
  return process.platform === 'darwin';
};

export const execResultDecode = (data: string) => {
  if (isWin()) {
    return iconv.decode(Buffer.from(data, 'binary'), 'cp936');
  }
  return data;
};
