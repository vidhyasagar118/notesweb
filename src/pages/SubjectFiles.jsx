import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import SubjectCard from "../components/SubjectCard";
import "./SubjectFiles.css";

function SubjectFiles({ setCurrentFile }) {
  const { semester, subject } = useParams();

  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] =
    useState(null);
  const [loading, setLoading] = useState(true);

  const loadFiles = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        "/files/myfiles"
      );

      const semesterFiles =
        res.data?.[semester] || {};

      const subjectFiles =
        semesterFiles?.[subject] || [];

      setFiles(
        Array.isArray(subjectFiles)
          ? subjectFiles
          : []
      );
    } catch (err) {
      console.error(
        "Files loading error:",
        err
      );

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
      if (
        typeof setCurrentFile === "function"
      ) {
        setCurrentFile(null);
      }
    };
  }, [setCurrentFile]);

  const deleteFile = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this file?"
    );

    if (!confirmed) return;

    try {
      await API.delete(`/files/${id}`);

      if (selectedFile?._id === id) {
        setSelectedFile(null);

        if (
          typeof setCurrentFile ===
          "function"
        ) {
          setCurrentFile(null);
        }
      }

      await loadFiles();
    } catch (err) {
      console.error(
        "Delete error:",
        err
      );

      alert(
        err.response?.data?.message ||
          "File delete nahi ho payi"
      );
    }
  };

  const getFileUrl = (file) => {
    return (
      file?.filepath ||
      file?.downloadUrl ||
      file?.secureUrl ||
      file?.url ||
      ""
    );
  };

  const getFileName = (file) => {
    return (
      file?.displayName ||
      file?.filename ||
      file?.originalName ||
      file?.originalname ||
      "Untitled File"
    );
  };

  const getOriginalFileName = (file) => {
    return (
      file?.originalName ||
      file?.originalname ||
      file?.filename ||
      file?.displayName ||
      ""
    );
  };

  const getFileCategory = (file) => {
    if (!file) return "other";

    const fileType = String(
      file.fileType ||
        file.mimetype ||
        file.mimeType ||
        ""
    ).toLowerCase();

    const fileName =
      getOriginalFileName(file).toLowerCase();

    if (
      fileType.includes("pdf") ||
      fileName.endsWith(".pdf")
    ) {
      return "pdf";
    }

    if (
      fileType.startsWith("image/") ||
      /\.(jpg|jpeg|png|webp|gif)$/i.test(
        fileName
      )
    ) {
      return "image";
    }

    if (
      fileType.startsWith("video/") ||
      /\.(mp4|avi|mkv|mov|webm)$/i.test(
        fileName
      )
    ) {
      return "video";
    }

    if (
  fileType.startsWith("audio/") ||
  /\.(mp3|wav|m4a|ogg|aac|flac)$/i.test(
    fileName
  )
) {
  return "audio";
}
    return "other";
  };

  const openFile = (file) => {
    const fileUrl = getFileUrl(file);
    const fileCategory =
      getFileCategory(file);

    if (!fileUrl) {
      alert("File URL nahi mila.");
      return;
    }

    const displayTitle =
      getFileName(file);

    const preparedFile = {
      ...file,
      fileUrl,
      displayTitle,
      detectedCategory: fileCategory,
    };

    setSelectedFile(preparedFile);

    if (
      typeof setCurrentFile === "function"
    ) {
      setCurrentFile({
        url: fileUrl,
        category: fileCategory,
        mimeType:
          file.fileType ||
          file.mimetype ||
          file.mimeType ||
          "",
        name: displayTitle,
        originalName:
          getOriginalFileName(file),
        fileSize: file.fileSize || 0,
      });
    }
  };

  const closeViewer = () => {
    setSelectedFile(null);

    if (
      typeof setCurrentFile === "function"
    ) {
      setCurrentFile(null);
    }
  };

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
            onView={openFile}
          />
        )}

        {selectedFile && (
          <div
            className="fileViewerOverlay"
            onClick={closeViewer}
          >
            <div
              className="fileViewerModal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <div className="fileViewerHeader">
                <div className="fileViewerHeading">
                  <h2 className="fileViewerTitle">
                    {
                      selectedFile.displayTitle
                    }
                  </h2>

                  <p className="fileViewerType">
                    {selectedFile.fileType ||
                      selectedFile.mimetype ||
                      selectedFile.mimeType ||
                      selectedFile.detectedCategory}
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
                {selectedFile.detectedCategory ===
                  "pdf" && (
                  <iframe
                    src={`${selectedFile.fileUrl}#toolbar=1`}
                    title={
                      selectedFile.displayTitle
                    }
                    className="pdfViewer"
                  />
                )}

                {selectedFile.detectedCategory ===
                  "image" && (
                  <img
                    src={
                      selectedFile.fileUrl
                    }
                    alt={
                      selectedFile.displayTitle
                    }
                    className="imageViewer"
                  />
                )}

                {selectedFile.detectedCategory ===
                  "video" && (
                  <video
                    src={
                      selectedFile.fileUrl
                    }
                    className="videoViewer"
                    controls
                    playsInline
                  >
                    Your browser does not
                    support video.
                  </video>
                )}
{selectedFile.detectedCategory ===
  "audio" && (
  <div className="audioViewerWrapper">
    <div className="audioViewerIcon">
      🎵
    </div>

    <h3>
      {selectedFile.displayTitle}
    </h3>

    <audio
      src={selectedFile.fileUrl}
      className="audioViewer"
      controls
      preload="metadata"
    >
      Your browser does not support audio.
    </audio>
  </div>
)}
                {selectedFile.detectedCategory ===
                  "other" && (
                  <div className="unsupportedFile">
                    <p>
                      Is file ka preview
                      available nahi hai.
                    </p>

                    <a
                      href={
                        selectedFile.fileUrl
                      }
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
                  href={
                    selectedFile.fileUrl
                  }
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