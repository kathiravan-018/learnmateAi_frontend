import { useState } from "react";

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

            const response = await fetch(
                "://127.0.0.1:8000/api/quiz/",
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

            if (!response.ok) {
                throw new Error("Quiz request failed");
            }

            const data = await response.json();

            setQuiz(data.quiz);

            setPreviousQuestions(
                data.quiz.questions.map(
                    question => question.question
                )
            );

        } catch (error) {

            console.error(error);

            setError(
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