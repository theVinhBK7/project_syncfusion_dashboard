import React, {useState} from 'react';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { Header } from '../components';
import axios from 'axios';
import AudioRecorder from './AudioRecorder';
import { useStateContext } from '../contexts/ContextProvider';
import Message from '../components/Message';


function Record() {
  
  const { currentColor, currentMode } = useStateContext();
  const [messages, setMessages] = useState([]);

  console.log(messages)
  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="App" title="Record" />
    <AudioRecorder currentColor={currentColor} setMessages={setMessages} messages={messages}/>
    <br/>
    <div className="messages">
      {messages.map((m) => (
        <Message message={m}/>
      ))}
    </div>
    {/* <RichTextEditorComponent>
      <div id="text-response">{textResponse}</div>
      <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
    </RichTextEditorComponent> */}
  </div>
  )
}

export default Record