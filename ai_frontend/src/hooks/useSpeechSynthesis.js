import { useState, useEffect, useCallback, useRef } from "react";

export default function useSpeechSynthesis() {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState([]);

    const utteranceRef = useRef(null);

    // Load browser voices
    useEffect(() => {
        if (!("speechSynthesis" in window)) {
            console.error("Speech synthesis is not supported.");
            return;
        }

        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();

            if (availableVoices.length > 0) {
                setVoices(availableVoices);
            }
        };

        // Try immediately
        loadVoices();

        // Chrome loads voices asynchronously
        window.speechSynthesis.addEventListener(
            "voiceschanged",
            loadVoices
        );

        return () => {
            window.speechSynthesis.removeEventListener(
                "voiceschanged",
                loadVoices
            );

            window.speechSynthesis.cancel();
        };
    }, []);

    const speak = useCallback((text) => {
        if (!text || !("speechSynthesis" in window)) {
            return;
        }

        // Stop previous speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        utteranceRef.current = utterance;

        // Select a voice if available
        if (voices.length > 0) {
            const englishVoice =
                voices.find(
                    (voice) =>
                        voice.lang.startsWith("en-IN")
                ) ||
                voices.find(
                    (voice) =>
                        voice.lang.startsWith("en-US")
                ) ||
                voices.find(
                    (voice) =>
                        voice.lang.startsWith("en")
                );

            if (englishVoice) {
                utterance.voice = englishVoice;
            }
        }

        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onstart = () => {
            console.log("🔊 Speech started");
            setIsSpeaking(true);
        };

        utterance.onend = () => {
            console.log("🔊 Speech ended");
            setIsSpeaking(false);
            utteranceRef.current = null;
        };

        utterance.onerror = (event) => {
            console.error(
                "🔊 Speech synthesis error:",
                event.error
            );

            setIsSpeaking(false);
            utteranceRef.current = null;
        };

        window.speechSynthesis.speak(utterance);

    }, [voices]);

    const stopSpeaking = useCallback(() => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }

        utteranceRef.current = null;
        setIsSpeaking(false);
    }, []);

    return {
        speak,
        stopSpeaking,
        isSpeaking
    };
}