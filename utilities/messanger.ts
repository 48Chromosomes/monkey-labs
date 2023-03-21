const WebSocket = typeof window !== 'undefined' ? window.WebSocket : require('ws');

export const socket = new WebSocket('ws://localhost:8000');

socket.onopen = () => {
  console.log('WebSocket connected');
};

socket.onerror = (error: Error) => {
  console.error('WebSocket error:', error);
};

export const send = ({ message }: { message: string }) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  }
};

export const listen = (listener: string, callback: () => void) => {
  socket.onmessage = (event: any) => {
    if (event.data === listener) callback();
  };
};
