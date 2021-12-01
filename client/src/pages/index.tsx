import DropzoneComponent from "@components/DropzoneComponent";
import RenderFile from "@components/RenderFile";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  console.log(file);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-4 text-3xl font-medium ">
        Got a File? Share it with your friends
      </h1>
      <div className="w-96 flex flex-col items-center bg-gray-800 shadow-xl rounded-xl justify-center ">
        <DropzoneComponent setFile={setFile} />
        {file && (
          <RenderFile
            file={{
              format: file.type.split("/")[1],
              name: file.name,
              sizeInBytes: file.size,
            }}
          />
        )}
      </div>
    </div>
  );
}
