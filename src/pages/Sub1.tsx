// import React from 'react';
// import './Sub1.css'; // Import the CSS file for styling

// const Sub1 = () => {
//   return (
//     <div className="submenu-page">
//       <h1>Grok API</h1>
//       <p>This is the first submenu component with a boilerplate sentence.</p>
//     </div>
//   );
// };

// export default Sub1;

"use client";
import React, { useState, useTransition } from "react";
import axios from "axios";

// Define TypeScript types for messages and responses
interface Message {
  text?: string;
  image?: string | null;
  sender: "user" | "bot";
}

interface ChatResponse {
  text?: string;
  image?: string | null;
  error?: string;
}

// Server Action function: typed to ensure return types are safe
async function handleChatbotResponse(message: string): Promise<ChatResponse> {
  const apiKey = 'xai-vOJkcvQWsTAXcLblqcSsSZs2TE0YIMwchX7rCer3hrwDN8O5UVkW45VOwgkQO59eLX6c04PVS74F7xzU'; // Replace with your xAI API key

  try {
    const response = await axios.post(
      "https://api.x.ai/v1/chat/completions",
      {
        model: "grok-beta",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const { data } = response;
    const botText = data.choices[0]?.message?.content;
    const isImageRequest =
      message.toLowerCase().includes("image") ||
      message.toLowerCase().includes("picture");
    let botImage: string | null = null;

    if (isImageRequest) {
      const imageResponse = await axios.post(
        "https://api.x.ai/v2/chat/completions",
        {
          model: "grok-beta",
          messages: [{ role: "user", content: message }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      botImage = imageResponse.data.choices[0]?.message?.content || null;
    }

    return { text: botText, image: botImage };
  } catch (error) {
    console.error("Error in chatbot API:", error);
    return { error: "An error occurred" };
  }
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [selectedVerb, setSelectedVerb] = useState<string>("");
  const [selectedTense, setSelectedTense] = useState<string>("");

  const verbs = [
    "hablar", "comer", "vivir", "tener", "hacer", "decir", "ir", "ver", "dar", "saber"
  ];

  const tenses = [
    "present", "preterite", "imperfect", "future", "conditional"
  ];

  const sendMessage = async () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
      ]);
      setInput("");

      startTransition(async () => {
        try {
          const response = await handleChatbotResponse(input);
          if (response.text) {
            console.log(response.text);
            const formattedText = response.text.split("\n").map((line, index) => (
              <div key={index} className="mb-1">
                {line}
              </div>
            ));
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: <div className="whitespace-pre-wrap">{formattedText}</div>, sender: "bot" },
            ]);
          }
          if (response.image) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { image: response.image, sender: "bot" },
            ]);
          }
        } catch (error) {
          console.error("Error in sendMessage:", error);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: "An error occurred. Please try again.", sender: "bot" },
          ]);
        }
      });
    }
  };

  const handleConjugationRequest = async () => {
    if (selectedVerb && selectedTense) {
      startTransition(async () => {
        try {
          const response = await handleChatbotResponse(`Conjugate the verb "${selectedVerb}" in ${selectedTense} tense.`);
          if (response.text) {
            console.log("from conjugate submit button: " + response.text)
            const conjugations = response.text.split("\n").slice(0, 8).map((line, index) => (
              <div key={index} className="mb-1">
                {line}
              </div>
            ));
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: <div className="whitespace-pre-wrap">{conjugations}</div>, sender: "bot" },
            ]);
          }
        } catch (error) {
          console.error("Error in handleConjugationRequest:", error);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: "An error occurred. Please try again.", sender: "bot" },
          ]);
        }
      });
    }
  };

  return (
    <div className="flex flex-col h-screen transition-colors duration-300 bg-light-blue-100 text-gray-800">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              {msg.text && (
                <div
                  className={`inline-block px-4 py-2 rounded-md shadow-md ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              )}
              {msg.image && (
                <img src={msg.image} alt="Generated" className="max-w-full" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 shadow-t">
        <div className="max-w-3xl mx-auto flex items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 rounded-md border bg-white border-gray-300 focus:border-blue-500"
            disabled={isPending}
          />
          <button
            onClick={sendMessage}
            className="ml-4 px-6 py-2 rounded-md transition-colors bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Send"}
          </button>
        </div>
        <div className="mt-4">
          <select
            value={selectedVerb}
            onChange={(e) => setSelectedVerb(e.target.value)}
            className="px-4 py-2 rounded-md border bg-white border-gray-300 focus:border-blue-500"
          >
            <option value="" disabled>Select a verb</option>
            {verbs.map((verb) => (
              <option key={verb} value={verb}>
                {verb}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <select
            value={selectedTense}
            onChange={(e) => setSelectedTense(e.target.value)}
            className="px-4 py-2 rounded-md border bg-white border-gray-300 focus:border-blue-500"
          >
            <option value="" disabled>Select a tense</option>
            {tenses.map((tense) => (
              <option key={tense} value={tense}>
                {tense}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <button
            onClick={handleConjugationRequest}
            className="px-6 py-2 rounded-md transition-colors bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;