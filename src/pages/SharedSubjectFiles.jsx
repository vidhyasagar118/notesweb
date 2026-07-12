import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import SubjectCard from "../components/SubjectCard";
import "./SubjectFiles.css";

function SharedSubjectFiles() {
  const {
    groupCode,
    semester,
    subject
  } = useParams();

  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] =
    useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        setLoading(true);

        const res = await API.get(
          `/files/shared/${encodeURIComponent(
            groupCode
          )}`
        );

        const publicFiles =
          res.data?.grouped?.[semester]?.[subject] ||
          [];

        setFiles(publicFiles);
      } catch (err) {
        console.error(
          "Shared files loading error:",
          err
        );

        setFiles([]);
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, [groupCode, semester, subject]);

  const openFile = (file) => {
    const fileUrl =
      file.filepath ||
      file.downloadUrl ||
      file.url;

    setSelectedFile({
      ...file,
      fileUrl
    });
  };

  const closeViewer = () => {
    setSelectedFile(null);
  };

  const getFileCategory = () => {
    if (!selectedFile) return "";

    const type = selectedFile.fileType || "";
    const filename =
      selectedFile.filename?.toLowerCase() || "";

    if (
      type === "application/pdf" ||
      filename.endsWith(".pdf")
    ) {
      return "pdf";
    }

    if (
      type.startsWith("image/") ||
      /\.(jpg|jpeg|png|webp|gif)$/i.test(
        filename
      )
    ) {
      return "image";
    }

    if (
      type.startsWith("video/") ||
      /\.(mp4|avi|mkv|mov)$/i.test(filename)
    ) {
      return "video";
    }

    return "other";
  };

  const fileCategory = getFileCategory();

  return (
    <div className="subjectFilesMain">
      <div className="subjectFilesContainer">
        <div className="subjectFilesHeader">
          <h1 className="subjectFilesTitle">
            {subject}
          </h1>

          <p className="subjectFilesSemester">
            {semester}
          </p>
        </div>

        {loading ? (
          <div className="subjectFilesLoading">
            Loading files...
          </div>
        ) : files.length === 0 ? (
          <div className="subjectFilesEmpty">
            No public files found.
          </div>
        ) : (
          <SubjectCard
            files={files}
            setCurrentPDF={openFile}
          />
        )}

        {selectedFile && (
          <div className="fileViewerOverlay">
            <div className="fileViewerModal">
              <div className="fileViewerHeader">
                <div>
                  <h2 className="fileViewerTitle">
                    {selectedFile.filename}
                  </h2>

                  <p className="fileViewerType">
                    {selectedFile.fileType}
                  </p>
                </div>

                <button
                  type="button"
                  className="fileViewerClose"
                  onClick={closeViewer}
                >
                  ✕
                </button>
              </div>

              <div className="fileViewerContent">
                {fileCategory === "pdf" && (
                  <iframe
                    src={selectedFile.fileUrl}
                    title={selectedFile.filename}
                    className="pdfViewer"
                  />
                )}

                {fileCategory === "image" && (
                  <img
                    src={selectedFile.fileUrl}
                    alt={selectedFile.filename}
                    className="imageViewer"
                  />
                )}

                {fileCategory === "video" && (
                  <video
                    src={selectedFile.fileUrl}
                    className="videoViewer"
                    controls
                    playsInline
                  />
                )}

                {fileCategory === "other" && (
                  <div className="unsupportedFile">
                    <p>
                      Preview available nahi hai.
                    </p>

                    <a
                      href={selectedFile.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="openFileButton"
                    >
                      Open File
                    </a>
                  </div>
                )}
              </div>

              <div className="fileViewerFooter">
                <a
                  href={selectedFile.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="openNewTabButton"
                >
                  Open in New Tab
                </a>

                <button
                  type="button"
                  className="closeViewerButton"
                  onClick={closeViewer}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SharedSubjectFiles;