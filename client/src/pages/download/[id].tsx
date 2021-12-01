import RenderFile from "@components/RenderFile";
import axios from "axios";
import { IFile } from "libs/types";
import { GetServerSidePropsContext, NextPage } from "next";
import fileDownload from "js-file-download";

const File: NextPage<{ file: IFile }> = ({
  file: { format, name, sizeInBytes, id },
}) => {
  const handleDownload = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/files/${id}/download`,
      {
        responseType: "blob",
      }
    );
    fileDownload(data, name);
  };

  return (
    <div className="flex flex-col items-center justify-center py-3 space-y-4 bg-gray-800 rounded-mg shadow-xl w-96">
      {!id ? (
        <span>File you are looking for does not exist. Check the URL.</span>
      ) : (
        <>
          <img
            src="/images/file-download.png"
            alt="downloadfile"
            className="w-16 h-16"
          />
          <h1 className=" text-xl">Your file is ready to be downloaded</h1>
          <RenderFile file={{ format, name, sizeInBytes }} />
          <button onClick={handleDownload} className="button">
            Download
          </button>
        </>
      )}
    </div>
  );
};

export default File;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  let file;
  try {
    const { data } = await axios.get(`http://localhost:8000/api/files/${id}`);
    file = data;
  } catch (error) {
    console.log(error.response.data);
    file = {};
  }

  return {
    props: {
      file,
    },
  };
}
