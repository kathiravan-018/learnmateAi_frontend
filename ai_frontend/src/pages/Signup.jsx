import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        if (formData.password !== formData.confirmPassword) {

            setError("Passwords do not match.");

            return;
        }


        setLoading(true);

        try {

            const response = await fetch(
                "https://learnmateai-backend.onrender/api/auth/register/",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username: formData.username,
                        email: formData.email,
                        password: formData.password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                if (data.username) {
                    throw new Error(data.username[0]);
                }

                if (data.email) {
                    throw new Error(data.email[0]);
                }

                if (data.password) {
                    throw new Error(data.password[0]);
                }

                throw new Error(
                    data.detail || "Registration failed."
                );
            }


            navigate("/login");


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


    return (

        <section className="
            min-h-screen
            relative
            overflow-hidden
            bg-gradient-to-b
            from-violet-50
            via-white
            to-slate-50
            flex
            items-center
            justify-center
            px-6
            py-20
        ">

            {/* Ambient background accents */}
            <div className="
                pointer-events-none
                absolute
                inset-0
                overflow-hidden
            ">
                <div className="
                    absolute
                    -top-32
                    -left-24
                    w-96
                    h-96
                    rounded-full
                    bg-violet-200/50
                    blur-3xl
                " />
                <div className="
                    absolute
                    -bottom-32
                    -right-24
                    w-96
                    h-96
                    rounded-full
                    bg-fuchsia-100/60
                    blur-3xl
                " />
            </div>

            <div className="
                relative
                w-full
                max-w-md
            ">


                {/* Logo / Heading */}

                <div className="text-center">


                    <h1 className="
                        mt-6
                        text-4xl
                        font-extrabold
                        tracking-tight
                        text-gray-900
                    ">
                        Create Account
                    </h1>


                    <p className="
                        mt-3
                        text-gray-600
                    ">
                        Start learning smarter with{" "}
                        <span className="text-violet-600 font-semibold">
                            LearnMate AI
                        </span>.
                    </p>

                </div>


                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="
                        mt-8
                        rounded-3xl
                        border
                        border-gray-200
                        bg-white/80
                        backdrop-blur-xl
                        p-8
                        shadow-xl
                        shadow-violet-100
                    "
                >


                    {/* Username */}

                    <div>

                        <label className="
                            block
                            mb-2
                            text-sm
                            font-semibold
                            text-gray-800
                        ">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
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


                    {/* Email */}

                    <div className="mt-5">

                        <label className="
                            block
                            mb-2
                            text-sm
                            font-semibold
                            text-gray-800
                        ">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
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


                    {/* Password */}

                    <div className="mt-5">

                        <label className="
                            block
                            mb-2
                            text-sm
                            font-semibold
                            text-gray-800
                        ">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
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


                    {/* Confirm Password */}

                    <div className="mt-5">

                        <label className="
                            block
                            mb-2
                            text-sm
                            font-semibold
                            text-gray-800
                        ">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
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


                    {/* Error */}

                    {error && (

                        <div className="
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
                        ">
                            ⚠️ {error}
                        </div>

                    )}


                    {/* Submit */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            mt-6
                            w-full
                            rounded-xl
                            bg-gradient-to-r
                            from-violet-600
                            to-fuchsia-600
                            py-3
                            text-white
                            font-semibold
                            shadow-md
                            shadow-violet-200
                            transition
                            hover:from-violet-500
                            hover:to-fuchsia-500
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >

                        {loading
                            ? "Creating Account..."
                            : "Create Account"
                        }

                    </button>


                    {/* Login */}

                    <p className="
                        mt-6
                        text-center
                        text-gray-600
                    ">

                        Already have an account?

                        {" "}

                        <Link
                            to="/login"
                            className="
                                font-semibold
                                text-violet-600
                                hover:text-violet-700
                            "
                        >
                            Login
                        </Link>

                    </p>

                </form>

            </div>

        </section>

    );

}