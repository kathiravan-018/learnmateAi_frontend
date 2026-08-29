import { useState } from "react";

export default function useChat() {

    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);


const sendMessage = async (message) => {

    const usermessage = {
        role:"user",
        content:message
    };

    setMessages(
        previous=> [...previous, usermessage]
    )
    const startTime = performance.now();

    setLoading(true);
    setError(null);

    try {

        console.log("🚀 Sending request:", message);

        const response = await fetch(
            "http://127.0.0.1:8000/api/chat/",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message,
                    history: messages
                })
            }
        );

        console.log(
            "📡 Django response received:",
            ((performance.now() - startTime) / 1000).toFixed(2),
            "seconds"
        );

        if (!response.ok) {

            console.log("❌ Status:", response.status);
            console.log("❌ Status text:", response.statusText);

            const errorData = await response.json();

            console.log("❌ Server error:", errorData);

            throw new Error("Request failed");
        }
        const data = await response.json();

        console.log(
            "🤖 Gemini response received:",
            ((performance.now() - startTime) / 1000).toFixed(2),
            "seconds"
        );

        const assistantMessage = {
                role: "assistant",
                content: data.response
            };

        setMessages(previous => [
                ...previous,
                assistantMessage
            ]);

            setResponse(data.response);

    } catch (error) {

        console.error(error);

        setError("Something went wrong. Please try again.");

    } finally {

        console.log(
            "⏱️ Total:",
            ((performance.now() - startTime) / 1000).toFixed(2),
            "seconds"
        );

        setLoading(false);
    }
};

        return {
            response,
            loading,
            error,
            sendMessage,
            messages
        };

}