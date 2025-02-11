import {useState} from 'react';
import {useMedia} from '../hooks/apiHooks';

const Upload = () => {
  const {postMedia} = useMedia();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [inputs, setInputs] = useState({title: '', description: ''});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file.');
      return;
    }
    if (inputs.title.length < 3 || inputs.title.length > 128) {
      setError('Title must be between 3 and 128 characters.');
      return;
    }
    if (inputs.description.length > 1000) {
      setError('Description must be at most 1000 characters.');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const token = localStorage.getItem('token') || '';
      if (!token) {
        setError('Authentication token is missing.');
        return;
      }

      const formData = new FormData();
      formData.append('title', inputs.title);
      formData.append('description', inputs.description);

      const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
      formData.append('filename', sanitizedFileName);
      formData.append('media_type', file.type);
      formData.append('filesize', file.size.toString());
      formData.append('file', file);

      await postMedia(formData, token);
      setSuccess('Upload successful!');
      setInputs({title: '', description: ''});
      setFile(null);
    } catch (error: any) {
      console.error(error.message);
      setError(error.message || 'An error occurred during upload.');
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs({...inputs, [evt.target.name]: evt.target.value});
  };

  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files && evt.target.files.length > 0) {
      setFile(evt.target.files[0]);
    }
  };

  return (
    <div>
      <h1>Upload</h1>
      {uploading && <p>Uploading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {success && <p style={{color: 'green'}}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            value={inputs.title}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            value={inputs.description}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            required
          />
        </div>
        {file && (
          <div>
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              width="200"
              style={{marginTop: '10px'}}
            />
          </div>
        )}
        <button
          type="submit"
          disabled={uploading || !file || inputs.title.length < 3}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default Upload;
