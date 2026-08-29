import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

const CodeExplainer = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Python");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleExplain = async () => {
    if (!code.trim()) {
      setError("Please enter some code first.");
      return;
    }

    setError("");
    setLoading(true);
    setExplanation("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/code-explain/",
        {
          code: code,
        }
      );

      setExplanation(response.data.explanation);
    } catch (error) {
      console.error("Code explanation error:", error);

      setError(
        error.response?.data?.error ||
          "Something went wrong while explaining the code."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCode("");
    setExplanation("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/40 via-white to-white ">

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
                        transition-all
                        duration-200
                        hover:-translate-x-0.5
                        hover:border-blue-300
                        hover:bg-blue-50
                        hover:text-blue-600
                        relative
                        top-10
                        left-23
                    "
                >

                    ← LearnMate

                </button>


      {/* Hero Section */}
      <section className="pt-12 pb-8 px-6 text-center">

       

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-6">
          💻 Code Learning Assistant
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900">
          Understand Your{" "}
          <span className="text-blue-500">
            Code
          </span>
        </h1>

        {/* Description */}
        <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
          Paste your code and let LearnMate AI explain it in a
          simple and student-friendly way.
        </p>

      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 pb-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ================= CODE INPUT ================= */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl
                            shadow-blue-100 ">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Your Code
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Paste the code you want to understand
                </p>
              </div>

              {/* Language */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-4 py-2 rounded-xl border border-slate-200
                bg-white text-slate-700 text-sm font-medium
                focus:outline-none focus:ring-2 focus:ring-blue-200
                focus:border-blue-500
                overflow-scroll"
              >
                <option>Python</option>
                <option>JavaScript</option>
                <option>Java</option>
                <option>C</option>
                <option>C++</option>
                <option>React</option>
                <option>c#</option>
                <option>Sql</option>
              </select>

            </div>

            {/* Code Editor */}
            <div className="relative">

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={`Example:

def add(a, b):
    return a + b`}
                className="
                  w-full
                  h-[420px]
                  resize-none
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-5
                  py-4
                  font-mono
                  text-sm
                  text-slate-800
                  leading-6
                  placeholder:text-slate-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-200
                  focus:border-blue-500
                  transition
                "
                spellCheck="false"
              />

            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                ⚠️ {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 mt-5">

              <button
                onClick={handleExplain}
                disabled={loading}
                className="
                  flex-1
                  py-3.5
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-700
                  disabled:bg-blue-300
                  text-white
                  font-semibold
                  transition
                  shadow-sm
                "
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Explaining...
                  </span>
                ) : (
                  "✨ Explain Code"
                )}
              </button>

              <button
                onClick={handleClear}
                className="
                  px-6
                  py-3.5
                  rounded-xl
                  border
                  border-slate-200
                  text-slate-600
                  font-medium
                  hover:bg-slate-50
                  transition
                "
              >
                Clear
              </button>

            </div>

          </div>


          {/* ================= AI RESPONSE ================= */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl shadow-blue-100">

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">

              <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center text-xl ">
                🤖
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  AI Explanation
                </h2>

                <p className="text-sm text-slate-500">
                  LearnMate AI's explanation
                </p>
              </div>

            </div>


            {/* Loading */}
            {loading && (
              <div className="h-[420px] flex flex-col items-center justify-center text-center">

                <div className="w-12 h-12 border-4 border-purple-100 border-t-purple-600 rounded-full animate-spin"></div>

                <h3 className="mt-5 text-lg font-semibold text-slate-800">
                  Analyzing your code...
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  LearnMate AI is preparing a simple explanation.
                </p>

              </div>
            )}


            {/* Empty State */}
            {!loading && !explanation && (
              <div className="h-[420px] flex flex-col items-center justify-center text-center px-8">

                <div className="text-6xl mb-5">
                  🧠
                </div>

                <h3 className="text-xl font-bold text-slate-800">
                  Ready to explain your code
                </h3>

                <p className="mt-3 text-slate-500 max-w-md leading-6">
                  Paste your code on the left and click
                  <span className="font-semibold text-blue-600">
                    {" "}Explain Code
                  </span>
                  {" "}to get a simple explanation.
                </p>

              </div>
            )}


            {/* Markdown Response */}
            {!loading && explanation && (
              <div className="h-[420px] overflow-y-auto pr-2">

                <ReactMarkdown
                  components={{

                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold text-slate-900 mb-4">
                        {children}
                      </h1>
                    ),

                    h2: ({ children }) => (
                      <h2 className="text-xl font-bold text-purple-600 mt-6 mb-3">
                        {children}
                      </h2>
                    ),

                    h3: ({ children }) => (
                      <h3 className="text-lg font-semibold text-slate-800 mt-5 mb-2">
                        {children}
                      </h3>
                    ),

                    p: ({ children }) => (
                      <p className="text-slate-600 leading-7 mb-4">
                        {children}
                      </p>
                    ),

                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                        {children}
                      </ul>
                    ),

                    ol: ({ children }) => (
                      <ol className="list-decimal pl-6 space-y-2 text-slate-600 mb-4">
                        {children}
                      </ol>
                    ),

                    li: ({ children }) => (
                      <li className="leading-6">
                        {children}
                      </li>
                    ),

                    strong: ({ children }) => (
                      <strong className="font-semibold text-slate-900">
                        {children}
                      </strong>
                    ),

                    code: ({ inline, children }) => {
                      if (inline) {
                        return (
                          <code className="px-1.5 py-0.5 rounded-md bg-purple-50 text-purple-700 text-sm font-mono">
                            {children}
                          </code>
                        );
                      }

                      return (
                        <code className="block bg-slate-50 border border-slate-200 rounded-xl p-4 overflow-x-auto text-sm font-mono text-slate-800 leading-6">
                          {children}
                        </code>
                      );
                    },

                    pre: ({ children }) => (
                      <pre className="mb-5">
                        {children}
                      </pre>
                    ),

                  }}
                >
                  {explanation}
                </ReactMarkdown>

              </div>
            )}

          </div>

        </div>

      </main>

    </div>
  );
};

export default CodeExplainer;