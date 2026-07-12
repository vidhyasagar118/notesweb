import { useEffect, useState } from "react";
import {
  Link,
  useParams
} from "react-router-dom";
import API from "../api";
import "./Subjects.css";

function SubjectsPage() {
  const { semester } = useParams();

  const [subjects, setSubjects] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        setLoading(true);

        const res = await API.get("/files/myfiles");

        setSubjects(
          res.data?.[semester] || {}
        );
      } catch (err) {
        console.error(
          "Subjects loading error:",
          err
        );

        setSubjects({});
      } finally {
        setLoading(false);
      }
    };

    loadSubjects();
  }, [semester]);

  const subjectNames =
    Object.keys(subjects);

  return (
    <div className="subjectsPageMain">
      <div className="subjectsContainer">
        <div className="subjectsPageHeader">
          <h1 className="subjectsSemesterTitle">
            {semester}
          </h1>

          <p className="subjectsSubtitle">
            Select a subject to view your files
          </p>
        </div>

        {loading ? (
          <div className="subjectsMessage">
            Loading subjects...
          </div>
        ) : subjectNames.length === 0 ? (
          <div className="subjectsMessage">
            No subjects found in this folder.
          </div>
        ) : (
          <div className="subjectsGrid">
            {subjectNames.map(
              (subjectName, index) => (
                <Link
                  key={subjectName}
                  to={`/subject/${encodeURIComponent(
                    semester
                  )}/${encodeURIComponent(
                    subjectName
                  )}`}
                  className="subjectsCardLink"
                  style={{
                    animationDelay:
                      `${index * 0.1}s`
                  }}
                >
                  <div className="subjectsCard">
                    <div className="subjectsCardIcon">
                      📚
                    </div>

                    <div className="subjectsCardTop">
                      <h2 className="subjectsName">
                        {subjectName}
                      </h2>

                      <span className="subjectsFileCount">
                        {subjects[subjectName]
                          ?.length || 0}{" "}
                        Files
                      </span>
                    </div>

                    <div className="subjectsOpenText">
                      Open Subject →
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SubjectsPage;