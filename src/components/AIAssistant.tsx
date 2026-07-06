"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Sparkles, User, Bot } from "lucide-react";

export default function AIAssistant() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState<{ sender: string; text: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat, loading]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = { sender: "user", text: message };
        setChat([...chat, userMessage]);
        setMessage("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });

            const data = await res.json();
            setChat((prev) => [...prev, { sender: "ai", text: data.reply }]);
        } catch (error) {
            console.error("Failed to send message:", error);
            setChat((prev) => [
                ...prev,
                { sender: "ai", text: "Sorry, I'm having trouble connecting. Please try again." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-6 z-50 p-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full shadow-2xl hover:shadow-primary-500/50 transition-all duration-300"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -180, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 180, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <X className="w-6 h-6 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 180, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -180, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <MessageCircle className="w-6 h-6 text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-28 right-6 z-50 w-[88vw] sm:w-96 h-[600px] max-h-[80vh] glass-dark rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4 flex items-center space-x-3">
                            <div className="p-2 bg-black/15 rounded-full">
                                <Sparkles className="w-5 h-5 text-[#04110f]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-[#04110f] font-mono font-bold text-base">AI Assistant</h3>
                                <p className="text-[#04110f]/70 text-xs">Ask me about Carlos&apos;s work</p>
                            </div>
                            <div className="w-2 h-2 bg-[#04110f] rounded-full animate-pulse" />
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-white/5">
                            {chat.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-8 space-y-3"
                                >
                                    <div className="inline-block p-4 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full">
                                        <Bot className="w-8 h-8 text-primary-400" />
                                    </div>
                                    <p className="text-white/70 text-sm">
                                        Hi! I&apos;m here to help you learn about Carlos&apos;s skills, projects, and experience. 
                                        Ask me anything!
                                    </p>
                                </motion.div>
                            )}

                            {chat.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex items-end space-x-2 ${
                                        msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                                    }`}
                                >
                                    {/* Avatar */}
                                    <div
                                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                            msg.sender === "user"
                                                ? "bg-gradient-to-r from-primary-500 to-secondary-500"
                                                : "bg-white/10"
                                        }`}
                                    >
                                        {msg.sender === "user" ? (
                                            <User className="w-4 h-4 text-white" />
                                        ) : (
                                            <Bot className="w-4 h-4 text-white" />
                                        )}
                                    </div>

                                    {/* Message Bubble */}
                                    <div
                                        className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                                            msg.sender === "user"
                                                ? "bg-gradient-cyber text-[#04110f] font-medium rounded-br-sm"
                                                : "glass text-white/90 rounded-bl-sm"
                                        }`}
                                    >
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-end space-x-2"
                                >
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="glass px-4 py-3 rounded-2xl rounded-bl-sm">
                                        <div className="flex space-x-2">
                                            <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={chatEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/10 bg-black/20">
                            <div className="flex items-end space-x-2">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask about projects, skills..."
                                    disabled={loading}
                                    className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary-500 transition-colors disabled:opacity-50 text-sm"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={sendMessage}
                                    disabled={loading || !message.trim()}
                                    className="p-3 bg-gradient-cyber text-[#04110f] rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
