import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import SubjectCard from "../components/SubjectCard";
import "./Dashboard.css"
function Dashboard() {

    const user = JSON.parse(localStorage.getItem("user")) || {};
    const [subject, setSubject] = useState("");
    const [file, setFile] = useState(null);
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

        if (!subject || !file) {
            return alert("Please enter subject and select file");
        }

        const formData = new FormData();

        formData.append("subject", subject);
        formData.append("file", file);

        try {

            await API.post("/files/upload", formData);

            alert("File Uploaded");

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

            alert("Wrong Group Code");
        }
    };

    const deleteFile = async (id) => {

        try {

            await API.delete(`/files/${id}`);

            alert("File Deleted");

            loadFiles();

        } catch (err) {

            console.log(err);
            alert("Delete Failed");
        }
    };
    return (
        <>
            <div className="navbarhandle">
                <Navbar user={user} />
            </div>
            <div className="dashbordmaindiv">


                <div className="dashcontainer">

                    <h2 className="uploadfile ">Upload File</h2>

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
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <button onClick={uploadFile} className="uploadbtn">
                        Upload
                    </button>

                    <hr />

                    <h2 className="opensareheading">Open Shared Files</h2>

                    <input
                        className="gropinp"
                        type="text"
                        placeholder="Enter Group Code"
                        value={groupCode}
                        onChange={(e) => setGroupCode(e.target.value)}
                    />

                    <button className="opengroupbtn" onClick={openShared}>
                        Open
                    </button>

                    <hr />

                    <h2 className="mysubjects">My Subjects</h2>

                    {
                        Object.keys(files).map((subject) => (
                            <SubjectCard
                                key={subject}
                                subject={subject}
                                files={files[subject]}
                            />
                        ))
                    }

                    {
                        sharedFiles && (
                            <div>

                                <h2 className="headingshaareowner">
                                    Shared By: {sharedFiles.owner}
                                </h2>

                                {
                                    Object.keys(sharedFiles.grouped).map((subject) => (
                                        <SubjectCard
                                            key={subject}
                                            subject={subject}
                                            files={files[subject]}
                                            deleteFile={deleteFile}
                                        />
                                    ))
                                }

                            </div>
                        )
                    }

                </div>

            </div>
        </>
    );
}

export default Dashboard;