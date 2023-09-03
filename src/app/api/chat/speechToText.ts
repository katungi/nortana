import { Configuration, OpenAIApi } from 'openai';
import { exec } from 'child_process';
import fs from 'fs';
import { NextResponse } from 'next/server';
import FormData from 'form-data';

// Promisify the Exec function from child_process
const util = require('util');
const execAsync = util.promisify(exec);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  if (!configuration.apiKey) {
    return new NextResponse('OpenAI API Key not found', { status: 500 });
  }

  // get the req body
  const req = await request.json();
  // extract the audio data from the request body
  const base64Audio = req.audio;

  const audio = Buffer.from(base64Audio, 'base64');

  try {
    // convert the audio to text
    const text = await convertAudioToText(audio);
    return NextResponse.json({ result: text }, { status: 200 });
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return NextResponse.json({ error: error.response.data }, { status: 500 });
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return NextResponse.json(
        { error: 'An error occurred during your request.' },
        { status: 500 }
      );
    }
  }
}

// This function converts audio data to text using the OpenAI API
async function convertAudioToText(audioData: any) {
  // Convert the audio data to MP3 format
  const mp3AudioData = await convertAudioToMp3(audioData);
  // Write the MP3 audio data to a file
  const outputPath: any = '/tmp/output.mp3';
  fs.writeFileSync(outputPath, mp3AudioData);

  // Transcribe the audio
  const response = await openai.createTranscription(
    fs.createReadStream(outputPath) as unknown as File,
    'whisper-1'
  );
  console.log('Response:', response.data)
  // Delete the temporary file
  fs.unlinkSync(outputPath);
  // The API response contains the transcribed text
  const transcribedText = response.data.text;
  console.log('Transcribed text:', transcribedText)
  return transcribedText;
}
// This function converts audio data to MP3 format using ffmpeg
async function convertAudioToMp3(audioData: any) {
  // Write the audio data to a file
  const inputPath = '/tmp/input.webm';
  fs.writeFileSync(inputPath, audioData);
  // Convert the audio to MP3 using ffmpeg
  const outputPath = '/tmp/output.mp3';
  await execAsync(`ffmpeg -i ${inputPath} ${outputPath}`);
  // Read the converted audio data
  const mp3AudioData = fs.readFileSync(outputPath);
  // Delete the temporary files
  fs.unlinkSync(inputPath);
  fs.unlinkSync(outputPath);
  return mp3AudioData;
}
