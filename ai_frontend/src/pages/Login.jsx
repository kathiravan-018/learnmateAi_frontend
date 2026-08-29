import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ailogo from "../assets/ailogo.png";
import { toast } from "sonner";

export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    // =========================================
    // Handle Input Change
    // =========================================

    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    };


    // =========================================
    // Login
    // =========================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/auth/login/",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password
                    })
                }
            );


            const data = await response.json();


            // =========================================
            // Login Error
            // =========================================

            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    "Invalid username or password."
                );

            }


            // =========================================
            // Save JWT Tokens
            // =========================================

            localStorage.setItem(
                "access_token",
                data.access
            );

            localStorage.setItem(
                "refresh_token",
                data.refresh
            );


            // =========================================
            // Tell Navbar Login Happened
            // =========================================

            window.dispatchEvent(
                new Event("auth-login")
            );


            // =========================================
            // Navigate Home
            // =========================================

            navigate("/");
            toast.success("Login successful!");

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Something went wrong. Please try again."
            );

        } finally {

            setLoading(false);

        }
        

    };


    // =========================================
    // UI
    // =========================================

    return (

        <section
            className="
                relative
                flex
                min-h-screen
                items-center
                justify-center
                overflow-hidden
                bg-gradient-to-br
                from-violet-50
                via-white
                to-indigo-50
                px-6
                pb-4
            "
        >

            {/* =========================================
                Background Decorations
            ========================================= */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    overflow-hidden
                "
            >

                {/* Top Right */}

                <div
                    className="
                        absolute
                        -right-32
                        -top-32
                        h-96
                        w-96
                        rounded-full
                        bg-violet-200/50
                        blur-3xl
                    "
                />


                {/* Bottom Left */}

                <div
                    className="
                        absolute
                        -bottom-32
                        -left-32
                        h-96
                        w-96
                        rounded-full
                        bg-indigo-100/70
                        blur-3xl
                    "
                />


                {/* Center Glow */}

                <div
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        h-80
                        w-80
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-fuchsia-100/40
                        blur-3xl
                    "
                />

            </div>


            {/* =========================================
                Login Container
            ========================================= */}

            <div
                className="
                    relative
                    z-10
                    w-full
                    max-w-md
                "
            >

                {/* =========================================
                    Header
                ========================================= */}

                <div className="text-center">

                    {/* Logo */}

                    <div
                        className="
                            mx-auto
                            flex
                            h-20
                            w-20
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-2xl
                        "
                    >

                       

                    </div>


                     <div className="flex ms-19">
                        <img
                            src={ailogo}
                            alt="LearnMate AI logo"
                            className="
                                h-20
                                w-20
                                object-contain
                            "
                        />

                    <h1
                        className="
                            mt-6
                            text-2xl
                            font-extrabold
                            tracking-tight
                            text-gray-900
                            
                        "
                    >

                        LearnMate{" "}

                        <span className="text-violet-600">
                            AI
                        </span>

                    </h1>

                     </div>

                    {/* Welcome */}

                    <h2
                        className="
                            mt-5
                            text-4xl
                            font-extrabold
                            tracking-tight
                            text-gray-900
                        "
                    >

                        Welcome Back

                    </h2>


                    <p
                        className="
                            mt-3
                            text-gray-600
                        "
                    >

                        Sign in to continue learning with{" "}

                        <span
                            className="
                                font-semibold
                                text-violet-600
                            "
                        >
                            LearnMate AI
                        </span>

                        .

                    </p>

                </div>


                {/* =========================================
                    Login Form
                ========================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="
                        mt-8
                        rounded-3xl
                        border
                        border-gray-200
                        bg-white
                        p-8
                        shadow-xl
                        shadow-violet-100/70
                    "
                >

                    {/* =====================================
                        Username
                    ===================================== */}

                    <div>

                        <label
                            htmlFor="username"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-gray-800
                            "
                        >

                            Username

                        </label>


                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            autoComplete="username"
                            required
                            className="
                                w-full
                                rounded-xl
                                border
                                border-gray-300
                                bg-white
                                px-4
                                py-3
                                text-gray-900
                                placeholder:text-gray-400
                                outline-none
                                transition
                                focus:border-violet-500
                                focus:ring-2
                                focus:ring-violet-100
                            "
                        />

                    </div>


                    {/* =====================================
                        Password
                    ===================================== */}

                    <div className="mt-5">

                        <label
                            htmlFor="password"
                            className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-gray-800
                            "
                        >

                            Password

                        </label>


                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                            className="
                                w-full
                                rounded-xl
                                border
                                border-gray-300
                                bg-white
                                px-4
                                py-3
                                text-gray-900
                                placeholder:text-gray-400
                                outline-none
                                transition
                                focus:border-violet-500
                                focus:ring-2
                                focus:ring-violet-100
                            "
                        />

                    </div>


                    {/* =====================================
                        Error
                    ===================================== */}

                    {error && (

                        <div
                            className="
                                mt-5
                                rounded-xl
                                border
                                border-red-200
                                bg-red-50
                                px-4
                                py-3
                                text-sm
                                font-medium
                                text-red-600
                            "
                        >

                            ⚠️ {error}

                        </div>

                    )}


                    {/* =====================================
                        Login Button
                    ===================================== */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            mt-6
                            w-full
                            rounded-xl
                            bg-gradient-to-r
                            from-violet-600
                            to-indigo-600
                            py-3.5
                            font-semibold
                            text-white
                            shadow-md
                            shadow-violet-200
                            transition
                            hover:from-violet-700
                            hover:to-indigo-700
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >

                        {loading
                            ? "Signing In..."
                            : "Sign In"
                        }

                    </button>


                    {/* =====================================
                        Sign Up
                    ===================================== */}

                    <p
                        className="
                            mt-6
                            text-center
                            text-gray-600
                        "
                    >

                        Don't have an account?{" "}

                        <Link
                            to="/signup"
                            className="
                                font-semibold
                                text-violet-600
                                hover:text-violet-700
                            "
                        >

                            Create Account

                        </Link>

                    </p>

                </form>


                {/* =========================================
                    Bottom Message
                ========================================= */}

                <p
                    className="
                        mt-6
                        text-center
                        text-sm
                        text-gray-400
                    "
                >

                    ✨ Learn smarter with LearnMate AI

                </p>

            </div>

        </section>

    );

}