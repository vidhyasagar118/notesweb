import "./subjectcard.css";

function SubjectCard({ files, deleteFile }) {
    return (
        <div className="filesGrid">
            {Array.isArray(files) && files.map((file, index) => (
                <div
                    key={file._id}
                    className="fileCard"
                    style={{ animationDelay: `${index * 0.08}s` }}
                >
                    <h2>{file.filename}</h2>

                    <div className="fileButtons">

                        {/* ✅ FINAL VIEW FIX */}
                        <button
                            onClick={() =>
                                window.open(
                                    file.filepath + "#toolbar=0",
                                    "_blank"
                                )
                            }
                            className="viewButton"
                        >
                            View
                        </button>

                        {/* ✅ DOWNLOAD */}
                        <a href={file.downloadUrl}>
                            <button className="downloadButton">
                                Download
                            </button>
                        </a>

                        {/* ✅ DELETE */}
                        {deleteFile && (
                            <button
                                className="deleteButton"
                                onClick={() => deleteFile(file._id)}
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