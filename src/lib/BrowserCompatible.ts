import { useSpeechRecognition } from 'react-speech-recognition';

export const isBrowserCompatible = () => {
  const { browserSupportsSpeechRecognition } = useSpeechRecognition();
  return browserSupportsSpeechRecognition;
};
