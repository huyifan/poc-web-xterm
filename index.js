import {Terminal} from 'xterm'
import {AttachAddon} from 'xterm-addon-attach';

const terminal = new Terminal();
const TERMINAL_PORT=8888
const termDom=document.getElementById('terminal')

let pid,socketURL,webSocket
// Clean terminal
while (termDom.children.length) {
    termDom.removeChild(termDom.children[0]);
}

terminal.open(termDom);
terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')


terminal.onResize((size) => {
    console.log('==hugo Terminal onResize', size)
    //pid不存在或rows小于3的，不做处理
    if (!pid || size.rows < 3) {
        return;
    }

    const cols = size.cols;
    const rows = size.rows;
    const url = 'http://127.0.0.1:' +TERMINAL_PORT + '/terminals/' + pid + '/size?cols=' + cols + '&rows=' + rows
    fetch(url, {method: 'POST'});
})

socketURL = 'ws://127.0.0.1:'+TERMINAL_PORT+'/terminals/';


fetch('http://127.0.0.1:' + TERMINAL_PORT + '/terminals?cols=' + terminal.cols + '&rows=' + terminal.rows, {method: 'POST'})
    .then((res) => {
        res.text().then((processId) => {
            console.log('get processId:',processId)
            pid = processId
            socketURL += processId
            // console.log('aaa:socketURL:', socketURL)
            webSocket = new WebSocket(socketURL);
            //webSocket.onopen = onSocketOpen;
            // webSocket.onclose = onSocketClose
            // webSocket.onerror = onSocketError
            const attachAddon =new AttachAddon(webSocket);
            terminal.loadAddon(attachAddon);
        });
    });
