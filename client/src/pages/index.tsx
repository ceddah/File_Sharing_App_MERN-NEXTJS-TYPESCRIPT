import DropzoneComponent from "@components/DropzoneComponent";
import RenderFile from "@components/RenderFile";
import { useState } from "react";
import axios from "axios";
import DownloadFile from "@components/DownloadFile";
import EmailForm from "@components/EmailForm";

export default function Home() {
  const [file, setFile] = useState(null);
  const [id, setId] = useState(null);
  const [downloadPageLink, setDownloadPageLink] = useState(null);
  const [uploadState, setUploadState] = useState<
    "Uploading" | "Upload Failed" | "Uploaded" | "Upload"
  >("Upload");

  const handleUpload = async () => {
    if (uploadState === "Uploading") {
      return;
    }
    setUploadState("Uploading");
    const formdata = new FormData();
    formdata.append("myFile", file);

    try {
      const { data } = await axios({
        method: "post",
        data: formdata,
        url: "api/files/upload",
        headers: {
          "Content-Type": "multipart/formdata",
        },
      });
      setDownloadPageLink(data.downloadPageLink);
      setId(data.id);
    } catch (error) {
      console.log(error.response.data);
      setUploadState("Upload Failed");
    }
  };

  const resetComponent = () => {
    setFile(null);
    setDownloadPageLink(null);
    setUploadState("Upload");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-4 text-3xl font-medium ">
        Got a File? Share it with your friends
      </h1>
      <div className="w-96 flex flex-col items-center bg-gray-800 shadow-xl rounded-xl justify-center ">
        {!downloadPageLink && <DropzoneComponent setFile={setFile} />}
        {file && (
          <RenderFile
            file={{
              format: file.type.split("/")[1],
              name: file.name,
              sizeInBytes: file.size,
            }}
          />
        )}
        {!downloadPageLink && file && (
          <button onClick={handleUpload} className="button">
            {uploadState}
          </button>
        )}
        {downloadPageLink && (
          <div className="p-2 text-center">
            <DownloadFile downloadPageLink={downloadPageLink} />
            <EmailForm id={id} />
            <button className="button" onClick={resetComponent}>
              Upload New File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
