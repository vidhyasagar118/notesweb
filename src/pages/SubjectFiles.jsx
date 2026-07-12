import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import SubjectCard from "../components/SubjectCard";
import "./SubjectFiles.css";

function SubjectFiles({ setCurrentPDF }) {
  const { semester, subject } = useParams();

  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadFiles = async () => {
    try {
      setLoading(true);

      const res = await API.get("/files/myfiles");

      const semesterFiles = res.data?.[semester] || {};
      const subjectFiles = semesterFiles?.[subject] || [];

      setFiles(subjectFiles);
    } catch (err) {
      console.error("Files loading error:", err);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, [semester, subject]);

  useEffect(() => {
    return () => {
      setCurrentPDF(null);
    };
  }, [setCurrentPDF]);

  const deleteFile = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this file?"
    );

    if (!confirmed) return;

    try {
      await API.delete(`/files/${id}`);

      if (selectedFile?._id === id) {
        setSelectedFile(null);
        setCurrentPDF(null);
      }

      await loadFiles();
    } catch (err) {
      console.error("Delete error:", err);

      alert(
        err.response?.data?.message ||
          "File delete nahi ho payi"
      );
    }
  };

  const openFile = (file) => {
    const fileUrl =
      file.filepath ||
      file.downloadUrl ||
      file.url;

    const fileType = file.fileType || "";

    setSelectedFile({
      ...file,
      fileUrl,
      fileType
    });

    // AI ko sirf PDF URL bhejo
    if (fileType === "application/pdf") {
      setCurrentPDF(fileUrl);
    } else {
      setCurrentPDF(null);
    }
  };

  const closeViewer = () => {
    setSelectedFile(null);
    setCurrentPDF(null);
  };

  const getFileCategory = () => {
    if (!selectedFile) return "";

    const type = selectedFile.fileType || "";
    const name = selectedFile.filename?.toLowerCase() || "";

    if (
      type === "application/pdf" ||
      name.endsWith(".pdf")
    ) {
      return "pdf";
    }

    if (
      type.startsWith("image/") ||
      /\.(jpg|jpeg|png|webp|gif)$/i.test(name)
    ) {
      return "image";
    }

    if (
      type.startsWith("video/") ||
      /\.(mp4|avi|mkv|mov)$/i.test(name)
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
            No files found in this subject.
          </div>
        ) : (
          <SubjectCard
            files={files}
            deleteFile={deleteFile}
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
                  >
                    Your browser does not support video.
                  </video>
                )}

                {fileCategory === "other" && (
                  <div className="unsupportedFile">
                    <p>
                      Is file ka preview available nahi hai.
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

export default SubjectFiles;