// src/App.jsx

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubjectsPage from "./pages/SubjectsPage";
import SubjectFiles from "./pages/SubjectFiles";
import SharedSubjectsPage from "./pages/SharedSubjectsPage";
import SharedSubjectFiles from "./pages/SharedSubjectFiles";
import Contact from "./pages/Contact";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import GlobalAI from "./components/GlobalAI";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Footer from "./components/Footer";
import MainNavbar from "./pages/MainNavbar";
function App() {
const [currentPDF, setCurrentPDF] = useState(null);

    return (
<> 
        <BrowserRouter>
      {/* Har page par common navbar */}
      <MainNavbar />

            <Routes>

                <Route
                    path="/"
                    element={<LandingPage />}
                />

                 <Route
                    path="/login"
                    element={<Login />}
                />
                
                
                 <Route
                    path="/contact"
                    element={<Contact />}
                />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms" element={<Terms />} />
<Route path="/disclaimer" element={<Disclaimer />} />

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
      <SubjectFiles setCurrentPDF={setCurrentPDF} />
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
<Footer />

        </BrowserRouter>
<GlobalAI currentPDF={currentPDF} />
        </>
        
    );
}

export default App;