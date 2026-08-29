import { useState } from "react";

export default function useNotes() {

    const [notesText, setNotesText] = useState("");
    const [loading, setLoading] = useState(false);
    const [notesError, setNotesError] = useState(null);


    const generate_Notes = async (topic) => {

        if (!topic.trim()) {
            return;
        }

        setNotesText("");
        setLoading(true);
        setNotesError(null);

        try {

    const response = await fetch(
        "http://127.0.0.1:8000/api/notes/",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                topic
            })
        }
    );

    if (!response.ok) {
        throw new Error(
            `Notes request failed: ${response.status}`
        );
    }

    const data = await response.json();

    console.log(
        "📝 Full response:",
        JSON.stringify(data, null, 2)
    );

    console.log("📝 data.response:", data?.response);

    console.log(
        "📝 response type:",
        typeof data?.response
    );

    setNotesText(data?.response ?? "");

} catch (error) {

    console.error("❌ Notes error:", error);

    setNotesError(
        "Unable to generate notes. Please try again."
    );

} finally {

    setLoading(false);

}

    };


    return {
        notesText,
        loading,
        notesError,
        generate_Notes
    };

}