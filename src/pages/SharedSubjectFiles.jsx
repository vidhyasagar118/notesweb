import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import SubjectCard from "../components/SubjectCard";
import "./SubjectFiles.css";

function SharedSubjectFiles() {

    const { groupCode, semester, subject } = useParams();

    const [files, setFiles] = useState([]);

    useEffect(() => {

        loadFiles();

    }, []);

    const loadFiles = async () => {

        try {

            const res = await API.get(`/files/shared/${groupCode}`);

            setFiles(
                res.data.grouped[semester][subject]
            );

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
                />

            </div>

        </div>
    );
}

export default SharedSubjectFiles;