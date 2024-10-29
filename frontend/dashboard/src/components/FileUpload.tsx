import React, { useState, ChangeEvent, FormEvent } from 'react';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    const csrfToken = getCookie('csrftoken');

    try {
      const response = await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
      },
        body: formData,
      });
      

      if (response.ok) {
        setMessage('File uploaded and data processed successfully!');
      } else {
        setMessage('Failed to upload file.');
      }
    } catch (error) {
      setMessage(`${error},An error occurred while uploading the file.`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleUpload} className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Dataset</h2>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
        <button
          type="submit"
          className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Upload
        </button>
        {message && (
          <p className="mt-4 text-center text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
};

export default FileUpload;
