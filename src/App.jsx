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

            </Routes>

        </BrowserRouter>
    );
}

export default App;