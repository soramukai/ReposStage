import { menuTemplate } from './config'
import { app,Menu,BrowserWindow, dialog } from 'electron'
import { allowFormats } from './setting'
import ffmpeg from 'fluent-ffmpeg';
import path from 'node:path'
class ffmpegControl{
    filePath
    isDev
    VITE_DEV_SERVER_URL
    output
    constructor(){

    }

    async select(){ 
        const fileType = 'video'
        const { canceled, filePaths } = await dialog.showOpenDialog({
        filters: [{ name: fileType, extensions: allowFormats }]
        })
        this.filePath=filePaths[0];
        if (!canceled) {
        return filePaths[0]
      }

      
    }


    async read(){ 
        const menu = Menu.buildFromTemplate(menuTemplate)
        console.log("A")
        return new Promise((resolve, reject) => {
            console.log("B")
            console.log(this.filePath)
            ffmpeg(this.filePath).ffprobe(
              (err: any, data: { format: any; streams: any }) => {
                if (err) return reject(err)
                console.log("C")
        
                const { format, streams } = data
                console.log("D")
                const { format_name, duration, size, bit_rate } = format
                console.log("E")
                let audioBitrate = bit_rate,
                  videoBitrate = bit_rate,
                  codec = '',
                  width = 0,
                  height = 0,
                  channels = 1
                  console.log("F")
                const video = streams.find(
                  (item: { codec_type: string }) => item.codec_type === 'video'
                )
                console.log("G")
                if (video) {
                  width = video.width
                  height = video.height
                  codec = video.codec_name
                  videoBitrate = Math.round(video.bit_rate / 1000) + 'k'
                }
                console.log("H")
                const audio = streams.find(
                  (item: { codec_type: string }) => item.codec_type === 'audio'
                )
                console.log("I")
                if (audio) {
                  audioBitrate = Math.round(audio.bit_rate / 1000) + 'k'
                  channels = audio.channels
                  codec += `/${audio.codec_name}`
                }
                console.log("J")
                // enabled saveFile menu item
                menu!.getMenuItemById('saveFile')!.enabled = true
                console.log("K")
                resolve({
                  filename: path.parse(this.filePath).name,
                  format_name,
                  width,
                  height,
                  size,
                  duration,
                  videoBitrate,
                  audioBitrate,
                  codec,
                  channels
                })
                console.log("L")
              }
            )
          })
    }


    async convert(_event: any,{filePath,width,height,ratio,start,end,videoBitrate,audioBitrate,channels}: Params){
        this.VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
        console.log("1")
        this.isDev = VITE_DEV_SERVER_URL?.length > 0;
        console.log("2")
        this.output = this.isDev? 'temp.mp4': path.join(app.getPath('temp'), `${app.getName()}_temp.mp4`)
        console.log("3")
        return new Promise((resolve, reject) => {
            ffmpeg(filePath)
              .outputOptions([`-ss ${start}`, `-to ${end}`])
              // set video bitrate
              .videoBitrate(videoBitrate)
              // set target codec
              .videoCodec('libx264')
              // set audio bitrate
              .audioBitrate(audioBitrate)
              // set audio codec
              .audioCodec('libmp3lame')
              // set number of audio channels
              .audioChannels(channels)
              .size(`${ratio * 100}%`)
              // set custom option
              // set output format to force
              .format('mp4')
              // save to file
              .save(this.output)
              // setup event handlers
              .on('progress', (progress: { percent: number }) => {
                const percent = Math.floor(progress.percent)
                console.log("4")
                console.log(`Processing: ${percent} % done`)
              })
              .on('end', () => {
                console.log("5")
                console.log('file has been converted succesfully')
                this.createPreview({
                  width,
                  height
                })
                console.log("6")
                resolve(this.output)
              })
              .on('error', (err: any) => reject(err))
          })
    }


    async createPreview ({ width = 640, height = 360 }) {
        const win = new BrowserWindow({
          width: width + 16,
          height: height + 88,
          webPreferences: {
            preload: path.join(__dirname, 'preview.js')
          }
        })
        if (this.isDev) {
            await win.loadURL(path.posix.join(this.VITE_DEV_SERVER_URL, 'preview.html'))
          } else {
            await win.loadFile(path.join(process.env.DIST, 'preview.html'))
          }
        
          win.webContents.send('video:preview', {
            filePath: this.output,
            width,
            height
          })
          win.removeMenu()
    }

}export {ffmpegControl}