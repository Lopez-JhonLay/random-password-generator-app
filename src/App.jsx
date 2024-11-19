import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isSpecialCharactersAllowed, setIsSpecialCharactersAllowed] =
    useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef();

  const generatePassword = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumberAllowed) str += "0123456789";
    if (isSpecialCharactersAllowed) str += "!@#$%^&*()_+";

    for (let index = 1; index < length; index++) {
      const char = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(char);
    }

    setPassword(password);
  }, [length, isNumberAllowed, isSpecialCharactersAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, isNumberAllowed, isSpecialCharactersAllowed]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={isNumberAllowed}
              className="cursor-pointer"
              onChange={() => {
                setIsNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="number">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={isSpecialCharactersAllowed}
              className="cursor-pointer"
              onChange={() => {
                setIsSpecialCharactersAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="character">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
