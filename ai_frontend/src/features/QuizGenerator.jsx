import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuiz from "../hooks/useQuiz";
import { useNavigate } from "react-router-dom";

export default function QuizGenerator() {

    const navigate = useNavigate();

    const [topic, setTopic] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const {
        quiz,
        loading,
        error,
        generateQuiz
    } = useQuiz();


    // =========================================
    // Generate Quiz
    // =========================================

    const handleSubmit = (event) => {

        event.preventDefault();

        if (!topic.trim()) {
            return;
        }

        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);

        generateQuiz(topic.trim());
    };


    // =========================================
    // Select Answer
    // =========================================

    const handleAnswer = (index) => {

        if (showResult) {
            return;
        }

        setSelectedAnswer(index);
    };


    // =========================================
    // Submit Answer
    // =========================================

    const handleSubmitAnswer = () => {

        if (selectedAnswer === null || !question) {
            return;
        }

        const isCorrect =
            selectedAnswer === question.correct_answer;

        if (isCorrect) {
            setScore(previous => previous + 1);
        }

        setShowResult(true);
    };


    // =========================================
    // Next Question
    // =========================================

    const handleNextQuestion = () => {

        setCurrentQuestion(previous => previous + 1);
        setSelectedAnswer(null);
        setShowResult(false);
    };


    // =========================================
    // Finish Quiz
    // =========================================

    const handleFinishQuiz = () => {

        setCurrentQuestion(quiz.questions.length);
        setSelectedAnswer(null);
        setShowResult(false);
    };


    // =========================================
    // Restart Quiz
    // =========================================

    const handleRestart = () => {

        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
    };


    // =========================================
    // Current Question
    // =========================================

    const question =
        quiz?.questions?.[currentQuestion];


    // =========================================
    // Progress
    // =========================================

    const progress =
        quiz && quiz.questions.length > 0
            ? ((currentQuestion + 1) / quiz.questions.length) * 100
            : 0;


    // =========================================
    // Quiz Completed
    // =========================================

    const quizCompleted =
        quiz &&
        currentQuestion >= quiz.questions.length;


    return (

        <section className="
            min-h-screen
            bg-gradient-to-br
            from-orange-50
            via-white
            to-amber-50
            px-4
            py-10
            sm:px-6
            lg:px-8
        ">
            

            <div className="
                mx-auto
                max-w-4xl
            ">
                 <button
                    type="button"
                    onClick={() => navigate("/features")}
                    className="
                        mb-8
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-gray-200
                        bg-white
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-gray-600
                        shadow-sm
                        transition-all
                        duration-200
                        hover:-translate-x-0.5
                        hover:border-orange-300
                        hover:bg-orange-50
                        hover:text-orange-600
                    "
                >

                    ← LearnMate

                </button>


                {/* =========================================
                    Back Button
                ========================================= */}

               


                {/* =========================================
                    Header
                ========================================= */}

                <div className="
                    mx-auto
                    max-w-3xl
                    text-center
                ">

                    <div className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-orange-200
                        bg-orange-50
                        px-4
                        py-2
                        text-sm
                        font-bold
                        text-orange-700
                        shadow-sm
                    ">

                        🧠 AI Quiz Generator

                    </div>


                    <h1 className="
                        mt-6
                        text-4xl
                        font-extrabold
                        tracking-tight
                        text-gray-900
                        sm:text-5xl
                        md:text-6xl
                    ">

                        Test Your{" "}

                        <span className="
                            text-orange-600
                        ">

                            Knowledge

                        </span>

                    </h1>


                    <p className="
                        mx-auto
                        mt-5
                        max-w-2xl
                        text-base
                        leading-7
                        text-gray-600
                        sm:text-lg
                    ">

                        Choose a topic and let LearnMate create
                        an interactive quiz to test your understanding.

                    </p>

                </div>


                {/* =========================================
                    Topic Form
                ========================================= */}

                {!quiz && (

                    <form
                        onSubmit={handleSubmit}
                        className="
                            mx-auto
                            mt-12
                            max-w-3xl
                        "
                    >

                        <div className="
                            relative
                            overflow-hidden
                            rounded-3xl
                            border
                            border-orange-200
                            bg-white
                            p-2
                            shadow-xl
                            shadow-orange-100
                            transition-all
                            duration-300
                            hover:shadow-2xl
                            hover:shadow-orange-100
                        ">

                            {/* Decorative Circle */}

                            <div className="
                                pointer-events-none
                                absolute
                                -right-16
                                -top-16
                                h-40
                                w-40
                                rounded-full
                                bg-orange-100
                                opacity-60
                                blur-2xl
                            " />


                            <div className="
                                relative
                                rounded-2xl
                                bg-gradient-to-br
                                from-orange-50
                                via-white
                                to-amber-50
                                p-6
                                sm:p-8
                            ">


                                {/* Input Header */}

                                <div className="
                                    mb-5
                                    flex
                                    items-center
                                    gap-4
                                ">

                                    <div className="
                                        flex
                                        h-12
                                        w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-orange-100
                                        text-2xl
                                        shadow-sm
                                    ">

                                        🧠

                                    </div>


                                    <div>

                                        <p className="
                                            text-base
                                            font-bold
                                            text-gray-900
                                        ">

                                            What do you want to practice?

                                        </p>


                                        <p className="
                                            mt-1
                                            text-sm
                                            text-gray-500
                                        ">

                                            Enter any subject, concept, or topic.

                                        </p>

                                    </div>

                                </div>


                                {/* =================================
                                    Input
                                ================================= */}

                                <div className="
                                    group
                                    relative
                                ">

                                    {/* Search Icon */}

                                    <div className="
                                        pointer-events-none
                                        absolute
                                        inset-y-0
                                        left-0
                                        flex
                                        items-center
                                        pl-4
                                    ">

                                        <span className="
                                            text-xl
                                            transition-transform
                                            duration-200
                                            group-focus-within:scale-110
                                        ">

                                            🔍

                                        </span>

                                    </div>


                                    <input
                                        type="text"
                                        value={topic}
                                        onChange={(event) =>
                                            setTopic(event.target.value)
                                        }
                                        placeholder="Try: Python Functions, DBMS, Computer Networks..."
                                        className="
                                            w-full
                                            rounded-2xl
                                            border
                                            border-gray-200
                                            bg-white
                                            py-4
                                            pl-12
                                            pr-4
                                            text-base
                                            font-medium
                                            text-gray-900
                                            shadow-sm
                                            outline-none
                                            transition-all
                                            duration-200
                                            placeholder:text-gray-400
                                            focus:border-orange-500
                                            focus:ring-4
                                            focus:ring-orange-100
                                            focus:shadow-md
                                        "
                                    />

                                </div>


                                {/* =================================
                                    Topic Suggestions
                                ================================= */}

                                <div className="
                                    mt-4
                                    flex
                                    flex-wrap
                                    items-center
                                    gap-2
                                ">

                                    <span className="
                                        mr-1
                                        text-xs
                                        font-semibold
                                        text-gray-400
                                    ">

                                        Try:

                                    </span>


                                    {[
                                        "Python",
                                        "DBMS",
                                        "Networking",
                                        "Data Structures"
                                    ].map((suggestion) => (

                                        <button
                                            key={suggestion}
                                            type="button"
                                            onClick={() =>
                                                setTopic(suggestion)
                                            }
                                            className="
                                                rounded-full
                                                border
                                                border-orange-100
                                                bg-white
                                                px-3
                                                py-1.5
                                                text-xs
                                                font-semibold
                                                text-gray-600
                                                shadow-sm
                                                transition-all
                                                duration-200
                                                hover:-translate-y-0.5
                                                hover:border-orange-300
                                                hover:bg-orange-50
                                                hover:text-orange-600
                                            "
                                        >

                                            {suggestion}

                                        </button>

                                    ))}

                                </div>


                                {/* =================================
                                    Generate Button
                                ================================= */}

                                <button
                                    type="submit"
                                    disabled={!topic.trim() || loading}
                                    className="
                                        mt-6
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-2xl
                                        bg-gradient-to-r
                                        from-orange-600
                                        to-amber-500
                                        py-4
                                        font-bold
                                        text-white
                                        shadow-lg
                                        shadow-orange-200
                                        transition-all
                                        duration-200
                                        hover:-translate-y-0.5
                                        hover:shadow-xl
                                        hover:shadow-orange-200
                                        disabled:cursor-not-allowed
                                        disabled:translate-y-0
                                        disabled:bg-gray-300
                                        disabled:from-gray-300
                                        disabled:to-gray-300
                                        disabled:shadow-none
                                    "
                                >

                                    {loading ? (

                                        <>

                                            <span className="
                                                h-5
                                                w-5
                                                animate-spin
                                                rounded-full
                                                border-2
                                                border-white
                                                border-t-transparent
                                            " />

                                            Creating your quiz...

                                        </>

                                    ) : (

                                        <>

                                            ✨ Generate My Quiz

                                            <span className="
                                                text-lg
                                            ">

                                                →

                                            </span>

                                        </>

                                    )}

                                </button>


                                {/* =================================
                                    Footer Hint
                                ================================= */}

                                <div className="
                                    mt-4
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    text-xs
                                    text-gray-400
                                ">

                                    <span>
                                        🤖
                                    </span>

                                    <span>
                                        AI-generated questions tailored to your topic
                                    </span>

                                </div>

                            </div>

                        </div>

                    </form>

                )}


                {/* =========================================
                    Error
                ========================================= */}

                {error && (

                    <div className="
                        mx-auto
                        mt-6
                        max-w-3xl
                        rounded-2xl
                        border
                        border-red-200
                        bg-red-50
                        px-5
                        py-4
                        text-center
                        font-medium
                        text-red-600
                    ">

                        ⚠️ {error}

                    </div>

                )}


                {/* =========================================
                    Quiz
                ========================================= */}

                {question && (

                    <div className="
                        mx-auto
                        mt-10
                        max-w-4xl
                    ">


                        {/* Question Number */}

                        <div className="
                            mb-4
                            flex
                            items-center
                            justify-between
                            gap-3
                        ">

                            <span className="
                                rounded-full
                                bg-orange-100
                                px-4
                                py-2
                                text-sm
                                font-bold
                                text-orange-700
                            ">

                                Question {currentQuestion + 1}
                                {" "}
                                / {quiz.questions.length}

                            </span>


                            <span className="
                                max-w-[50%]
                                truncate
                                rounded-full
                                bg-white
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-gray-600
                                shadow-sm
                            ">

                                {topic}

                            </span>

                        </div>


                        {/* Main Question Card */}

                        <div className="
                            overflow-hidden
                            rounded-3xl
                            border
                            border-gray-200
                            bg-white
                            shadow-xl
                            shadow-orange-100
                        ">


                            {/* Progress */}

                            <div className="
                                border-b
                                border-gray-100
                                bg-gray-50
                                px-6
                                py-5
                                sm:px-8
                            ">

                                <div className="
                                    mb-2
                                    flex
                                    items-center
                                    justify-between
                                    text-xs
                                    font-bold
                                    text-gray-500
                                ">

                                    <span>
                                        PROGRESS
                                    </span>

                                    <span>
                                        {Math.round(progress)}%
                                    </span>

                                </div>


                                <div className="
                                    h-2
                                    overflow-hidden
                                    rounded-full
                                    bg-gray-200
                                ">

                                    <div
                                        className="
                                            h-full
                                            rounded-full
                                            bg-orange-600
                                            transition-all
                                            duration-500
                                        "
                                        style={{
                                            width: `${progress}%`
                                        }}
                                    />

                                </div>

                            </div>


                            {/* Question Content */}

                            <div className="
                                p-6
                                sm:p-8
                            ">


                                {/* Question */}

                                <div className="
                                    flex
                                    items-start
                                    gap-4
                                ">

                                    <div className="
                                        flex
                                        h-12
                                        w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-orange-100
                                        text-2xl
                                    ">

                                        ❓

                                    </div>


                                    <h2 className="
                                        text-xl
                                        font-bold
                                        leading-8
                                        text-gray-900
                                        sm:text-2xl
                                    ">

                                        {question.question}

                                    </h2>

                                </div>


                                {/* =================================
                                    Options
                                ================================= */}

                                <div className="
                                    mt-8
                                    space-y-3
                                ">

                                    {question.options.map(
                                        (option, index) => {

                                            const isSelected =
                                                selectedAnswer === index;

                                            const isCorrect =
                                                index === question.correct_answer;

                                            const isWrongSelected =
                                                showResult &&
                                                isSelected &&
                                                !isCorrect;


                                            let optionStyle = `
                                                border-gray-200
                                                bg-white
                                                hover:border-orange-400
                                                hover:bg-orange-50
                                            `;


                                            if (
                                                !showResult &&
                                                isSelected
                                            ) {

                                                optionStyle = `
                                                    border-orange-500
                                                    bg-orange-50
                                                    ring-2
                                                    ring-orange-100
                                                `;

                                            }


                                            if (
                                                showResult &&
                                                isCorrect
                                            ) {

                                                optionStyle = `
                                                    border-green-500
                                                    bg-green-50
                                                    ring-2
                                                    ring-green-100
                                                `;

                                            }


                                            if (isWrongSelected) {

                                                optionStyle = `
                                                    border-red-500
                                                    bg-red-50
                                                    ring-2
                                                    ring-red-100
                                                `;

                                            }


                                            return (

                                                <button
                                                    key={index}
                                                    type="button"
                                                    disabled={showResult}
                                                    onClick={() =>
                                                        handleAnswer(index)
                                                    }
                                                    className={`
                                                        w-full
                                                        rounded-2xl
                                                        border
                                                        p-4
                                                        text-left
                                                        transition-all
                                                        duration-200
                                                        disabled:cursor-default
                                                        ${optionStyle}
                                                    `}
                                                >

                                                    <div className="
                                                        flex
                                                        items-center
                                                        gap-4
                                                    ">

                                                        <span className="
                                                            flex
                                                            h-10
                                                            w-10
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-xl
                                                            bg-gray-100
                                                            font-bold
                                                            text-gray-600
                                                        ">

                                                            {String.fromCharCode(
                                                                65 + index
                                                            )}

                                                        </span>


                                                        <span className="
                                                            flex-1
                                                            font-medium
                                                            leading-6
                                                            text-gray-700
                                                        ">

                                                            {option}

                                                        </span>


                                                        {showResult &&
                                                            isCorrect && (

                                                            <span className="
                                                                text-xl
                                                            ">

                                                                ✅

                                                            </span>

                                                        )}


                                                        {isWrongSelected && (

                                                            <span className="
                                                                text-xl
                                                            ">

                                                                ❌

                                                            </span>

                                                        )}

                                                    </div>

                                                </button>

                                            );

                                        }
                                    )}

                                </div>


                                {/* =================================
                                    Check Answer
                                ================================= */}

                                {!showResult && (

                                    <button
                                        type="button"
                                        onClick={handleSubmitAnswer}
                                        disabled={selectedAnswer === null}
                                        className="
                                            mt-7
                                            w-full
                                            rounded-xl
                                            bg-gray-900
                                            py-3.5
                                            font-bold
                                            text-white
                                            transition-all
                                            hover:bg-gray-800
                                            disabled:cursor-not-allowed
                                            disabled:bg-gray-300
                                        "
                                    >

                                        Check Answer →

                                    </button>

                                )}


                                {/* =================================
                                    Result
                                ================================= */}

                                {showResult && (

                                    <div className="
                                        mt-7
                                        rounded-2xl
                                        border
                                        border-gray-200
                                        bg-gray-50
                                        p-5
                                    ">


                                        {selectedAnswer ===
                                            question.correct_answer ? (

                                            <div>

                                                <p className="
                                                    text-lg
                                                    font-bold
                                                    text-green-600
                                                ">

                                                    ✅ Correct!

                                                </p>


                                                <p className="
                                                    mt-2
                                                    text-sm
                                                    font-medium
                                                    text-green-700
                                                ">

                                                    Great job! Keep going. 🚀

                                                </p>

                                            </div>

                                        ) : (

                                            <div>

                                                <p className="
                                                    text-lg
                                                    font-bold
                                                    text-red-600
                                                ">

                                                    ❌ Not quite right

                                                </p>


                                                <p className="
                                                    mt-2
                                                    font-medium
                                                    text-gray-800
                                                ">

                                                    Correct answer:

                                                    <span className="
                                                        ml-2
                                                        font-bold
                                                        text-green-600
                                                    ">

                                                        {
                                                            question.options[
                                                                question.correct_answer
                                                            ]
                                                        }

                                                    </span>

                                                </p>

                                            </div>

                                        )}


                                        {/* Explanation */}

                                        <div className="
                                            mt-5
                                            rounded-xl
                                            border
                                            border-gray-200
                                            bg-white
                                            p-4
                                        ">

                                            <p className="
                                                font-bold
                                                text-gray-900
                                            ">

                                                💡 Explanation

                                            </p>


                                            <p className="
                                                mt-2
                                                leading-7
                                                text-gray-600
                                            ">

                                                {question.explanation}

                                            </p>

                                        </div>


                                        {/* Next / Finish */}

                                        {currentQuestion ===
                                            quiz.questions.length - 1 ? (

                                            <button
                                                type="button"
                                                onClick={handleFinishQuiz}
                                                className="
                                                    mt-5
                                                    w-full
                                                    rounded-xl
                                                    bg-green-600
                                                    py-3.5
                                                    font-bold
                                                    text-white
                                                    transition
                                                    hover:bg-green-700
                                                "
                                            >

                                                Finish Quiz 🎉

                                            </button>

                                        ) : (

                                            <button
                                                type="button"
                                                onClick={handleNextQuestion}
                                                className="
                                                    mt-5
                                                    w-full
                                                    rounded-xl
                                                    bg-orange-600
                                                    py-3.5
                                                    font-bold
                                                    text-white
                                                    transition
                                                    hover:bg-orange-700
                                                "
                                            >

                                                Next Question →

                                            </button>

                                        )}

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                )}


                {/* =========================================
                    Final Score
                ========================================= */}

                {quizCompleted && (

                    <div className="
                        mx-auto
                        mt-10
                        max-w-3xl
                        overflow-hidden
                        rounded-3xl
                        border
                        border-orange-100
                        bg-white
                        shadow-xl
                        shadow-orange-100
                    ">


                        {/* Score Header */}

                        <div className="
                            bg-gradient-to-r
                            from-orange-600
                            to-amber-500
                            px-6
                            py-10
                            text-center
                            text-white
                        ">

                            <div className="text-6xl">
                                🎉
                            </div>


                            <h2 className="
                                mt-4
                                text-3xl
                                font-extrabold
                            ">

                                Quiz Completed!

                            </h2>


                            <p className="
                                mt-2
                                text-orange-100
                            ">

                                Here's how you performed

                            </p>

                        </div>


                        {/* Score */}

                        <div className="
                            px-6
                            py-10
                            text-center
                        ">

                            <p className="
                                text-sm
                                font-bold
                                uppercase
                                tracking-wider
                                text-gray-500
                            ">

                                Your Score

                            </p>


                            <p className="
                                mt-3
                                text-6xl
                                font-extrabold
                                text-gray-900
                            ">

                                <span className="
                                    text-orange-600
                                ">

                                    {score}

                                </span>


                                <span className="
                                    text-gray-300
                                ">

                                    {" / "}

                                </span>


                                {quiz.questions.length}

                            </p>


                            {/* Score Progress */}

                            <div className="
                                mx-auto
                                mt-5
                                h-3
                                max-w-xs
                                overflow-hidden
                                rounded-full
                                bg-gray-100
                            ">

                                <div
                                    className="
                                        h-full
                                        rounded-full
                                        bg-orange-500
                                        transition-all
                                        duration-500
                                    "
                                    style={{
                                        width: `${(
                                            score /
                                            quiz.questions.length
                                        ) * 100}%`
                                    }}
                                />

                            </div>


                            {/* Performance */}

                            <p className="
                                mt-5
                                text-lg
                                font-bold
                                text-gray-600
                            ">

                                {score === quiz.questions.length
                                    ? "🏆 Perfect score!"
                                    : score >= quiz.questions.length * 0.8
                                        ? "🌟 Excellent work!"
                                        : score >= quiz.questions.length * 0.5
                                            ? "👍 Good effort!"
                                            : "💪 Keep practicing!"
                                }

                            </p>


                            {/* Buttons */}

                            <div className="
                                mt-8
                                flex
                                flex-col
                                justify-center
                                gap-3
                                sm:flex-row
                            ">

                                <button
                                    type="button"
                                    onClick={handleRestart}
                                    className="
                                        rounded-xl
                                        bg-orange-600
                                        px-8
                                        py-3.5
                                        font-bold
                                        text-white
                                        shadow-md
                                        transition-all
                                        hover:-translate-y-0.5
                                        hover:bg-orange-700
                                        hover:shadow-lg
                                    "
                                >

                                    Try Again

                                </button>


                                <button
                                    type="button"
                                    onClick={() => navigate("/")}
                                    className="
                                        rounded-xl
                                        border
                                        border-gray-200
                                        bg-white
                                        px-8
                                        py-3.5
                                        font-bold
                                        text-gray-700
                                        transition
                                        hover:bg-gray-50
                                    "
                                >

                                    Back to LearnMate

                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </section>
    );
}
