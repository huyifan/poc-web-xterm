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

socketURL = 'ws://127.0.0.1:'+TERMINAL_PORT+'/terminals/';

//向node服务发送初始化请求，返回processId
fetch('http://127.0.0.1:' + TERMINAL_PORT + '/terminals?cols=' + terminal.cols + '&rows=' + terminal.rows, {method: 'POST'})
    .then((res) => {
        res.text().then((processId) => {
            console.log('get processId:',processId)
            pid = processId
            socketURL += processId
            console.log('open webSocket URL:', socketURL)
            webSocket = new WebSocket(socketURL);
            //webSocket.onopen = onSocketOpen;
            // webSocket.onclose = onSocketClose
            // webSocket.onerror = onSocketError

            //此段代码必须要有，通过插件，来接收渲染node服务返回的数据
            const attachAddon =new AttachAddon(webSocket);
            terminal.loadAddon(attachAddon);
        });
    });

//当terminal的大小发生变化时，重新resize
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
