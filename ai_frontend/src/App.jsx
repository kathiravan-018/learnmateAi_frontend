import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureSection from "./components/FeatureSection";
import VoiceLearning from "./features/VoiceLearning";
import NotesGenerator from "./features/NotesGenerator";
import QuizGenerator from "./features/QuizGenerator";
import CodeExplainer from "./features/CodeExplainer";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";

import { Toaster } from 'sonner';

export default function App() {

    return (

        <div className="
            min-h-screen
            bg-gradient-to-br
            from-indigo-50
            via-white
            to-violet-100
        ">

             <Toaster
                position="top-right"
                richColors
                
            />

           

            <Routes>

                <Route
                    path="/"
                    element={
                        <>
                             <Navbar />
                            <Hero />
                        </>
                    }
                />

                <Route path='/features'
                 element={
                     <>
                             <Navbar />
                           <FeatureSection/>
                     </> }
                        />

                <Route 
                path="/features/voice"
                element={<VoiceLearning/>}
                />

                <Route
                    path="/features/notes"
                    element={<NotesGenerator />}
                />

                <Route 
                    path="/features/quiz"
                    element={<QuizGenerator/>}
                    />

                <Route path="/features/code" element={<CodeExplainer />} />

                <Route path='/signup' element={<SignUp/>} />

                <Route path='/login' element={<Login/>} />

                
            </Routes>

        </div>

    );

}