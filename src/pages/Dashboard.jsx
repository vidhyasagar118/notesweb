// src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

    const user = JSON.parse(sessionStorage.getItem("user")) || {};

    const [semester, setSemester] = useState("");
    const [subject, setSubject] = useState("");

    const [filesToUpload, setFilesToUpload] = useState([]);

    const [files, setFiles] = useState({});

    const [groupCode, setGroupCode] = useState("");
    const [sharedFiles, setSharedFiles] = useState(null);

    const loadFiles = async () => {

        try {

            const res = await API.get("/files/myfiles");

            setFiles(res.data);

        } catch (err) {

            console.log(err);
        }
    };

    useEffect(() => {

        loadFiles();

    }, []);

    const uploadFile = async () => {

        if (!semester || !subject || filesToUpload.length === 0) {

            return alert("Please fill all fields");
        }

        const formData = new FormData();

        formData.append("semester", semester);

        formData.append("subject", subject);

        for (let i = 0; i < filesToUpload.length; i++) {

            formData.append("files", filesToUpload[i]);
        }

        try {

            await API.post("/files/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            alert("Files Uploaded");

            setSemester("");
            setSubject("");
            setFilesToUpload([]);

            loadFiles();

        } catch (err) {

            console.log(err);
        }
    };

    const openShared = async () => {

        try {

            const res = await API.get(`/files/shared/${groupCode}`);

            setSharedFiles(res.data);

        } catch (err) {

            console.log(err);

            alert("Wrong Group Code");
        }
    };

    return (

        <>
            <div className="navbarhandle">

                <Navbar user={user} />

            </div>

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
                        onChange={(e) => setFilesToUpload(e.target.files)}
                    />

                    <button
                        onClick={uploadFile}
                        className="uploadbtn"
                    >
                        Upload
                    </button>

                    <hr />

                    {/* MY SEMESTERS */}

                    <h2 className="mysubjects">
                        My Semesters
                    </h2>

                  <div className="semestersgrid">

{
    Object.keys(files).map((semester) => (

        <Link
            key={semester}
            to={`/subjects/${semester}`}
            className="semesterlink"
        >

            <div className="semesterbox">

                <div className="semesterheader">

                    <h1 className="semesterheading">
                        {semester}
                    </h1>
                   <p>click</p>

                </div>

            </div>

        </Link>
    ))
}

</div>

                    <hr />

                    {/* SHARED FILES */}

                    <h2 className="opensareheading">
                        Open Shared Files
                    </h2>

                    <input
                        className="gropinp"
                        type="text"
                        placeholder="Enter Group Code"
                        value={groupCode}
                        onChange={(e) => setGroupCode(e.target.value)}
                    />

                    <button
                        className="opengroupbtn"
                        onClick={openShared}
                    >
                        Open
                    </button>

                    {
                        sharedFiles && (

                            <div>

                                <h2 className="headingshaareowner">

                                    Shared By: {sharedFiles.owner}

                                </h2>

                             <div className="semestersgrid">

{
    Object.keys(sharedFiles.grouped).map((semester) => (

        <Link
            key={semester}
            to={`/subjects/${semester}`}
            className="semesterlink"
        >

            <div className="semesterbox">

                <div className="semesterheader">

                    <h1 className="semesterheading">
                        {semester}
                    </h1>
                   <p>click</p>
                </div>

            </div>

        </Link>
    ))
}

</div>
                            </div>
                        )
                    }

                </div>

            </div>
        </>
    );
}

export default Dashboard;