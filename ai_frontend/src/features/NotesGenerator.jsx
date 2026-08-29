import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useNotes from "../hooks/useNotes";
import { useNavigate } from "react-router-dom";


export default function NotesGenerator() {
    
    const navigate = useNavigate();

    const [topic, setTopic] = useState("");


    const {
        notesText,
        loading,
        notesError,
        generate_Notes
    } = useNotes();


    const handleSubmit = (event) => {

        event.preventDefault();

        if (!topic.trim()) {
            return;
        }

        generate_Notes(topic);

    };


    return (

        <section className="
            min-h-screen
            bg-gradient-to-b
            from-cyan-50
            via-white
            to-cyan-100
            px-6
            pt-28
            pb-24
        ">
            

            <div className="
                max-w-5xl
                mx-auto
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
                        hover:border-cyan-300
                        hover:bg-cyan-50
                        hover:text-cyan-600
                    "
                >

                    ← LearnMate

                </button>



                {/* =========================================
                    Header
                ========================================= */}

                <div className="text-center">

                    <div className="
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-full
                        bg-cyan-100
                        text-cyan-700
                        font-semibold
                        text-sm
                    ">

                        📝 AI Notes Generator

                    </div>


                    <h1 className="
                        mt-6
                        text-4xl
                        md:text-6xl
                        font-extrabold
                        tracking-tight
                        text-gray-900
                    ">

                        Turn Any Topic Into

                        <span className="
                            block
                            text-cyan-600
                        ">

                            Smart Study Notes

                        </span>

                    </h1>


                    <p className="
                        mt-5
                        max-w-2xl
                        mx-auto
                        text-lg
                        md:text-xl
                        text-gray-600
                        leading-8
                    ">

                        Enter a topic and LearnMate will create
                        clear, structured notes designed for
                        quick revision.

                    </p>

                </div>


                {/* =========================================
                    Prompt Box
                ========================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="
                        mt-12
                        max-w-4xl
                        mx-auto
                    "
                >

                    <div className="
                        rounded-3xl
                        border
                        border-gray-200
                        bg-white
                        shadow-xl
                        shadow-cyan-100
                        p-3
                    ">

                        <div className="
                            rounded-2xl
                            bg-gray-50
                            p-5
                        ">

                            <label className="
                                block
                                text-sm
                                font-semibold
                                text-gray-700
                                mb-3
                            ">

                                What do you want to learn?

                            </label>


                            <input
                                type="text"
                                value={topic}
                                onChange={(event) =>
                                    setTopic(event.target.value)
                                }
                                placeholder="
                                    e.g. Python Functions,
                                    DBMS Transactions,
                                    Computer Networks...
                                "
                                className="
                                    w-full
                                    bg-transparent
                                    text-lg
                                    text-gray-900
                                    placeholder:text-gray-400
                                    outline-none
                                "
                            />


                            <div className="
                                mt-5
                                flex
                                flex-col
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                                gap-4
                            ">

                                <p className="
                                    text-sm
                                    text-gray-400
                                ">

                                    💡 Try a topic you are currently studying.

                                </p>


                                <button
                                    type="submit"
                                    disabled={!topic.trim() || loading}
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        px-6
                                        py-3
                                        rounded-xl
                                        bg-cyan-600
                                        text-white
                                        font-semibold
                                        shadow-md
                                        hover:bg-cyan-700
                                        hover:shadow-lg
                                        disabled:bg-gray-300
                                        disabled:cursor-not-allowed
                                        transition-all
                                        duration-200
                                    "
                                >

                                    {loading ? (

                                        <>

                                            <span className="
                                                w-4
                                                h-4
                                                rounded-full
                                                border-2
                                                border-white
                                                border-t-transparent
                                                animate-spin
                                            " />

                                            Generating...

                                        </>

                                    ) : (

                                        <>
                                            ✨ Generate Notes
                                        </>

                                    )}

                                </button>

                            </div>

                        </div>

                    </div>

                </form>


                {/* =========================================
                    Error
                ========================================= */}

                {notesError && (

                    <div className="
                        mt-6
                        max-w-4xl
                        mx-auto
                        rounded-2xl
                        border
                        border-red-200
                        bg-red-50
                        px-5
                        py-4
                        text-red-600
                        font-medium
                    ">

                        ⚠️ {notesError}

                    </div>

                )}


                {/* =========================================
                    Loading
                ========================================= */}

                {loading && (

                    <div className="
                        mt-10
                        max-w-4xl
                        mx-auto
                        flex
                        flex-col
                        items-center
                        justify-center
                        py-16
                        text-center
                    ">

                        <div className="
                            w-12
                            h-12
                            rounded-full
                            border-4
                            border-cyan-100
                            border-t-cyan-600
                            animate-spin
                        " />

                        <p className="
                            mt-5
                            text-lg
                            font-semibold
                            text-gray-700
                        ">

                            🤖 LearnMate is generating your notes...

                        </p>

                        <p className="
                            mt-2
                            text-sm
                            text-gray-400
                        ">

                            Organizing your topic into
                            easy-to-revise sections.

                        </p>

                    </div>

                )}


                {/* =========================================
                    Response
                ========================================= */}

                {typeof notesText === "string" &&
                    notesText.trim() !== "" && (

                    <div className="
                        mt-10
                        max-w-4xl
                        mx-auto
                    ">


                        {/* Response Header */}

                        <div className="
                            flex
                            flex-col
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                            gap-3
                            mb-4
                        ">


                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                <div className="
                                    flex
                                    items-center
                                    justify-center
                                    w-11
                                    h-11
                                    rounded-xl
                                    bg-cyan-100
                                    text-2xl
                                ">

                                    📝

                                </div>


                                <div>

                                    <h2 className="
                                        text-xl
                                        font-bold
                                        text-gray-900
                                    ">

                                        Generated Notes

                                    </h2>


                                    <p className="
                                        text-sm
                                        text-gray-500
                                    ">

                                        Created by LearnMate AI

                                    </p>

                                </div>

                            </div>


                            {!loading && (

                                <span className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    px-3
                                    py-1.5
                                    rounded-full
                                    bg-green-50
                                    text-green-600
                                    text-sm
                                    font-semibold
                                ">

                                    <span className="
                                        w-2
                                        h-2
                                        rounded-full
                                        bg-green-500
                                    " />

                                    Ready

                                </span>

                            )}

                        </div>


                        {/* Response Container */}

                        <div className="
                            rounded-3xl
                            border
                            border-gray-200
                            bg-white
                            shadow-lg
                            overflow-hidden
                        ">


                            {/* Browser-style Top Bar */}

                            <div className="
                                px-6
                                py-4
                                border-b
                                border-gray-100
                                bg-gray-50
                            ">

                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                ">

                                    <span className="
                                        w-2.5
                                        h-2.5
                                        rounded-full
                                        bg-red-400
                                    " />

                                    <span className="
                                        w-2.5
                                        h-2.5
                                        rounded-full
                                        bg-yellow-400
                                    " />

                                    <span className="
                                        w-2.5
                                        h-2.5
                                        rounded-full
                                        bg-green-400
                                    " />

                                    <span className="
                                        ml-3
                                        text-sm
                                        text-gray-400
                                    ">

                                        LearnMate Notes

                                    </span>

                                </div>

                            </div>


                            {/* Response Body */}

                            <div className="
                                p-7
                                md:p-10
                            ">

                                <div className="
                                    text-gray-700
                                    leading-8
                                ">

                                   <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{

        h1: ({ children }) => (
            <h1 className="
                text-3xl
                font-extrabold
                text-gray-900
                mt-2
                mb-6
            ">
                {children}
            </h1>
        ),

        h2: ({ children }) => (
            <h2 className="
                text-2xl
                font-bold
                text-gray-900
                mt-8
                mb-4
                pb-2
                border-b
                border-gray-100
            ">
                {children}
            </h2>
        ),

        h3: ({ children }) => (
            <h3 className="
                text-xl
                font-bold
                text-gray-900
                mt-6
                mb-3
            ">
                {children}
            </h3>
        ),

        p: ({ children }) => (
            <p className="
                mb-5
                text-gray-700
                leading-8
            ">
                {children}
            </p>
        ),

        ul: ({ children }) => (
            <ul className="
                list-disc
                pl-7
                mb-6
                space-y-2
            ">
                {children}
            </ul>
        ),

        ol: ({ children }) => (
            <ol className="
                list-decimal
                pl-7
                mb-6
                space-y-2
            ">
                {children}
            </ol>
        ),

        li: ({ children }) => (
            <li className="pl-1">
                {children}
            </li>
        ),

        strong: ({ children }) => (
            <strong className="
                font-bold
                text-gray-900
            ">
                {children}
            </strong>
        ),

        /* =========================
           TABLE
        ========================= */

        table: ({ children }) => (
            <div className="
                my-8
                w-full
                overflow-x-auto
                rounded-xl
                border
                border-gray-200
            ">
                <table className="
                    w-full
                    min-w-[600px]
                    border-collapse
                    text-sm
                ">
                    {children}
                </table>
            </div>
        ),

        thead: ({ children }) => (
            <thead className="
                bg-cyan-50
            ">
                {children}
            </thead>
        ),

        tbody: ({ children }) => (
            <tbody className="
                bg-white
            ">
                {children}
            </tbody>
        ),

        tr: ({ children }) => (
            <tr className="
                border-b
                border-gray-200
                last:border-b-0
            ">
                {children}
            </tr>
        ),

        th: ({ children }) => (
            <th className="
                border
                border-gray-200
                px-5
                py-3
                text-left
                font-bold
                text-gray-900
                whitespace-nowrap
            ">
                {children}
            </th>
        ),

        td: ({ children }) => (
            <td className="
                border
                border-gray-200
                px-5
                py-3
                text-left
                text-gray-700
                align-top
                leading-7
            ">
                {children}
            </td>
        ),

        blockquote: ({ children }) => (
            <blockquote className="
                my-6
                border-l-4
                border-cyan-500
                bg-cyan-50
                px-5
                py-4
                rounded-r-xl
                text-gray-700
            ">
                {children}
            </blockquote>
        ),

        code: ({ children }) => (
            <code className="
                rounded-md
                bg-gray-100
                px-1.5
                py-0.5
                font-mono
                text-sm
                text-cyan-700
            ">
                {children}
            </code>
        )

                    }}
                >
                    {notesText}
                </ReactMarkdown>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </section>
    );
}