// src/pages/SubjectFiles.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import SubjectCard from "../components/SubjectCard";
import "./SubjectFiles.css";

function SubjectFiles() {

    const { semester, subject } = useParams();

    const [files, setFiles] = useState([]);

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

                    <h1 className="subjectFilesTitle">
                        {subject}
                    </h1>

                    <p className="subjectFilesSemester">
                        {semester}
                    </p>

                </div>

                <SubjectCard
                    files={files}
                    deleteFile={deleteFile}
                />

            </div>

        </div>
    );
}

export default SubjectFiles;