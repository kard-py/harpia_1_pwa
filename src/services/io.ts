const io = {
  init: (url: string) => {
    return new WebSocket(url);
  },
  onError: (io: WebSocket, callback: (error: any) => void) => {
    io.onerror = callback;
  },
  onOpen: (io: WebSocket, callback: (event: any) => void) => {
    io.onopen = callback;
  },
  onMessage: (io: WebSocket, callback: (event: any) => void) => {
    io.onmessage = callback;
  },
  close: (io: WebSocket) => {
    io.close();
  },
  sendMessage: (io: WebSocket, message:string, callback: (event: any) => void)=>{
    io.send(message)
  }
};

export default io;
