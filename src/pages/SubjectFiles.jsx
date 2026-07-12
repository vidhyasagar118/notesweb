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
      // Prop available ho tabhi call hoga
      if (
        typeof setCurrentPDF === "function"
      ) {
        setCurrentPDF(null);
      }
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

        if (
          typeof setCurrentPDF ===
          "function"
        ) {
          setCurrentPDF(null);
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

    const fileType = (
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
      /\.(jpg|jpeg|png|webp|gif|bmp|svg)$/i.test(
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

    return "other";
  };

  const openFile = (file) => {
    const fileUrl = getFileUrl(file);
    const fileCategory =
      getFileCategory(file);

    if (!fileUrl) {
      alert("File URL nahi mila.");
      console.error(
        "Missing file URL:",
        file
      );
      return;
    }

    const preparedFile = {
      ...file,
      fileUrl,
      displayTitle: getFileName(file),
      detectedCategory: fileCategory,
    };

    // Pehle modal open karo
    setSelectedFile(preparedFile);

    // AI ko sirf PDF URL bhejo
    if (
      typeof setCurrentPDF ===
      "function"
    ) {
      if (fileCategory === "pdf") {
        setCurrentPDF(fileUrl);
      } else {
        setCurrentPDF(null);
      }
    }
  };

  const closeViewer = () => {
    setSelectedFile(null);

    if (
      typeof setCurrentPDF === "function"
    ) {
      setCurrentPDF(null);
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
            No files found in this
            subject.
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
                  aria-label="Close viewer"
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
                  "other" && (
                  <div className="unsupportedFile">
                    <div className="unsupportedIcon">
                      📁
                    </div>

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