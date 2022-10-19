
import { io } from "socket.io-client";


const connectToPrinter = (host, port, buffer) => {
  return new Promise((resolve, reject) => {
    const socket = io('http://192.168.0.5');
    console.log(socket)

/*
    console.log(Net)
    let device = new Net.Socket();

    device.on('close', () => {
      if(device) {
        device.destroy()
        device = null
      }
      resolve(true)
    })
    device.on('error', reject)
    device.connect(port, host, () => {
      device.write(buffer)
      device.emit('close')
    })*/
  })
}
module.exports = connectToPrinter;