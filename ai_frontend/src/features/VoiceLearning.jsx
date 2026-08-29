import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaMicrophone,
    FaArrowUp,
    FaArrowLeft
} from "react-icons/fa";

import useSpeechRecognition from "../hooks/useSpeechRecognition";
import useSpeechSynthesis from "../hooks/useSpeechSynthesis";
import useChat from "../hooks/useChat";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


export default function VoiceLearning() {

    const navigate = useNavigate();

    // =========================================
    // Refs
    // =========================================

    const wasListeningRef = useRef(false);
    const conversationEndRef = useRef(null);


    // =========================================
    // State
    // =========================================

    const [searchText, setSearchText] = useState("");
    const [showScrollTop, setShowScrollTop] = useState(false);


    // =========================================
    // Speech Recognition
    // =========================================

    const {
        transcript,
        startListening,
        stopListening,
        isListening,
        interimTranscript,
        listeningError
    } = useSpeechRecognition();


    // =========================================
    // Speech Synthesis
    // =========================================

    const {
        speak,
        stopSpeaking,
        isSpeaking
    } = useSpeechSynthesis();


    // =========================================
    // Chat
    // =========================================

    const {
        response,
        loading,
        error,
        sendMessage,
        messages
    } = useChat();


    // =========================================
    // Microphone
    // =========================================

    const handleMicrophone = () => {

        if (isListening) {

            stopListening();

        } else {

            stopSpeaking();
            startListening();

        }

    };


    // =========================================
    // Clean Markdown for Speech
    // =========================================

    const cleanTextForSpeech = (text) => {

        return text
            // Remove fenced code blocks
            .replace(/```[\s\S]*?```/g, "")

            // Remove headings
            .replace(/^#{1,6}\s+/gm, "")

            // Remove bold
            .replace(/\*\*(.*?)\*\*/g, "$1")

            // Remove italic
            .replace(/\*(.*?)\*/g, "$1")

            // Remove underline
            .replace(/__(.*?)__/g, "$1")

            // Remove underscore italic
            .replace(/_(.*?)_/g, "$1")

            // Remove inline code
            .replace(/`([^`]+)`/g, "$1")

            // Remove Markdown links
            .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

            // Remove unordered list markers
            .replace(/^\s*[-*+]\s+/gm, "")

            // Remove numbered list markers
            .replace(/^\s*\d+[.)]\s+/gm, "")

            // Remove blockquotes
            .replace(/^\s*>\s?/gm, "")

            // Replace dash characters
            .replace(/[–—−]/g, " ")

            // Remove bullet characters
            .replace(/[•◦▪▫]/g, " ")

            // Remove table separator rows
            .replace(/^\s*\|?[\s:|-]+\|?\s*$/gm, "")

            // Remove table pipes
            .replace(/\|/g, " ")

            // Convert line breaks into pauses
            .replace(/\n+/g, ". ")

            // Remove excessive whitespace
            .replace(/\s+/g, " ")

            .trim();

    };


    // =========================================
    // Send Voice Message
    // =========================================

    useEffect(() => {

        if (
            wasListeningRef.current &&
            !isListening &&
            transcript.trim()
        ) {

            sendMessage(transcript);

        }

        wasListeningRef.current = isListening;

    }, [isListening, transcript, sendMessage]);


    // =========================================
    // Speak AI Response
    // =========================================

    useEffect(() => {

        if (!response) {
            return;
        }

        const cleanText = cleanTextForSpeech(response);

        if (cleanText) {
            speak(cleanText);
        }

    }, [response, speak]);


    // =========================================
    // Text Search
    // =========================================

    const handleSearch = () => {

        if (!searchText.trim() || loading) {
            return;
        }

        stopSpeaking();

        sendMessage(searchText.trim());

        setSearchText("");

    };


    // =========================================
    // Enter Key
    // =========================================

    const handleSearchKeyDown = (event) => {

        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }

    };


    // =========================================
    // Auto Scroll to Latest Message
    // =========================================

    useEffect(() => {

        if (messages.length > 0 || loading) {

            setTimeout(() => {

                conversationEndRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                });

            }, 100);

        }

    }, [messages, loading]);


    // =========================================
    // Detect Page Scroll
    // =========================================

    useEffect(() => {

        const handleScroll = () => {

            setShowScrollTop(window.scrollY > 500);

        };

        window.addEventListener("scroll", handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);


    // =========================================
    // Scroll to Top
    // =========================================

    const scrollToTop = () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // =========================================
    // UI
    // =========================================

    return (

        <section
            className="
                min-h-screen
                bg-gradient-to-b
                from-green-50
                via-white
                to-white
                flex
                flex-col
                items-center
                px-6
                pt-20
                pb-20
            "
        >

            {/* =========================================
                Back Button
            ========================================= */}

            <div className="w-full max-w-5xl mb-8">

                <button
                    type="button"
                    onClick={() => navigate("/features")}
                    className="
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
                        hover:border-green-300
                        hover:bg-green-50
                        hover:text-green-600
                    "
                >

                    <FaArrowLeft className="text-xs" />

                    LearnMate

                </button>

            </div>


            {/* =========================================
                Header
            ========================================= */}

            <div
                className="
                    text-center
                    max-w-4xl
                "
            >

                <div
                    className="
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-full
                        bg-green-100
                        text-green-700
                        font-semibold
                        text-sm
                        mb-6
                    "
                >

                    🎤 Voice Learning

                </div>


                <h1
                    className="
                        text-5xl
                        md:text-6xl
                        font-extrabold
                        tracking-tight
                        text-gray-900
                    "
                >

                    Learn Through

                    <span
                        className="
                            block
                            text-green-600
                        "
                    >
                        Your Voice.
                    </span>

                </h1>


                <p
                    className="
                        mt-6
                        text-lg
                        md:text-xl
                        text-gray-600
                        leading-8
                        max-w-3xl
                        mx-auto
                    "
                >

                    Ask LearnMate questions naturally using your voice.
                    Get AI-powered explanations and listen to the answers.

                </p>

            </div>


            {/* =========================================
                Main Voice Area
            ========================================= */}

            <div
                className="
                    mt-12
                    flex
                    flex-col
                    items-center
                    w-full
                    max-w-3xl
                "
            >

                {/* =====================================
                    Text Search
                ===================================== */}

                <div
                    className="
                        w-full
                        max-w-2xl
                        mb-10
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            rounded-2xl
                            border
                            border-gray-200
                            bg-white
                            p-2
                            shadow-lg
                            shadow-green-100
                            focus-within:border-green-500
                            focus-within:ring-4
                            focus-within:ring-green-100
                        "
                    >

                        <span
                            className="
                                pl-3
                                text-xl
                            "
                        >
                            🔍
                        </span>


                        <input
                            type="text"
                            value={searchText}
                            onChange={(event) =>
                                setSearchText(event.target.value)
                            }
                            onKeyDown={handleSearchKeyDown}
                            placeholder="Ask LearnMate anything..."
                            className="
                                flex-1
                                min-w-0
                                bg-transparent
                                px-2
                                py-3
                                text-gray-700
                                outline-none
                                placeholder:text-gray-400
                            "
                        />


                        <button
                            type="button"
                            onClick={handleSearch}
                            disabled={!searchText.trim() || loading}
                            className="
                                shrink-0
                                rounded-xl
                                bg-green-600
                                px-6
                                py-3
                                text-white
                                font-semibold
                                hover:bg-green-700
                                disabled:bg-gray-300
                                disabled:cursor-not-allowed
                            "
                        >

                            {loading ? "Thinking..." : "Ask"}

                        </button>

                    </div>


                    <p
                        className="
                            mt-3
                            text-center
                            text-sm
                            text-gray-400
                        "
                    >

                        Type your question or use the microphone below 🎤

                    </p>

                </div>


                {/* =====================================
                    Microphone
                ===================================== */}

                <button
                    type="button"
                    onClick={handleMicrophone}
                    aria-label={
                        isListening
                            ? "Stop listening"
                            : "Start listening"
                    }
                    className={`
                        relative
                        w-32
                        h-32
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-white
                        text-4xl
                        shadow-xl
                        ${
                            isListening
                                ? "bg-red-500 scale-110 shadow-red-200"
                                : "bg-gradient-to-r from-green-600 to-green-500"
                        }
                    `}
                >

                    {isListening && (

                        <span
                            className="
                                absolute
                                inset-0
                                rounded-full
                                border-4
                                border-red-300
                                animate-ping
                            "
                        />

                    )}

                    <FaMicrophone />

                </button>


                {/* =====================================
                    Listening Status
                ===================================== */}

                <p
                    className="
                        mt-5
                        font-semibold
                        text-gray-700
                    "
                >

                    {isListening
                        ? "🎤 Listening..."
                        : "Click the microphone to speak"
                    }

                </p>


                {/* =====================================
                    Speech Recognition Error
                ===================================== */}

                {listeningError && (

                    <p
                        className="
                            mt-3
                            text-red-500
                            font-medium
                            text-center
                        "
                    >

                        ⚠️ Speech recognition error: {listeningError}

                    </p>

                )}


                {/* =====================================
                    Transcript Card
                ===================================== */}

                <div
                    className="
                        mt-8
                        w-full
                        min-w-0
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        shadow-xl
                        shadow-green-100
                        p-6
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            mb-4
                        "
                    >

                        <h3
                            className="
                                font-bold
                                text-lg
                                text-gray-900
                            "
                        >

                            🎤 Your Question

                        </h3>


                        {transcript && (

                            <span
                                className="
                                    text-xs
                                    font-medium
                                    text-green-600
                                    bg-green-50
                                    px-3
                                    py-1
                                    rounded-full
                                "
                            >

                                Ready

                            </span>

                        )}

                    </div>


                    <div
                        className="
                            min-h-20
                            w-full
                            min-w-0
                            rounded-xl
                            bg-gray-50
                            p-4
                            text-left
                            text-gray-700
                            leading-7
                            break-words
                            overflow-hidden
                        "
                    >

                        {transcript || interimTranscript ? (

                            <>

                                <span className="break-words">
                                    {transcript}
                                </span>

                                {" "}

                                <span className="text-gray-400 break-words">
                                    {interimTranscript}
                                </span>

                            </>

                        ) : (

                            <span className="text-gray-400">
                                Your speech will appear here...
                            </span>

                        )}

                    </div>

                </div>


                {/* =====================================
                    Chat Error
                ===================================== */}

                {error && (

                    <p
                        className="
                            mt-4
                            text-red-500
                            text-center
                        "
                    >
                        {error}
                    </p>

                )}


                {/* =====================================
                    Conversation
                ===================================== */}

                {messages.length > 0 && (

                    <div
                        className="
                            mt-6
                            w-full
                            min-w-0
                            space-y-4
                        "
                    >

                        {messages.map((message, index) => (

                            <div
                                key={index}
                                className="w-full min-w-0"
                            >

                                {/* =================================
                                    USER MESSAGE
                                ================================= */}

                                {message.role === "user" ? (

                                    <div className="text-right">

                                        <div
                                            className="
                                                inline-block
                                                max-w-[80%]
                                                min-w-0
                                                rounded-2xl
                                                bg-green-600
                                                px-5
                                                py-3
                                                text-white
                                                break-words
                                                overflow-hidden
                                                whitespace-pre-wrap
                                            "
                                        >

                                            {message.content}

                                        </div>

                                    </div>

                                ) : (

                                    /* =================================
                                        ASSISTANT MESSAGE
                                    ================================= */

                                    <div className="text-left w-full min-w-0">

                                        <div
                                            className="
                                                max-w-[80%]
                                                min-w-0
                                                overflow-hidden
                                                rounded-2xl
                                                bg-green-100
                                                px-5
                                                py-4
                                                text-gray-700
                                                break-words
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    items-start
                                                    gap-2
                                                    min-w-0
                                                "
                                            >

                                                <span className="shrink-0">
                                                    🤖
                                                </span>


                                                <div
                                                    className="
                                                        flex-1
                                                        min-w-0
                                                        max-w-full
                                                        overflow-hidden
                                                    "
                                                >

                                                    <ReactMarkdown
                                                        remarkPlugins={[
                                                            remarkGfm
                                                        ]}
                                                        components={{

                                                            h1: ({ children }) => (

                                                                <h1
                                                                    className="
                                                                        text-2xl
                                                                        font-bold
                                                                        mt-6
                                                                        mb-3
                                                                        break-words
                                                                    "
                                                                >
                                                                    {children}
                                                                </h1>

                                                            ),

                                                            h2: ({ children }) => (

                                                                <h2
                                                                    className="
                                                                        text-xl
                                                                        font-bold
                                                                        mt-5
                                                                        mb-3
                                                                        break-words
                                                                    "
                                                                >
                                                                    {children}
                                                                </h2>

                                                            ),

                                                            h3: ({ children }) => (

                                                                <h3
                                                                    className="
                                                                        text-lg
                                                                        font-bold
                                                                        mt-4
                                                                        mb-2
                                                                        break-words
                                                                    "
                                                                >
                                                                    {children}
                                                                </h3>

                                                            ),

                                                            p: ({ children }) => (

                                                                <p
                                                                    className="
                                                                        mb-4
                                                                        break-words
                                                                        whitespace-normal
                                                                    "
                                                                >
                                                                    {children}
                                                                </p>

                                                            ),

                                                            ul: ({ children }) => (

                                                                <ul
                                                                    className="
                                                                        list-disc
                                                                        pl-6
                                                                        mb-4
                                                                        space-y-1
                                                                        break-words
                                                                    "
                                                                >
                                                                    {children}
                                                                </ul>

                                                            ),

                                                            ol: ({ children }) => (

                                                                <ol
                                                                    className="
                                                                        list-decimal
                                                                        pl-6
                                                                        mb-4
                                                                        space-y-1
                                                                        break-words
                                                                    "
                                                                >
                                                                    {children}
                                                                </ol>

                                                            ),

                                                            li: ({ children }) => (

                                                                <li className="break-words">
                                                                    {children}
                                                                </li>

                                                            ),

                                                            strong: ({ children }) => (

                                                                <strong
                                                                    className="
                                                                        font-bold
                                                                        text-gray-900
                                                                    "
                                                                >
                                                                    {children}
                                                                </strong>

                                                            ),

                                                            table: ({ children }) => (

                                                                <div
                                                                    className="
                                                                        my-6
                                                                        w-full
                                                                        max-w-full
                                                                        overflow-x-auto
                                                                        rounded-lg
                                                                        border
                                                                        border-gray-200
                                                                    "
                                                                >

                                                                    <table
                                                                        className="
                                                                            w-full
                                                                            min-w-max
                                                                            border-collapse
                                                                            text-sm
                                                                        "
                                                                    >
                                                                        {children}
                                                                    </table>

                                                                </div>

                                                            ),

                                                            thead: ({ children }) => (

                                                                <thead
                                                                    className="
                                                                        bg-green-600
                                                                        text-white
                                                                    "
                                                                >
                                                                    {children}
                                                                </thead>

                                                            ),

                                                            th: ({ children }) => (

                                                                <th
                                                                    className="
                                                                        border-b
                                                                        border-gray-200
                                                                        px-4
                                                                        py-3
                                                                        text-left
                                                                        font-bold
                                                                        whitespace-nowrap
                                                                    "
                                                                >
                                                                    {children}
                                                                </th>

                                                            ),

                                                            td: ({ children }) => (

                                                                <td
                                                                    className="
                                                                        border-b
                                                                        border-gray-200
                                                                        bg-gray-50
                                                                        px-4
                                                                        py-3
                                                                        text-gray-700
                                                                        align-top
                                                                    "
                                                                >
                                                                    {children}
                                                                </td>

                                                            ),

                                                            pre: ({ children }) => (

                                                                <pre
                                                                    className="
                                                                        my-5
                                                                        max-w-full
                                                                        overflow-x-auto
                                                                        rounded-xl
                                                                        bg-gray-800
                                                                        p-5
                                                                        text-gray-100
                                                                        text-sm
                                                                        md:text-base
                                                                        leading-7
                                                                    "
                                                                >
                                                                    {children}
                                                                </pre>

                                                            ),

                                                            code: ({ children }) => (

                                                                <code
                                                                    className="
                                                                        font-mono
                                                                        break-words
                                                                    "
                                                                >
                                                                    {children}
                                                                </code>

                                                            )

                                                        }}
                                                    >

                                                        {message.content}

                                                    </ReactMarkdown>

                                                </div>

                                            </div>

                                        </div>


                                        {/* =================================
                                            Speaking Status
                                        ================================= */}

                                        {isSpeaking &&
                                            index === messages.length - 1 &&
                                            message.role === "assistant" && (

                                                <div
                                                    className="
                                                        mt-3
                                                        ml-7
                                                    "
                                                >

                                                    <p
                                                        className="
                                                            text-green-600
                                                            font-semibold
                                                        "
                                                    >
                                                        🔊 LearnMate is speaking...
                                                    </p>


                                                    <button
                                                        type="button"
                                                        onClick={stopSpeaking}
                                                        className="
                                                            mt-3
                                                            px-5
                                                            py-2
                                                            rounded-lg
                                                            bg-red-500
                                                            text-white
                                                            font-semibold
                                                            hover:bg-red-600
                                                        "
                                                    >

                                                        🛑 Stop Speaking

                                                    </button>

                                                </div>

                                            )}

                                    </div>

                                )}

                            </div>

                        ))}


                        {/* =================================
                            Loading
                        ================================= */}

                        {loading && (

                            <div className="text-left">

                                <div
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-2xl
                                        bg-green-50
                                        px-5
                                        py-4
                                        text-gray-500
                                    "
                                >

                                    <span
                                        className="
                                            w-2
                                            h-2
                                            rounded-full
                                            bg-gray-400
                                            animate-bounce
                                        "
                                    />

                                    <span
                                        className="
                                            w-2
                                            h-2
                                            rounded-full
                                            bg-gray-400
                                            animate-bounce
                                            [animation-delay:150ms]
                                        "
                                    />

                                    <span
                                        className="
                                            w-2
                                            h-2
                                            rounded-full
                                            bg-gray-400
                                            animate-bounce
                                            [animation-delay:300ms]
                                        "
                                    />

                                    <span className="ml-2">
                                        LearnMate is thinking...
                                    </span>

                                </div>

                            </div>

                        )}


                        {/* =================================
                            Scroll Target
                        ================================= */}

                        <div
                            ref={conversationEndRef}
                            className="h-1"
                        />

                    </div>

                )}

            </div>


            {/* =========================================
                Scroll To Top
            ========================================= */}

            {showScrollTop && (

                <button
                    type="button"
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    title="Back to top"
                    className="
                        fixed
                        bottom-6
                        right-6
                        z-50
                        w-12
                        h-12
                        rounded-full
                        bg-green-600
                        text-white
                        flex
                        items-center
                        justify-center
                        shadow-xl
                        hover:bg-green-700
                    "
                >

                    <FaArrowUp className="text-lg" />

                </button>

            )}

        </section>

    );

}