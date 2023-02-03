import React, {useState, useEffect} from 'react';
import { Header, Button} from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import Message from '../components/Message';
import { speechToText } from '../apis/api';

function Upload() {
  const [messages, setMessages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState("");
  const [progress, setProgress] = useState([]);
  const [uploadMessage, setUploadMessage] = useState([]);
  const { currentColor } = useStateContext();
  const userToken = localStorage.getItem("accessToken");

  function selectFile(event) {
    setSelectedFiles(event.target.files);
  }

  function upload() {
    let currentFile = selectedFiles[0];

    setProgress(0);
    setCurrentFile(currentFile);

    let formData = new FormData();

    formData.append("file", currentFile);
    formData.append("token", userToken);
    formData.append("enable_lm", 1);
    formData.append("denoise", 0);
    formData.append("keyframe", 0);
    formData.append("model", " ");

    speechToText(formData, userToken)
      .then((response) => {
        // setUploadMessage(response.data.message);
          // console.log(response);
          setMessages(messages => (
            [...messages, response.Result]
            ));
        // return uploadFilesService.getFiles();
      })
      .then((files) => {
        // setFileInfos(files.data);
      })
      .catch(() => {
        setProgress(0);
        setUploadMessage("Could not upload the file!");
        setCurrentFile(undefined);
      });

    setSelectedFiles(undefined);
  }
  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    <Header category="App" title="Upload" />
    <div>
        {/* {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )} */}

        <label style={{backgroundColor:"#EDF7F9"}}>
          <input type="file" onChange={(event) => selectFile(event)} />
        </label>

        <div onClick={upload} style={{padding:"10px"}}>
          <Button
            color="white"
            bgColor={currentColor}
            text="Upload"
            borderRadius="10px"
            disabled={!selectedFiles}
          />
        </div>

        <div className="alert alert-light" role="alert">
          {uploadMessage}
        </div>

        {/* <div className="card">
          <div className="card-header">List of Files</div>
          <ul className="list-group list-group-flush">
            {fileInfos &&
              fileInfos.map((file, index) => (
                <li className="list-group-item" key={index}>
                  <a href={file.url}>{file.name}</a>
                </li>
              ))}
          </ul>
        </div> */}
      </div>
    <br/>
    <div className="messages">
      {messages.map((m) => (
        <Message message={m}/>
      ))}
    </div>
  </div>
  )
}

export default Upload