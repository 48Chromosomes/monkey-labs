export const speak = async ({ stream, callback }: { stream: { type: string; data: Buffer }; callback: () => void }) => {
  const audioContext = new AudioContext();

  audioContext.decodeAudioData(new Uint8Array(stream.data).buffer, (decodedBuffer) => {
    // Create a BufferSource and connect it to the AudioContext's destination
    const source = audioContext.createBufferSource();
    source.buffer = decodedBuffer;
    source.connect(audioContext.destination);

    // Start the audio
    source.start();

    // Call the callback function after the audio is finished playing
    source.onended = callback;
  });
};
