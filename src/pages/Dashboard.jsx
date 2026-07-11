// src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import API from "../api";
function Dashboard() {
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [files, setFiles] = useState({});
  const [groupCode, setGroupCode] = useState("");
  const [sharedFiles, setSharedFiles] = useState(null);

  const navigate = useNavigate();

  const loadFiles = async () => {
    try {
      const res = await API.get("/files/myfiles");
      setFiles(res.data || {});
    } catch (err) {
      console.log(err);
      setFiles({});
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        await API.get("/auth/verify");
        await loadFiles();
        setLoading(false);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.dispatchEvent(new Event("authChanged"));

        setLoading(false);
        navigate("/login");
      }
    };

    verifyUser();
  }, [navigate]);

  const uploadFile = async () => {
    if (!semester || !subject || filesToUpload.length === 0) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();

    formData.append("semester", semester);
    formData.append("subject", subject);

    filesToUpload.forEach((file) => {
      formData.append("files", file);
    });

    try {
      setUploading(true);

      await API.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 1000 * 60 * 30,
      });

      alert("Files Uploaded");

      setSemester("");
      setSubject("");
      setFilesToUpload([]);

      await loadFiles();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "Upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  const openShared = async () => {
    if (!groupCode.trim()) {
      alert("Please enter group code");
      return;
    }

    try {
      const res = await API.get(
        `/files/shared/${groupCode.trim()}`
      );

      setSharedFiles(res.data);
    } catch (err) {
      console.log(err);
      setSharedFiles(null);
      alert("Wrong Group Code");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Checking Authentication...
      </div>
    );
  }

  return (
    <div className="dashbordmaindiv">
      <div className="dashcontainer">

        {/* Upload Section */}

        <h2 className="uploadfile">
          Upload File
        </h2>

        <select
          className="semesterselect"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option value="">
            Select Semester
          </option>

          <option value="Semester 1">
            Semester 1
          </option>

          <option value="Semester 2">
            Semester 2
          </option>

          <option value="Semester 3">
            Semester 3
          </option>

          <option value="Semester 4">
            Semester 4
          </option>

          <option value="Semester 5">
            Semester 5
          </option>

          <option value="Semester 6">
            Semester 6
          </option>

          <option value="Semester 7">
            Semester 7
          </option>

          <option value="Semester 8">
            Semester 8
          </option>
        </select>

        <input
          className="subjectinp"
          type="text"
          placeholder="Enter Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          className="fileuploadinp"
          type="file"
          multiple
          accept=".pdf,.mp4,.avi,.mkv,.mov"
          onChange={(e) =>
            setFilesToUpload(
              Array.from(e.target.files)
            )
          }
        />

        <button
          type="button"
          onClick={uploadFile}
          className="uploadbtn"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        <hr />

 <h2 className="opensareheading">
          Open Shared Files
        </h2>

        <input
          className="gropinp"
          type="text"
          placeholder="Enter Group Code"
          value={groupCode}
          onChange={(e) =>
            setGroupCode(
              e.target.value.toUpperCase()
            )
          }
        />

        <button
          type="button"
          className="opengroupbtn"
          onClick={openShared}
        >
          Open
        </button>
        {/* Shared Files */}

       
        {sharedFiles && (
          <div>
            <h2 className="headingshaareowner">
              Shared By: {sharedFiles.owner}
            </h2>

            <div className="semestersgrid">
              {Object.keys(
                sharedFiles.grouped || {}
              ).map((semesterName) => (
                <Link
                  key={semesterName}
                  to={`/sharedsubjects/${encodeURIComponent(
                    groupCode.trim()
                  )}/${encodeURIComponent(
                    semesterName
                  )}`}
                  className="semesterlink"
                >
                  <div className="semesterbox">
                    <div className="semesterheader">
                      <h1 className="semesterheading">
                        {semesterName}
                      </h1>

                      <p>Click</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* My Semesters */}

        <h2 className="mysubjects">
          My Semesters
        </h2>

        <div className="semestersgrid">
          {Object.keys(files).length === 0 ? (
            <p>No uploaded notes found.</p>
          ) : (
            Object.keys(files).map(
              (semesterName) => (
                <Link
                  key={semesterName}
                  to={`/subjects/${encodeURIComponent(
                    semesterName
                  )}`}
                  className="semesterlink"
                >
                  <div className="semesterbox">
                    <div className="semesterheader">
                      <h1 className="semesterheading">
                        {semesterName}
                      </h1>

                      <p>Click</p>
                    </div>
                  </div>
                </Link>
              )
            )
          )}
        </div>

        <hr />


      </div>
    </div>
  );
}

export default Dashboard;