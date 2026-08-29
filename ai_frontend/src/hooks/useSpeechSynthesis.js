import { useState, useEffect } from "react";

export default function useSpeechSynthesis() {

    const [isSpeaking, setIsSpeaking] = useState(false);

    const speak = (text) => {

        speechSynthesis.cancel();

        const utterance =
            new SpeechSynthesisUtterance(text);

        utterance.onstart = () => {
            setIsSpeaking(true);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
        };

        utterance.onerror = () => {
            setIsSpeaking(false);
        };

        speechSynthesis.speak(utterance);
    };

    const stopSpeaking = () => {

        speechSynthesis.cancel();

        setIsSpeaking(false);

    };

    useEffect(() => {

        return () => {

            speechSynthesis.cancel();

        };

    }, []);

    return {
        speak,
        stopSpeaking,
        isSpeaking
    };
}