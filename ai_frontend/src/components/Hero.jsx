
import { useNavigate } from "react-router-dom";
import {
    FaMicrophone,
    FaArrowRight,
    FaQuestionCircle,
    FaCode,
    FaStickyNote
} from "react-icons/fa";

export default function Hero() {

    const navigate = useNavigate();

    const handleStartLearning = () => {
        navigate("/features/voice");
    };

    const previewFeatures = [
        {
            icon: <FaMicrophone />,
            title: "Voice Learning",
            description:
                "Ask questions using your voice and learn through natural AI-powered conversations.",
            iconBg: "bg-violet-100",
            iconColor: "text-violet-600",
            border: "border-violet-200",
            accent: "bg-violet-500"
        },
        {
            icon: <FaStickyNote />,
            title: "Smart Notes",
            description:
                "Generate clear and structured study notes from any topic for quick revision.",
            iconBg: "bg-cyan-100",
            iconColor: "text-cyan-600",
            border: "border-cyan-200",
            accent: "bg-cyan-500"
        },
        {
            icon: <FaQuestionCircle />,
            title: "AI Quizzes",
            description:
                "Create interactive quizzes automatically and test your understanding of any topic.",
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600",
            border: "border-orange-200",
            accent: "bg-orange-500"
        },
        {
            icon: <FaCode />,
            title: "Code Explainer",
            description:
                "Understand programming code with simple explanations, making complex logic easier to learn.",
            iconBg: "bg-emerald-100",
            iconColor: "text-emerald-600",
            border: "border-emerald-200",
            accent: "bg-emerald-500"
        }
    ];

    return (

        <section className="
            relative
            min-h-screen
            overflow-hidden
            bg-gradient-to-br
            from-violet-50
            via-indigo-50
            to-cyan-50
            flex
            flex-col
            items-center
            justify-center
            text-center
            px-6
            pt-28
            pb-24
        ">

            {/* =========================================
                Background Decoration
            ========================================= */}

            <div className="
                pointer-events-none
                absolute
                top-0
                left-0
                w-72
                h-72
                rounded-full
                bg-violet-200/40
                blur-3xl
            " />

            <div className="
                pointer-events-none
                absolute
                right-0
                top-40
                w-80
                h-80
                rounded-full
                bg-cyan-200/40
                blur-3xl
            " />

            <div className="
                pointer-events-none
                absolute
                bottom-0
                left-1/3
                w-96
                h-64
                rounded-full
                bg-indigo-200/30
                blur-3xl
            " />


            {/* =========================================
                Main Heading
            ========================================= */}

            <div className="relative z-10">

                <div className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-violet-200
                    bg-white/80
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-violet-700
                    shadow-sm
                ">

                    ✨ AI-Powered Learning Assistant

                </div>


                <h1 className="
                    mt-6
                    max-w-4xl
                    text-5xl
                    font-extrabold
                    tracking-tight
                    text-gray-900
                    leading-[1.1]
                    sm:text-6xl
                    md:text-7xl
                ">

                    Learn smarter.

                    <span className="
                        block
                        bg-gradient-to-r
                        from-violet-600
                        via-indigo-600
                        to-cyan-600
                        bg-clip-text
                        text-transparent
                    ">

                        Just ask your AI.

                    </span>

                </h1>


                {/* =========================================
                    Description
                ========================================= */}

                <p className="
                    mx-auto
                    mt-7
                    max-w-2xl
                    text-lg
                    leading-8
                    text-gray-600
                    md:text-xl
                ">

                    Your intelligent learning companion for understanding
                    concepts, generating notes, creating quizzes, and
                    getting help with programming.

                </p>


                {/* =========================================
                    CTA Buttons
                ========================================= */}

                <div className="
                    mt-10
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-4
                    sm:flex-row
                ">

                    <button
                        onClick={handleStartLearning}
                        className="
                            group
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            bg-violet-600
                            px-8
                            py-4
                            text-lg
                            font-bold
                            text-white
                            shadow-lg
                            shadow-violet-200
                            hover:bg-violet-700
                        "
                    >

                        <FaMicrophone />

                        Start Learning

                        <FaArrowRight className="
                            text-sm
                        " />

                    </button>


                    <button
                        onClick={() => navigate("/features")}
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-gray-300
                            bg-white
                            px-8
                            py-4
                            text-lg
                            font-bold
                            text-gray-700
                            shadow-sm
                            hover:bg-gray-50
                        "
                    >

                        Explore Features

                    </button>

                </div>

            </div>


            {/* =========================================
                Feature Section
            ========================================= */}

            <div className="
                relative
                z-10
                mt-24
                w-full
                max-w-6xl
            ">

                <div className="text-center">

                    <p className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-violet-600
                    ">

                        LEARN YOUR WAY

                    </p>

                    <h2 className="
                        mt-3
                        text-3xl
                        font-extrabold
                        text-gray-900
                        md:text-4xl
                    ">

                        Everything you need to learn

                    </h2>

                    <p className="
                        mx-auto
                        mt-3
                        max-w-xl
                        text-gray-500
                    ">

                        One AI assistant with multiple tools designed
                        to make studying easier.

                    </p>

                </div>


                {/* =========================================
                    Feature Cards
                ========================================= */}

                <div className="
                    mt-10
                    grid
                    grid-cols-1
                    gap-5
                    sm:grid-cols-2
                    lg:grid-cols-4
                ">

                    {previewFeatures.map((feature) => (

                        <div
                            key={feature.title}
                            className={`
                                relative
                                overflow-hidden
                                rounded-3xl
                                border
                                ${feature.border}
                                bg-white
                                p-6
                                text-left
                                shadow-md
                            `}
                        >

                            {/* Top Accent */}

                            <div className={`
                                absolute
                                left-0
                                top-0
                                h-1
                                w-full
                                ${feature.accent}
                            `} />


                            {/* Icon */}

                            <div className={`
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                ${feature.iconBg}
                                ${feature.iconColor}
                                text-xl
                            `}>

                                {feature.icon}

                            </div>


                            {/* Title */}

                            <h3 className="
                                mt-6
                                text-xl
                                font-extrabold
                                text-gray-900
                            ">

                                {feature.title}

                            </h3>


                            {/* Description */}

                            <p className="
                                mt-3
                                text-sm
                                leading-7
                                text-gray-600
                            ">

                                {feature.description}

                            </p>

                        </div>

                    ))}

                </div>

            </div>


            {/* =========================================
                Bottom Message
            ========================================= */}

            <div className="
                relative
                z-10
                mt-14
                rounded-full
                border
                border-gray-200
                bg-white/80
                px-5
                py-2.5
                text-sm
                font-medium
                text-gray-500
            ">

                ✨ Learn at your own pace with LearnMate AI.

            </div>

        </section>
    );
}

