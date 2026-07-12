import "./subjectcard.css";

function SubjectCard({
  files,
  deleteFile,
  setCurrentPDF
}) {
  const handleView = (file) => {
    if (setCurrentPDF) {
      setCurrentPDF(file);
    }
  };

  return (
    <div className="filesGrid">
      {Array.isArray(files) &&
        files.map((file, index) => (
          <div
            key={file._id}
            className="fileCard"
            style={{
              animationDelay: `${index * 0.08}s`
            }}
          >
            <h2>{file.filename}</h2>

            <div className="fileButtons">
              <button
                type="button"
                onClick={() => handleView(file)}
                className="viewButton"
              >
                View
              </button>

              <a
                href={
                  file.downloadUrl ||
                  file.filepath
                }
                target="_blank"
                rel="noopener noreferrer"
                className="downloadLink"
              >
                <button
                  type="button"
                  className="downloadButton"
                >
                  Download
                </button>
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