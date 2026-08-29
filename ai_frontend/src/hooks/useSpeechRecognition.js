import { useState, useRef, useEffect } from "react";

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

export default function useSpeechRecognition() {

    const [transcript, setTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [interimTranscript, setInterimTranscript] = useState("");
    const [listeningError, setListeningError] = useState(null);

    const recognitionRef = useRef(null);
    const transcriptRef = useRef("");

    useEffect(() => {

        if (!SpeechRecognition) {
            console.error("Speech Recognition is not supported.");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {

            const result = event.results[event.resultIndex];

            const text = result[0].transcript;

            if (result.isFinal) {

                transcriptRef.current =
                    transcriptRef.current + text + " ";

                setTranscript(transcriptRef.current);

                setInterimTranscript("");

            } else {

                setInterimTranscript(text);

            }

        };

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onspeechend = () => {

            console.log("🗣️ User stopped speaking");

        };

        recognition.onerror = (event) => {

            console.error(
                "Speech recognition error:",
                event.error
            );

            setListeningError(event.error);
            setIsListening(false);

        };

        recognition.onend = () => {

            setIsListening(false);

            console.log(
                "Final transcript:",
                transcriptRef.current
            );

            console.log("User Stopped Speaking");

        };

        recognitionRef.current = recognition;

        return () => {

            recognition.abort();

            recognitionRef.current = null;

        };

    }, []);

    const startListening = () => {

        if (recognitionRef.current) {

            transcriptRef.current = "";

            setTranscript("");
            setInterimTranscript("");
            setListeningError(null);

            recognitionRef.current.start();

        }

    };

    const stopListening = () => {

        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }

    };

    return {
        transcript,
        isListening,
        startListening,
        stopListening,
        interimTranscript,
        listeningError
    };
}