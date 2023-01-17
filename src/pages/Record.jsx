import React, {useState} from 'react';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { Header } from '../components';
import { AudioRecorder } from 'react-audio-voice-recorder';


function Record() {
  
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    const audioListElement = document.getElementById('audio-list')
    audio.src = url;
    audio.controls = true;
    audioListElement.appendChild(audio);
  }
  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="App" title="Record" />
    <AudioRecorder onRecordingComplete={addAudioElement} />
    <br/>
    <div id="audio-list"></div>
    <RichTextEditorComponent>
      <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
    </RichTextEditorComponent>
  </div>
  )
}

export default Record