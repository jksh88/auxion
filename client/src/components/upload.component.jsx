import React from 'react';

export default function Upload() {
  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [previewSource, setPreviewSource] = useState('');

  const handleFileInputChange = (evt) => {
    const file = evt.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handlesSubmitFile = (evt) => {
    evt.preventDefault();
    if (!selectedFile) return;
    uploadImage(previewSource);
  };

  const uploadImage = (base64EncodedImage) => {
    console.log(base64EncodedImage);
  };

  return (
    <div>
      <h1>Upload</h1>
      <form onSubmit={handlesSubmitFile}>
        <input
          type="file"
          name="image"
          onChange={}
          value={}
          className="form-input"
        />
        <button className="btn" type="button">
          Submit
        </button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: '300px' }} />
      )}
    </div>
  );
}
