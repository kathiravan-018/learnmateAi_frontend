import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ailogo from "../assets/ailogo.png";

export default function Navbar() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // =========================================
    // Fetch Current User
    // =========================================

    const fetchUser = async () => {

        const accessToken = localStorage.getItem("access_token");

        // No token = logged out
        if (!accessToken) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/me/",
                {
                    method: "GET",

                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (!response.ok) {

                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");

                setUser(null);

                return;
            }

            const data = await response.json();

            setUser(data);

        } catch (error) {

            console.error(
                "Failed to fetch user:",
                error
            );

            setUser(null);

        } finally {

            setLoading(false);

        }
    };


    // =========================================
    // Initial Authentication Check
    // =========================================

    useEffect(() => {

        fetchUser();

    }, []);


    // =========================================
    // Listen For Login
    // =========================================

    useEffect(() => {

        const handleLogin = () => {

            setLoading(true);

            fetchUser();

        };

        window.addEventListener(
            "auth-login",
            handleLogin
        );

        return () => {

            window.removeEventListener(
                "auth-login",
                handleLogin
            );

        };

    }, []);


    // =========================================
    // Listen For Logout
    // =========================================

    useEffect(() => {

        const handleLogoutEvent = () => {

            setUser(null);

        };

        window.addEventListener(
            "auth-logout",
            handleLogoutEvent
        );

        return () => {

            window.removeEventListener(
                "auth-logout",
                handleLogoutEvent
            );

        };

    }, []);


    // =========================================
    // Logout
    // =========================================

    const handleLogout = () => {

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        setUser(null);

        window.dispatchEvent(
            new Event("auth-logout")
        );

        navigate("/login");

    };


    // =========================================
    // UI
    // =========================================

    return (

        <nav
            className="
                fixed
                top-0
                left-0
                w-full
                z-50
                backdrop-blur-lg
                bg-white/70
                border-b
                border-gray-200
            "
        >

            <div
                className="
                    max-w-7xl
                    mx-auto
                    flex
                    justify-between
                    items-center
                    px-8
                    py-4
                "
            >

                {/* Logo */}
               <div className="flex">
                

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-gray-900
                        mt-2
                    "
                >
                    LearnMate{" "}

                    <span className="text-violet-600">
                        AI
                    </span>

                </h2>

               </div>

                {/* Right Side */}

                <div
                    className="
                        flex
                        items-center
                        gap-4
                    "
                >

                    {/* ==============================
                        Logged Out
                    ============================== */}

                    {!loading && !user && (

                        <>

                            {/* Login */}

                            <button
                                onClick={() =>
                                    navigate("/login")
                                }
                                className="
                                    px-5
                                    py-2
                                    rounded-full
                                    border
                                    border-violet-600
                                    text-violet-600
                                    font-semibold
                                    hover:bg-violet-50
                                    transition
                                "
                            >
                                Login
                            </button>


                            {/* Sign Up */}

                            <button
                                onClick={() =>
                                    navigate("/signup")
                                }
                                className="
                                    px-5
                                    py-2
                                    rounded-full
                                    bg-violet-600
                                    text-white
                                    font-semibold
                                    hover:bg-violet-700
                                    transition
                                    shadow-lg
                                "
                            >
                                Sign Up
                            </button>

                        </>

                    )}


                    {/* ==============================
                        Logged In
                    ============================== */}

                    {!loading && user && (

                        <>

                            {/* Username */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-lg
                                    px-5
                                    py-2
                                    rounded-full
                                    bg-violet-50
                                    text-violet-700
                                    font-semibold
                                "
                            >

                                <span>
                                    👤 {user.username}
                                </span>

                            </div>


                            {/* Logout */}

                            <button
                                onClick={handleLogout}
                                className="
                                    px-5
                                    py-2
                                    rounded-full
                                    border
                                    border-red-500
                                    hover:bg-red-400
                                    hover:text-white
                                    text-red-500
                                    font-semibold
                                    bg-red-50
                                    transition
                                "
                            >
                                Logout
                            </button>

                        </>

                    )}

                </div>

            </div>

        </nav>

    );
}