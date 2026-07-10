import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import SubjectCard from "../components/SubjectCard";
import "./SubjectFiles.css";

function SubjectFiles({ setCurrentPDF }) {

    const { semester, subject } = useParams();

    const [files, setFiles] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null); // 🔥 NEW

    useEffect(() => {
        loadFiles();
    }, []);

    const loadFiles = async () => {
        try {
            const res = await API.get("/files/myfiles");
            setFiles(res.data[semester][subject]);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteFile = async (id) => {
        try {
            await API.delete(`/files/${id}`);
            loadFiles();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="subjectFilesMain">

            <div className="subjectFilesContainer">

                <div className="subjectFilesHeader">
                    <h1 className="subjectFilesTitle">{subject}</h1>
                    <p className="subjectFilesSemester">{semester}</p>
                </div>

                <SubjectCard
                    files={files}
                    deleteFile={deleteFile}
                    setCurrentPDF={(url) => {
                        setPdfUrl(url);       // ✅ show PDF
                        setCurrentPDF(url);   // ✅ AI ko bhej
                    }}
                />

                {/* 🔥 PDF VIEWER */}
                {pdfUrl && (
                    <div style={{ marginTop: "20px" }}>
                        <iframe
                            src={pdfUrl}
                            width="100%"
                            height="600px"
                            style={{ borderRadius: "10px" }}
                        />
                    </div>
                )}

            </div>

        </div>
    );
}

export default SubjectFiles;