import React, {useState} from 'react';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { Header } from '../components';
import axios from 'axios';
import AudioRecorder from './AudioRecorder';


function Record() {
  
  // const addAudioElement = (blob) => {

  // }
  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="App" title="Record" />
    <AudioRecorder/>
    <br/>
    <div id="audio-list"></div>
    <RichTextEditorComponent>
      <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
    </RichTextEditorComponent>
  </div>
  )
}

export default Record