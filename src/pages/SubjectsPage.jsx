// src/pages/SubjectsPage.jsx

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import "./Subjects.css";

function SubjectsPage() {

    const { semester } = useParams();

    const [subjects, setSubjects] = useState({});

    useEffect(() => {

        loadSubjects();

    }, []);

    const loadSubjects = async () => {

        try {

            const res = await API.get("/files/myfiles");

            setSubjects(res.data[semester]);

        } catch (err) {

            console.log(err);
        }
    };

    return (

        <div className="subjectsPageMain">

            <div className="subjectsContainer">

                <h1 className="subjectsSemesterTitle">
                    {semester}
                </h1>

                <div className="subjectsGrid">

                    {
                        subjects &&
                        Object.keys(subjects).map((subject, index) => (

                            <Link
                                key={subject}
                                to={`/subject/${semester}/${subject}`}
                                className="subjectsCardLink"
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >

                                <div className="subjectsCard">

                                    <div className="subjectsCardTop">

                                        <h2 className="subjectsName">
                                            {subject}
                                        </h2>

                                        <span className="subjectsFileCount">
                                            {subjects[subject].length} Files
                                        </span>

                                    </div>

                                </div>

                            </Link>
                        ))
                    }

                </div>

            </div>

        </div>
    );
}

export default SubjectsPage;