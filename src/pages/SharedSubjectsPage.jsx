import { useEffect, useState } from "react";
import {
  Link,
  useParams
} from "react-router-dom";
import API from "../api";
import "./Subjects.css";

function SharedSubjectsPage() {
  const { groupCode, semester } = useParams();

  const [subjects, setSubjects] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        setLoading(true);

        const res = await API.get(
          `/files/shared/${encodeURIComponent(
            groupCode
          )}`
        );

        const semesterSubjects =
          res.data?.grouped?.[semester] || {};

        setSubjects(semesterSubjects);
      } catch (err) {
        console.error(
          "Shared subjects loading error:",
          err
        );

        setSubjects({});
      } finally {
        setLoading(false);
      }
    };

    loadSubjects();
  }, [groupCode, semester]);

  const subjectNames = Object.keys(subjects);

  return (
    <div className="subjectsPageMain">
      <div className="subjectsContainer">
        <h1 className="subjectsSemesterTitle">
          {semester}
        </h1>

        {loading ? (
          <p>Loading subjects...</p>
        ) : subjectNames.length === 0 ? (
          <p>No public subjects found.</p>
        ) : (
          <div className="subjectsGrid">
            {subjectNames.map(
              (subjectName, index) => (
                <Link
                  key={subjectName}
                  to={`/sharedfiles/${encodeURIComponent(
                    groupCode
                  )}/${encodeURIComponent(
                    semester
                  )}/${encodeURIComponent(
                    subjectName
                  )}`}
                  className="subjectsCardLink"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="subjectsCard">
                    <div className="subjectsCardTop">
                      <h2 className="subjectsName">
                        {subjectName}
                      </h2>

                      <span className="subjectsFileCount">
                        {subjects[subjectName].length} Files
                      </span>
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

export default SharedSubjectsPage;