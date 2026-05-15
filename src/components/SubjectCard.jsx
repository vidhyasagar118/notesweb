import "./subjectcard.css"
function SubjectCard({ subject, files, deleteFile }) {

    return (
        <div>

            <h2>{subject}</h2>

            {files.map(file => (

                <div key={file._id}>

                    <span>{file.filename}</span>

                    <a
                        href={`https://notesweb-backend-9yi6.onrender.com/${file.filepath}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <button>View</button>
                    </a>

                    <a
                        href={`https://notesweb-backend-9yi6.onrender.com/${file.filepath}`}
                        download
                    >
                        <button>Download</button>
                    </a>

                    <button onClick={() => deleteFile(file._id)}>
                        Delete
                    </button>

                </div>
            ))}
        </div>
    );
}

export default SubjectCard;