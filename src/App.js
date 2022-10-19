import logo from './logo.svg';
import './App.css';
// import { client as Cl } from "websocket";
// import { io } from "socket.io-client";
// import connectToPrinter from './connectToPrinter'
import { EscPos } from '@tillpos/xml-escpos-helper'

const printer = {
  device_name: '3nStar',
  host: '192.168.0.5',
  port: '9100',
}



const connectToPrinter = (host, port, buffer) => {
  let client = new WebSocket(`ws://${printer.host}:${printer.port}`)

      client.onopen = () => {
        console.log('WebSocket Client Connected');
      };
      client.onmessage = (message) => {
        console.log(message);
      };
      client.onerror = (message) => {
        console.log('error', message);
      };
      client.onclose = function (event) {
              console.log(event)
              alert(event.code);
      }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <form>
          <input type="button" value="Print test" onClick={async () => {
            const template = `<?xml version="1.0" encoding="UTF-8"?>
<document>
    <align mode="center">
        <text-line size="2:0">{{title}}</text-line>
    </align>
    <line-feed/>
    <align mode="right">
        <text-line size="1:0">{{date}}</text-line>
    </align>
    <align mode="left">
        <text-line size="1:0">{{to}}</text-line>
    </align>
    <line-feed/>
    <paper-cut/>
</document>`

            const data = {
              title: 'Test impresión',
              date: '2022-10-19',
              to: 'example'
            }

            const message = EscPos.getBufferFromTemplate(template, data)

            try {
              connectToPrinter(printer.host, printer.port, message)

            } catch (err) {
              console.log('some error', err)
            }
          }}/>
        </form>
      </header>
    </div>
  );
}

export default App;
