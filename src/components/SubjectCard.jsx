import "./subjectcard.css";

function SubjectCard({
  files,
  deleteFile,
  onView,
}) {
  const getFileName = (file) => {
    return (
      file?.displayName ||
      file?.filename ||
      file?.originalName ||
      file?.originalname ||
      "Untitled File"
    );
  };

  return (
    <div className="filesGrid">
      {Array.isArray(files) &&
        files.map((file, index) => (
          <div
            key={
              file._id ||
              `${getFileName(file)}-${index}`
            }
            className="fileCard"
            style={{
              animationDelay: `${
                index * 0.08
              }s`,
            }}
          >
            <h2 className="fileCardName">
              {getFileName(file)}
            </h2>

            <div className="fileButtons">
              <button
                type="button"
                onClick={() =>
                  onView?.(file)
                }
                className="viewButton"
              >
                View
              </button>

              <a
                href={
                  file.downloadUrl ||
                  file.filepath ||
                  file.url
                }
                target="_blank"
                rel="noopener noreferrer"
                className="downloadButton"
              >
                Download
              </a>

              {deleteFile && (
                <button
                  type="button"
                  className="deleteButton"
                  onClick={() =>
                    deleteFile(file._id)
                  }
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default SubjectCard;