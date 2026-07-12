// src/pages/Dashboard.jsx

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import API from "../api";

function Dashboard() {
  const [semester, setSemester] = useState("");
  const [customSemester, setCustomSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [visibility, setVisibility] = useState("public");

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [files, setFiles] = useState({});

  const [groupCode, setGroupCode] = useState("");
  const [sharedFiles, setSharedFiles] = useState(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const loadFiles = async () => {
    try {
      const res = await API.get("/files/myfiles");
      setFiles(res.data || {});
    } catch (err) {
      console.error("Files load error:", err);
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
      } catch (err) {
        console.error("Authentication error:", err);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.dispatchEvent(new Event("authChanged"));

        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [navigate]);

  const uploadFile = async () => {
    const finalSemester =
      semester === "Other" ? customSemester.trim() : semester;

    if (
      !finalSemester ||
      !subject.trim() ||
      filesToUpload.length === 0
    ) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();

    formData.append("semester", finalSemester);
    formData.append("subject", subject.trim());
    formData.append("visibility", visibility);

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

      alert("Files Uploaded Successfully");

      setSemester("");
      setCustomSemester("");
      setSubject("");
      setFilesToUpload([]);
      setVisibility("public");

      // File input reset
      const fileInput = document.getElementById(
        "dashboard-file-input"
      );

      if (fileInput) {
        fileInput.value = "";
      }

      await loadFiles();
    } catch (err) {
      console.error("Upload error:", err);

      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  const openShared = async () => {
    const enteredGroupCode = groupCode.trim().toUpperCase();

    if (!enteredGroupCode) {
      alert("Please enter group code");
      return;
    }

    try {
      const res = await API.get(
        `/files/shared/${enteredGroupCode}`
      );

      setSharedFiles(res.data);
    } catch (err) {
      console.error("Shared files error:", err);

      setSharedFiles(null);

      alert(
        err.response?.data?.message ||
          "Wrong Group Code"
      );
    }
  };

  /*
    Search works for:
    1. Semester name
    2. Class or course name
    3. Subject name
    4. File name, if files are available inside subject arrays
  */

  const matchesSearch = (
    semesterName,
    semesterData,
    query
  ) => {
    if (!query) {
      return true;
    }

    const normalizedQuery = query.toLowerCase();

    // Semester/Class/Course match
    if (
      semesterName
        .toLowerCase()
        .includes(normalizedQuery)
    ) {
      return true;
    }

    if (
      !semesterData ||
      typeof semesterData !== "object"
    ) {
      return false;
    }

    return Object.entries(semesterData).some(
      ([subjectName, subjectFiles]) => {
        // Subject match
        const subjectMatches = subjectName
          .toLowerCase()
          .includes(normalizedQuery);

        if (subjectMatches) {
          return true;
        }

        // File name match
        if (Array.isArray(subjectFiles)) {
          return subjectFiles.some((file) => {
            const fileName =
              file?.filename ||
              file?.originalname ||
              file?.name ||
              "";

            return fileName
              .toLowerCase()
              .includes(normalizedQuery);
          });
        }

        return false;
      }
    );
  };

  const filteredSemesterNames = useMemo(() => {
    const query = searchTerm.trim();

    return Object.keys(files).filter((semesterName) =>
      matchesSearch(
        semesterName,
        files[semesterName],
        query
      )
    );
  }, [files, searchTerm]);

  const filteredSharedSemesterNames = useMemo(() => {
    const query = searchTerm.trim();
    const groupedSharedFiles =
      sharedFiles?.grouped || {};

    return Object.keys(groupedSharedFiles).filter(
      (semesterName) =>
        matchesSearch(
          semesterName,
          groupedSharedFiles[semesterName],
          query
        )
    );
  }, [sharedFiles, searchTerm]);

  const clearSearch = () => {
    setSearchTerm("");
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
          onChange={(e) => {
            setSemester(e.target.value);

            if (e.target.value !== "Other") {
              setCustomSemester("");
            }
          }}
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

          <option value="Other">
            Other / School Class
          </option>
        </select>

        {semester === "Other" && (
          <input
            className="subjectinp"
            type="text"
            placeholder="Enter Class or Course, e.g. Class 10, Class 12, JEE"
            value={customSemester}
            onChange={(e) =>
              setCustomSemester(e.target.value)
            }
          />
        )}

        <input
          className="subjectinp"
          type="text"
          placeholder="Enter Subject"
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value)
          }
        />

        <div className="visibility-section">
          <p className="visibility-title">
            Who can see these files?
          </p>

          <div className="visibility-options-row">
            <label
              className={`visibility-option ${
                visibility === "public"
                  ? "selected"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="file-visibility"
                value="public"
                checked={visibility === "public"}
                onChange={() =>
                  setVisibility("public")
                }
              />

              <span className="visibility-content">
                <strong>🌐 Public</strong>

                <small>
                  Group code wale users ye files
                  dekh sakte hain
                </small>
              </span>
            </label>

            <label
              className={`visibility-option ${
                visibility === "private"
                  ? "selected"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="file-visibility"
                value="private"
                checked={visibility === "private"}
                onChange={() =>
                  setVisibility("private")
                }
              />

              <span className="visibility-content">
                <strong>🔒 Private</strong>

                <small>
                  Sirf tum apne account mein ye
                  files dekh sakte ho
                </small>
              </span>
            </label>
          </div>
        </div>

        <input
          id="dashboard-file-input"
          className="fileuploadinp"
          type="file"
          multiple
          accept=".pdf,.mp4,.avi,.mkv,.mov,.webm,.jpg,.jpeg,.png,.webp,.gif,.mp3,.wav,.m4a,.ogg,.aac,.flac"
          onChange={(e) =>
            setFilesToUpload(
              Array.from(e.target.files || [])
            )
          }
        />

        {filesToUpload.length > 0 && (
          <p className="selected-files-count">
            {filesToUpload.length} file
            {filesToUpload.length > 1
              ? "s"
              : ""}{" "}
            selected
          </p>
        )}

        <button
          type="button"
          onClick={uploadFile}
          className="uploadbtn"
          disabled={uploading}
        >
          {uploading
            ? "Uploading..."
            : "Upload"}
        </button>

        <hr />

        {/* Open Shared Files Section */}

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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              openShared();
            }
          }}
        />

        <button
          type="button"
          className="opengroupbtn"
          onClick={openShared}
        >
          Open
        </button>

        {/* Search Section */}

        <div className="dashboard-search-section">
          <h2 className="dashboard-search-heading">
            Find Your Files
          </h2>

          <div className="dashboard-search-box">
            <span
              className="dashboard-search-icon"
              aria-hidden="true"
            >
              🔍
            </span>

            <input
              type="text"
              className="dashboard-search-input"
              placeholder="Search semester, class, course, subject or file..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

            {searchTerm && (
              <button
                type="button"
                className="dashboard-search-clear"
                onClick={clearSearch}
                aria-label="Clear search"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {searchTerm.trim() && (
            <p className="dashboard-search-status">
              Showing results for:{" "}
              <strong>
                {searchTerm.trim()}
              </strong>
            </p>
          )}
        </div>

        {/* Shared Files */}

        {sharedFiles && (
          <div className="shared-files-section">
            <h2 className="headingshaareowner">
              Shared By: {sharedFiles.owner}
            </h2>

            <div className="semestersgrid">
              {filteredSharedSemesterNames.length ===
              0 ? (
                <p className="no-search-result">
                  No shared semester, subject or
                  file found
                  {searchTerm.trim()
                    ? ` for "${searchTerm.trim()}".`
                    : "."}
                </p>
              ) : (
                filteredSharedSemesterNames.map(
                  (semesterName) => (
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
                  )
                )
              )}
            </div>
          </div>
        )}

        {/* My Semesters */}

        <h2 className="mysubjects">
          My Semesters
        </h2>

        <div className="semestersgrid">
          {Object.keys(files).length === 0 ? (
            <p className="no-search-result">
              No uploaded notes found.
            </p>
          ) : filteredSemesterNames.length ===
            0 ? (
            <p className="no-search-result">
              No semester, subject or file found
              {searchTerm.trim()
                ? ` for "${searchTerm.trim()}".`
                : "."}
            </p>
          ) : (
            filteredSemesterNames.map(
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