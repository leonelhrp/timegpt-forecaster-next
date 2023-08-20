import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Badge } from "@tremor/react";
import { UploadCSVProps } from '@/types/file';

export const UploadCSV: React.FC<UploadCSVProps> = ({ onDone, title, subtitle, exampleLink }) => {
  const [loading, setLoading] = useState(false);
  const [fileWarning, setFileWarning] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDropRejected = () => {
    setFileWarning('Only CSV files are allowed.');
  };

  const onDrop = async (acceptedFiles: File[]) => {
    try {
      setLoading(true);
      setFileWarning('');

      const data = acceptedFiles[0];

      setSelectedFile(data);
      setLoading(false);
      onDone(data);
    } catch (e) {
      console.error(e);
    }
  }


  const { getRootProps, getInputProps } = useDropzone({
    onDrop, onDropRejected, accept: {
      "text/csv": [".csv"]
    }
  });

  return (
    <div className="flex flex-col">
      <p className="font-bold">{title}</p>
      {exampleLink ? (
        <a href={exampleLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          {subtitle}
        </a>
      ) : (
        <p>{subtitle}</p>
      )}
      <div>
        <div {...getRootProps()} className="mt-2 sm:col-span-2 ">
          <div className="flex flex-col items-center m justify-center px-6 pt-2 pb-2 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {loading ? (
                <div className="h-12 text-center">
                  Cargando...
                </div>
              ) : (
                <>
                  <div className="flex text-sm items-center text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium  focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span className="font-bold underline">
                        Upload a file
                      </span>
                      <input
                        {...getInputProps()}
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".csv"
                      />
                    </label>
                    <p className="pl-1">Or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">Limit 200MB per file CSV</p>
                  {selectedFile && (
                    <Badge>{selectedFile.name}</Badge>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {fileWarning && (
          <aside
            role="alert"
            className="flex w-full justify-center mt-4 text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600"
          >
            {fileWarning}
          </aside>
        )}
      </div>
    </div>
  )
}
