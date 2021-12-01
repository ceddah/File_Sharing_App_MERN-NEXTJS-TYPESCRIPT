import { useDropzone } from "react-dropzone";
import { useCallback, Dispatch } from "react";

const DropzoneComponent: React.FC<{ setFile: Dispatch<any> }> = ({
  setFile,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: "image/jpeg,image/png,audio/mpeg",
    });

  return (
    <div className="p-4 w-full">
      <div
        {...getRootProps()}
        className="h-80 w-full rounded-md cursor-pointer focus:outline-none"
      >
        <input {...getInputProps()} />
        <div
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-full space-y-3 ${
            isDragReject === true
              ? "border-red-500"
              : isDragAccept === true
              ? "border-green-500"
              : "border-yellow-light"
          }`}
        >
          <img src="/images/folder.png" alt="folder" className="h-16 w-16" />
          {isDragReject ? (
            <p className="text-center">
              Sorry, this app only supports images and mp3 files.
            </p>
          ) : (
            <>
              <p>Drag and Drop the file from here</p>
              <p className="mt-2 text-base text-gray-300">
                Only jpeg, png, mp3 files are supported
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropzoneComponent;
