import client from "../../config/client";
import QRCode from "qrcode";
import { sendWeatherForecast, sendOption, sendMorningCall, sendSeragam } from "../../controller/message";

 const connectEvent = (socket:any) => {
  socket.emit('message', 'Connecting...');

  client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    QRCode.toDataURL(qr, (err, url) => {
      socket.emit('qr', url);
      socket.emit('message', 'QR Code received, scan please!');
    });
  });

  client.on('ready', () => {
    socket.emit('ready', 'Whatsapp is ready!');
    socket.emit('message', 'Whatsapp is ready!');
  });

  client.on('authenticated', () => {
    socket.emit('authenticated', 'Whatsapp is authenticated!');
    socket.emit('message', 'Whatsapp is authenticated!');
    console.log('AUTHENTICATED');
  });

  client.on('auth_failure', (session) => {
    socket.emit('message', 'Auth failure, restarting...');
  });

  client.on('message', message => {
    if (message.body === '1') {
      return sendMorningCall(message.from);
    }
    if (message.body === '2') {
      return sendSeragam(message.from);
    }
    if (message.body === '3') {
      return sendWeatherForecast(message.from);
    }
    return sendOption(message.from);
  });


  client.on('disconnected', (reason) => {
    socket.emit('message', 'Whatsapp is disconnected!');
    client.destroy();
    client.initialize().catch((err)=>{
      console.log(err)
    });
  });
}

export {connectEvent};