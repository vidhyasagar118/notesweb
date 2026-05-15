import "./subjectcard.css"
function SubjectCard({ subject, files }) {

    return (
        <div className="subjectbox">

            <h2 className="subjectheading">
                {subject}
            </h2>

            {
                files.map((file) => (
                    <div className="fileitem" key={file._id}>

                        <span className="filename">
                            {file.filename}
                        </span>

                        <div className="filebtnbox">

                            <a
                               href={`https://notesweb-backend-9yi6.onrender.com/${file.filepath}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <button className="viewbtn">
                                    View
                                </button>
                            </a>

                            <a
href={`https://notesweb-backend-9yi6.onrender.com/${file.filepath}`}                                download
                            >
                                <button className="downloadbtn">
                                    Download
                                </button>
                            </a>

                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default SubjectCard