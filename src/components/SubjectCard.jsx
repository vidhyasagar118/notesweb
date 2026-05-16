import "./subjectcard.css";

function SubjectCard({ files, deleteFile }) {

    const getFileUrl = (filepath) => {

        if (!filepath) return "#";

        return filepath;
    };

    return (

        <div className="filesGrid">

            {
                Array.isArray(files) && files.map((file, index) => (

                    <div
                        key={file._id}
                        className="fileCard"
                        style={{
                            animationDelay: `${index * 0.08}s`
                        }}
                    >

                        <div className="fileTop">

                            <h2 className="fileName">
                                {file.filename}
                            </h2>

                        </div>

                        <div className="fileButtons">

                            <a
                                href={getFileUrl(file.filepath)}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <button className="viewButton">
                                    View
                                </button>
                            </a>

                            <a
                                href={getFileUrl(file.filepath)}
                                download={file.filename}
                            >
                                <button className="downloadButton">
                                    Download
                                </button>
                            </a>

                            {
                                deleteFile && (
                                    <button
                                        className="deleteButton"
                                        onClick={() => deleteFile(file._id)}
                                    >
                                        Delete
                                    </button>
                                )
                            }

                        </div>

                    </div>
                ))
            }

        </div>
    );
}

export default SubjectCard;