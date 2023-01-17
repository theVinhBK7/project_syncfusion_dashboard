import React, { Component, useState } from "react";
import AudioAnalyser from "react-audio-analyser";
import axios from "axios";
import { Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

function AudioRecorder() {

  const [status, setStatus] = useState("");
  const [audioType, setAudioType] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const { currentColor, currentMode } = useStateContext();

  const controlAudio = (value) => {
    setStatus(value);
  }

  const changeScheme = (e) => {
    console.log(e)
    setAudioType(e.target.value);
  }

  const componentDidMount = (e) => {
    setAudioType("audio/wav");
  }

  const audioProps = {
    audioType,
    status,
    audioSrc,
    timeslice: 1000,
    startCallback: (e) => {
      console.log("succ start", e);
    },
    pauseCallback: (e) => {
      console.log("succ pause", e);
    },
    stopCallback: (e) => {
      console.log("succ stop", e);
      setAudioSrc(window.URL.createObjectURL(e));

      var wavefilefromblob = new File([e], 'test0117.wav');
      var formData = new FormData();

      formData.append("file", wavefilefromblob);
      formData.append("token", "2qx7bwae6l6x08m0yz7xwhtjqvisb3be7xberhl6ky7t6rd586");
      axios.post('http://10.91.13.139:9090/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

    },
    onRecordCallback: (e) => {
      console.log("recording", e);
    },
    errorCallback: (err) => {
      console.log("error", err);
    }
  };

  return (
    <div>
      <AudioAnalyser {...audioProps}>
        <div className="btn-box">
          <div onClick={() => controlAudio("recording")}>
            <Button
              color="white"
              bgColor={currentColor}
              text="Start"
              borderRadius="10px"
            />
          </div>

          <div onClick={() => controlAudio("paused")}>
            <Button
              color="white"
              bgColor={currentColor}
              text="Pause"
              borderRadius="10px"
            />
          </div>

          <i onClick={() => controlAudio("inactive")}>
            <Button
              color="white"
              bgColor={currentColor}
              text="Stop"
              borderRadius="10px"
            />
          </i>

        </div>
      </AudioAnalyser>
      <p>choose output type</p>
      <select
        name=""
        id=""
        onChange={e => changeScheme(e)}
        value={audioType}
      >
        <option value="audio/webm">audio/webm（default）</option>
        <option value="audio/wav">audio/wav</option>
        <option value="audio/mp3">audio/mp3</option>
      </select>
    </div>
  )
}

export default AudioRecorder