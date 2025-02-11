import {ChangeEvent, useRef, useState} from 'react';
import {useForm} from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/apiHooks';
// import { useNavigate } from 'react-router';

const Upload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  // const navigate = useNavigate();
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const initValues = {
    title: '',
    description: '',
  };

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  const doUpload = async () => {
    setUploading(true);
    console.log(inputs);
    try {
      const token = localStorage.getItem('token');
      if (!file || !token) {
        return;
      }
      // Upload the file to the file server and post metadata to the media API server
      const fileResult = await postFile(file, token);
      await postMedia(fileResult, inputs, token);

      // Optionally, redirect to Home: navigate('/');
      setUploadResult('Media file uploaded!');
      resetForm();
    } catch (e) {
      console.log((e as Error).message);
      setUploadResult((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const {handleSubmit, handleInputChange, inputs, setInputs} = useForm(
    doUpload,
    initValues
  );

  const resetForm = () => {
    setInputs(initValues);
    setFile(null);
    // Clear file input via ref after upload
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-gray-900 p-6 text-white shadow-lg">
      <h1 className="mb-6 text-center text-3xl font-bold">Upload</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-1 font-medium">
            Title
          </label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            value={inputs.title}
            className="rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-stone-500 focus:outline-none"
          />
        </div>
        {/* Description Field */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 font-medium">
            Description
          </label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            value={inputs.description}
            className="rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-stone-500 focus:outline-none"
          ></textarea>
        </div>
        {/* File Input */}
        <div className="flex flex-col">
          <label htmlFor="file" className="mb-1 font-medium">
            File
          </label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            ref={fileRef}
            className="file:mr-4 file:rounded file:border-0 file:bg-stone-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-stone-700"
          />
        </div>
        {/* Preview */}
        <div className="flex justify-center">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://place-hold.it/200?text=Choose+image'
            }
            alt="preview"
            className="h-48 w-48 rounded object-cover"
          />
        </div>
        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={
              !(
                file &&
                inputs.title.length > 3 &&
                inputs.description.length > 0
              )
            }
            className="flex-1 rounded bg-stone-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="flex-1 rounded bg-gray-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700"
          >
            Reset
          </button>
        </div>
        {/* Upload Result */}
        {uploadResult && (
          <p className="mt-4 text-center text-sm text-green-400">
            {uploadResult}
          </p>
        )}
      </form>
    </div>
  );
};

export default Upload;
