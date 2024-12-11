import React, { useState } from "react";
import cohereClient from "../util/cohereClient";
import { useRouter } from "next/router"; // Import useRouter

interface Chat {
  id: number;
  messages: string[];
}

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);
  const router = useRouter(); // Initialize the router

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, `You: ${input}`]);
    const chatHistory = messages.join("\n");

    try {
      const response = await cohereClient.generate({
        model: "command-xlarge-nightly",
        prompt: `
You are a friendly and knowledgeable chatbot that answers Bible-related questions in a conversational manner. Always provide accurate and thoughtful responses. Here's the conversation so far:
${chatHistory}
User: ${input}
Bot:`,
        maxTokens: 200,
        temperature: 0.8,
        stopSequences: ["User:", "Bot:"],
      });

      const botResponse = response.generations[0].text.trim();
      setMessages((prev) => [...prev, `Bot: ${botResponse}`]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        "Bot: Something went wrong. Please try again later.",
      ]);
      console.error("Error with Cohere API:", error);
    } finally {
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleNewChat = () => {
    if (messages.length > 0 && currentChatId === null) {
      const newChatId = chats.length + 1;
      setChats((prev) => [...prev, { id: newChatId, messages }]);
    }
    setMessages([]);
    setCurrentChatId(null);
  };

  const handleViewChat = (chatId: number) => {
    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);
    }
  };

  const handleGoBack = () => {
    router.back(); // This will take the user to the previous page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Bible Chatbot</h1>
      {/* Go Back Button */}
      <button
        onClick={handleGoBack}
        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 mb-4"
      >
        Go Back
      </button>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Chat Window */}
        <div className="flex-1 bg-white text-black rounded-lg shadow-lg p-4">
          <div className="h-64 overflow-y-auto border border-gray-300 rounded-md p-3 mb-4">
            {messages.length > 0 ? (
              messages.map((msg, idx) => (
                <p
                  key={idx}
                  className={`${
                    msg.startsWith("You:") ? "text-blue-600 font-semibold" : "text-gray-800"
                  } mb-2`}
                >
                  {msg}
                </p>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                Start a conversation to see messages here.
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a Bible-related question..."
              className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Send
            </button>
            <button
              onClick={handleNewChat}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              New Chat
            </button>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 lg:max-w-sm bg-white text-black rounded-lg shadow-lg p-4">
          <h3 className="text-xl font-semibold mb-4">Chat History</h3>
          <ul className="space-y-2">
            {chats.length > 0 ? (
              chats.map((chat) => (
                <li key={chat.id}>
                  <button
                    onClick={() => handleViewChat(chat.id)}
                    className="block w-full bg-gray-100 p-3 rounded-md hover:bg-gray-200 text-left shadow-md transition duration-300"
                  >
                    Chat #{chat.id}
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No chats yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
