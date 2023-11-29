import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
  }

  interface Video {
    filename: string
    format_name: string
    width: number
    height: number
    size: number
    duration: number
    codec: string
    videoBitrate: string
    audioBitrate: string
    channels: number
  }

  interface Params {
    filePath: string
    width: number
    height: number
    ratio: number
    start: number
    end: number
    videoBitrate: string
    audioBitrate: string
    channels: number
  }
}
