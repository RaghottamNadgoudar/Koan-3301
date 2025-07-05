"use client";

import { useEffect, useState, memo } from "react";

const AntiDebug = memo(function AntiDebug() {
  useEffect(() => {
    const interval = setInterval(() => {
      debugger;
    }, 400);
    return () => clearInterval(interval);
  }, []);
  return null;
});

export default function HomePage() {
  const [statusMessage, setStatusMessage] = useState(
    "Ready to begin your journey..."
  );
  const [isClient, setIsClient] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [svgAvailable, setSvgAvailable] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration by ensuring client-only rendering
  useEffect(() => {
    setIsClient(true);
    setIsMounted(true);

    // Check if SVG file exists
    fetch("/Hidden.svg")
      .then((res) => {
        if (res.ok) {
          setSvgAvailable(true);
          setStatusMessage("Mandala pattern detected. Downloads available.");
        } else {
          setStatusMessage("Mandala pattern not found. Check file location.");
        }
      })
      .catch(() => {
        setStatusMessage("Unable to locate mandala pattern.");
      });
  }, []);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Download SVG file
  const downloadSVG = async () => {
    try {
      const response = await fetch("/Hidden.svg");
      if (!response.ok) throw new Error("SVG not found");

      const svgContent = await response.text();
      const blob = new Blob([svgContent], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Hidden.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setStatusMessage("Mandala pattern downloaded successfully.");
    } catch (error) {
      setStatusMessage("Failed to download mandala pattern.");
    }
  };

  // Handle secret element interaction for audio download - Updated to use API route
  const handleSecretInteraction = async () => {
    setStatusMessage("Anomaly detected... initiating contact...");

    try {
      setStatusMessage("Connection established. Receiving transmission...");

      const response = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "get_audio" }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch audio");
      }

      const data = await response.json();

      if (data.audioData) {
        // Convert base64 back to audio blob
        const audioBlob = new Blob(
          [Uint8Array.from(atob(data.audioData), (c) => c.charCodeAt(0))],
          { type: "audio/wav" }
        );

        const url = URL.createObjectURL(audioBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "echo.wav";
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setStatusMessage(
          "Audio transmission captured as echo.wav. Decryption required."
        );
      } else {
        throw new Error("No audio data received");
      }
    } catch (error) {
      setStatusMessage("Connection to the source failed. Try again.");
      console.error("Audio download error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalPassword = e.target.password.value;
    if (!finalPassword) return;

    setIsLoading(true);
    setStatusMessage("Validating key...");

    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: finalPassword }),
      });
      const data = await res.json();
      setStatusMessage(data.message);
    } catch (error) {
      setStatusMessage("Validation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = () => {
    if (
      statusMessage.includes("Failed") ||
      statusMessage.includes("failed") ||
      statusMessage.includes("not found")
    )
      return "text-red-400";
    if (
      statusMessage.includes("successfully") ||
      statusMessage.includes("detected") ||
      statusMessage.includes("available")
    )
      return "text-green-400";
    if (
      statusMessage.includes("Validating") ||
      statusMessage.includes("initiating") ||
      statusMessage.includes("Receiving")
    )
      return "text-cyan-400";
    return "text-amber-400";
  };

  return (
    <>
      {isClient && <AntiDebug />}

      <div
        className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden"
        suppressHydrationWarning
      >
        {/* Animated background particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute top-40 right-32 w-24 h-24 bg-purple-400/30 rounded-full blur-lg animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/3 w-40 h-40 bg-blue-400/15 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 right-20 w-28 h-28 bg-indigo-400/25 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 sm:p-8">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 mb-4 sm:mb-6 shadow-lg">
              <div className="w-2 sm:w-3 h-2 sm:h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium tracking-wider text-sm sm:text-base">
                PERCEPTION INTERFACE
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-purple-200 to-indigo-200 mb-3 sm:mb-4 leading-tight">
              Digital Zen Garden
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-light tracking-wide max-w-2xl mx-auto leading-relaxed px-4">
              What is the sound of one hand clapping?
            </p>

            <div className="mt-4 sm:mt-6 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent max-w-md mx-auto"></div>
          </div>

          {/* Download Cards Section */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 w-full max-w-2xl px-4">
            {/* SVG Download Card */}
            <div className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-4 sm:p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="text-center">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 sm:w-8 h-6 sm:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                  Mandala Pattern
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                  Download the sacred geometry
                </p>
                <button
                  onClick={downloadSVG}
                  disabled={!svgAvailable}
                  className="w-full px-3 sm:px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:from-cyan-400 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium text-sm sm:text-base shadow-lg hover:shadow-cyan-500/25"
                >
                  {svgAvailable ? "Download SVG" : "Not Available"}
                </button>
              </div>
            </div>

            {/* Audio Download Card */}
            <div className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-4 sm:p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="text-center">
                <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-6 sm:w-8 h-6 sm:h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5 7h4l5-5v20l-5-5H5a2 2 0 01-2-2V9a2 2 0 012-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                  Hidden Echo
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                  Unlock the secret transmission
                </p>
                <button
                  onClick={handleSecretInteraction}
                  className="w-full px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg hover:shadow-purple-500/25"
                >
                  Connect & Download
                </button>
              </div>
            </div>
          </div>

          {/* Answer Form */}
          <div className="w-full max-w-md px-4">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="relative">
                <input
                  name="password"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter the final decrypted key"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-center text-white bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 shadow-lg focus:shadow-xl text-sm sm:text-base"
                  disabled={isLoading}
                  suppressHydrationWarning
                />
                {inputValue && (
                  <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-xl hover:from-cyan-300 hover:to-purple-300 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                    VALIDATING...
                  </div>
                ) : (
                  "ANSWER THE KOAN"
                )}
              </button>
            </form>
          </div>

          {/* Status Message */}
          <div className="mt-6 sm:mt-8 text-center px-4">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/5 backdrop-blur-lg rounded-full border border-white/10 shadow-lg">
              <div
                className={`w-2 h-2 rounded-full animate-pulse ${
                  statusMessage.includes("Failed") ||
                  statusMessage.includes("failed") ||
                  statusMessage.includes("not found")
                    ? "bg-red-400"
                    : statusMessage.includes("successfully") ||
                      statusMessage.includes("detected") ||
                      statusMessage.includes("available")
                    ? "bg-green-400"
                    : statusMessage.includes("Validating") ||
                      statusMessage.includes("initiating") ||
                      statusMessage.includes("Receiving")
                    ? "bg-cyan-400"
                    : "bg-amber-400"
                }`}
              ></div>
              <p
                className={`text-sm sm:text-lg font-medium ${getStatusColor()}`}
              >
                {statusMessage}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-2 sm:gap-4 text-xs text-gray-500 tracking-widest">
              <span>SEEK</span>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <span>DOWNLOAD</span>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <span>DECRYPT</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
