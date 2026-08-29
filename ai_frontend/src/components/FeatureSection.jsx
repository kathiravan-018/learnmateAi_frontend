import FeatureCard from "./FeatureCard";

export default function FeatureSection() {

    return (

        <section className="
            min-h-screen
            bg-gradient-to-b
            from-sky-50
            via-white
            to-white
            px-6
            pt-32
            pb-24
        ">

            <div className="
                max-w-7xl
                mx-auto
            ">


                {/* Header */}

                <div className="
                    text-center
                    max-w-3xl
                    mx-auto
                ">

                    <div className="
                        inline-flex
                        items-center
                        gap-2
                        px-5
                        py-2.5
                        rounded-full
                        bg-sky-100
                        text-sky-700
                        font-semibold
                        text-sm
                    ">
                        ✨ LearnMate AI
                    </div>


                    <h1 className="
                        mt-7
                        text-5xl
                        md:text-6xl
                        font-extrabold
                        tracking-tight
                        text-gray-900
                        leading-tight
                    ">

                        Powerful Tools.

                        <span className="
                            block
                            text-sky-600
                        ">
                            Smarter Learning.
                        </span>

                    </h1>


                    <p className="
                        mt-6
                        text-lg
                        md:text-xl
                        text-gray-600
                        leading-8
                        max-w-2xl
                        mx-auto
                    ">

                        Everything you need to learn,
                        practice, and understand better —
                        powered by AI.

                    </p>

                </div>


                {/* Feature Grid */}

                <div className="
                    mt-16
                    grid
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-6
                ">


                    {/* Voice */}

                    <FeatureCard
                        number="01"
                        icon="🎤"
                        title="Voice Learning"
                        description="
                            Speak naturally and ask questions
                            without typing. LearnMate listens,
                            understands, and responds.
                        "
                        path="/features/voice"
                    />


                    {/* Notes */}

                    <FeatureCard
                        number="02"
                        icon="📝"
                        title="Notes Generator"
                        description="
                            Turn any topic into clear,
                            structured study notes that are
                            easier to understand and revise.
                        "
                        path="/features/notes"
                    />


                    {/* Quiz */}

                    <FeatureCard
                        number="03"
                        icon="❓"
                        title="Quiz Generator"
                        description="
                            Generate personalized quizzes,
                            test your knowledge, and improve
                            your understanding.
                        "
                        path="/features/quiz"
                    />


                    {/* Code */}

                    <FeatureCard
                        number="04"
                        icon="💻"
                        title="Code Explainer"
                        description="
                            Get simple explanations for
                            programming code and understand
                            difficult concepts faster.
                        "
                        path="/features/code"
                    />

                </div>


                {/* Bottom Hint */}

                <div className="
                    mt-16
                    text-center
                ">

                    <p className="
                        text-gray-400
                        text-sm
                        font-medium
                    ">
                        Choose a tool and start learning →
                    </p>

                </div>


            </div>

        </section>

    );

}