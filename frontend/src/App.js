import React from 'react';
import FileUploader from './components/FileUploader';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>File Converter</h1>
      </header> */}
      <FileUploader />
    </div>
  );
}

export default App;
