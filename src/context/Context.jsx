import { createContext, useState } from "react";
import { runChat } from '../config/gemini';  // Correct import

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const onSent = async () => {
        setLoading(true);  // Start loading
        try {
            const result = await runChat(input);  // Call runChat with input
            setResultData(result);  // Set the result data
            setShowResult(true);  // Show the result
            setPreviousPrompt(prev => [...prev, input]);  // Save previous prompt
        } catch (error) {
            console.error("Error sending input:", error);
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    // Context value object
    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        input,
        setInput,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
