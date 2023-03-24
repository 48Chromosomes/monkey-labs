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
    console.log('Outgoing message:', message);
    socket.send(message);
  }
};

socket.onmessage = (event: MessageEvent) => {
  console.log('Incoming message:', event.data);
};
