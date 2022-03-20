import { ElectronExposeApi } from './types';

declare global {
  interface Window {
    electron: ElectronExposeApi;
  }
}
