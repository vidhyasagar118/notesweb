// src/App.jsx

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubjectsPage from "./pages/SubjectsPage";
import SubjectFiles from "./pages/SubjectFiles";
import SharedSubjectsPage from "./pages/SharedSubjectsPage";
import SharedSubjectFiles from "./pages/SharedSubjectFiles";
function ProtectedRoute({ children }) {

    const token = sessionStorage.getItem("token");

    return token ? children : <Navigate to="/" />;
}

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/subjects/:semester"
                    element={
                        <ProtectedRoute>
                            <SubjectsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/subject/:semester/:subject"
                    element={
                        <ProtectedRoute>
                            <SubjectFiles />
                        </ProtectedRoute>
                    }
                />
<Route
    path="/sharedsubjects/:groupCode/:semester"
    element={
        <ProtectedRoute>
            <SharedSubjectsPage />
        </ProtectedRoute>
    }
/>

<Route
    path="/sharedfiles/:groupCode/:semester/:subject"
    element={
        <ProtectedRoute>
            <SharedSubjectFiles />
        </ProtectedRoute>
    }
/>
            </Routes>

        </BrowserRouter>
    );
}

export default App;