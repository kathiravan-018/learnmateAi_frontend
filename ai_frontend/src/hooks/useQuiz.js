import { useState } from "react";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://learnmateai-backend.onrender.com/api/quiz/";

export default function useQuiz() {

    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [previousQuestions, setPreviousQuestions] = useState([]);


    const generateQuiz = async (topic) => {

        if (!topic.trim()) {
            return;
        }

        setLoading(true);
        setError(null);
        setQuiz(null);

        try {

            console.log(
                "Previous questions:",
                previousQuestions
            );

            console.log(
                "Quiz API URL:",
                `${API_URL}/quiz/`
            );

            const response = await fetch(
                `${API_URL}/quiz/`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        topic: topic,
                        previous_questions: previousQuestions
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.error || "Quiz request failed"
                );
            }

            setQuiz(data.quiz);

            setPreviousQuestions(
                data.quiz.questions.map(
                    question => question.question
                )
            );

        } catch (error) {

            console.error(
                "❌ Quiz Error:",
                error
            );

            setError(
                error.message ||
                "Unable to generate quiz. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };


    return {
        quiz,
        loading,
        error,
        generateQuiz
    };
}