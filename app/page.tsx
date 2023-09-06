'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import React, { MouseEvent } from 'react';
import OpenAI from 'openai';
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import NiceButton from './components/NiceButton';
import './page.css';


export default function Home() {

  var openai = new OpenAI({
    apiKey: "",
    dangerouslyAllowBrowser: true
  });

  const [tempSliderValue, setTempSliderValue] = useState<number>(1);
  const [tokenSliderValue, setTokenSliderValue] = useState<number>(1000);
  const [frequencySliderValue, setFrequencySliderValue] = useState<number>(0.1);
  const [presenceSliderValue, setPresenceSliderValue] = useState<number>(0.1);

  // State variable for dropdown
  const [gptDropdownValue, setGptDropdownValue] = useState<string>('gpt-3.5-turbo');

  // State variable for text input
  const [textInputValue, setTextInputValue] = useState<string>('');
  const [textOutputValue, setTextOutputValue] = useState<string | null>('');
  const [token, setToken] = useState<string>('');

  const [isConnected, setIsConnected] = useState<boolean>(false);

  const [response, setResponse] = useState();

  // Function to handle slider value change
  const handleSliderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setState(parseFloat(e.target.value));
  };

  // Function to handle dropdown value change
  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGptDropdownValue(e.target.value);
  };

  // Function to handle text input change
  const handleTextInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInputValue(e.target.value);
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const onConfigureButton = () => {

  }

  const getGPTResponse = async () => {
    openai = new OpenAI({
      apiKey: token,
      dangerouslyAllowBrowser: true
    });

    setTextOutputValue('');

    const chatCompletion = await openai.chat.completions.create({
      model: gptDropdownValue,
      messages: [{ "role": "system", "content": textInputValue }],
      max_tokens: tokenSliderValue,
      frequency_penalty: frequencySliderValue,
      presence_penalty: presenceSliderValue
    });
    setTextOutputValue(chatCompletion.choices[0].message.content);
  };



  return (
    <div className="App">
      <div className="two-column-layout">
        <div className="narrow-column">
          <div className='narrow-element'>
            <label>Token: </label>
            <input
              className='narrow-textinput'
              type="text"
              value={token}
              onChange={handleTokenChange}
            />
          </div>
          <div className='narrow-element'>
            <label>Temperature:</label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"  // Set the step to 0.1
              value={tempSliderValue}
              onChange={(e) => handleSliderChange(e, setTempSliderValue)}
            />
            <span>{tempSliderValue}</span>
          </div>
          <div className='narrow-element'>
            <label>MaxToken:</label>
            <input
              type="range"
              min="0"
              max="5000"
              value={tokenSliderValue}
              onChange={(e) => handleSliderChange(e, setTokenSliderValue)}
            />
            <span>{tokenSliderValue}</span>
          </div>
          <div className='narrow-element'>
            <label>Frequency:</label>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.1"
              value={frequencySliderValue}
              onChange={(e) => handleSliderChange(e, setFrequencySliderValue)}
            />
            <span>{frequencySliderValue}</span>
          </div>
          <div className='narrow-element'>
            <label>Presence:</label>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.1"
              value={presenceSliderValue}
              onChange={(e) => handleSliderChange(e, setPresenceSliderValue)}
            />
            <span>{presenceSliderValue}</span>
          </div>
          <div className='narrow-element'>
            <label>Тип GPT:</label>
            <select value={gptDropdownValue} onChange={handleDropdownChange} className='narrow-textinput'>
              <option value="gpt-3.5-turbo">GPT-3.5</option>
              <option value="gpt-4">GPT-4</option>
            </select>
          </div>
          <div className='narrow-element'>
            <NiceButton text="Отправить" onClick={getGPTResponse}></NiceButton>
          </div>
        </div>


        <div className="wide-column">
          <div className="wide-content">
            <label>GPT Response:</label>
            <p></p>
            <SyntaxHighlighter language="json" style={vs2015}>
              {textOutputValue || '// No response loaded yet'}
            </SyntaxHighlighter>
          </div>
          <textarea
            className="wide-textarea"
            placeholder="Send a message"
            value={textInputValue}
            onChange={handleTextInputChange}
          />
        </div>
      </div>
    </div>

    // <div className="App">
    //   <h1>OpenAI API Tester</h1>


    //   {/* Text Input */}
    //   <div style={{ display: 'flex', flexDirection: 'row' }}>
    //     <div>
    //       <label>Token: </label>
    //       <input
    //         type="text"
    //         value={token}
    //         onChange={handleTokenChange}
    //       />
    //     </div>
    //   </div>



    //   <div style={{ display: 'flex', flexDirection: 'column' }}>
    //     {/* Slider 1 */}
    //     <div>
    //       <label>Temperature:</label>
    //       <input
    //         type="range"
    //         min="0"
    //         max="2"
    //         step="0.1"  // Set the step to 0.1
    //         value={tempSliderValue}
    //         onChange={(e) => handleSliderChange(e, setTempSliderValue)}
    //       />
    //       <span>{tempSliderValue}</span>
    //     </div>

    //     {/* Slider 2 */}
    //     <div>
    //       <label>MaxToken:</label>
    //       <input
    //         type="range"
    //         min="0"
    //         max="5000"
    //         value={tokenSliderValue}
    //         onChange={(e) => handleSliderChange(e, setTokenSliderValue)}
    //       />
    //       <span>{tokenSliderValue}</span>
    //     </div>

    //     {/* Slider 3 */}
    //     <div>
    //       <label>Frequency:</label>
    //       <input
    //         type="range"
    //         min="-2"
    //         max="2"
    //         step="0.1"
    //         value={frequencySliderValue}
    //         onChange={(e) => handleSliderChange(e, setFrequencySliderValue)}
    //       />
    //       <span>{frequencySliderValue}</span>
    //     </div>

    //     {/* Slider 4 */}
    //     <div>
    //       <label>Presence:</label>
    //       <input
    //         type="range"
    //         min="-2"
    //         max="2"
    //         step="0.1"
    //         value={presenceSliderValue}
    //         onChange={(e) => handleSliderChange(e, setPresenceSliderValue)}
    //       />
    //       <span>{presenceSliderValue}</span>
    //     </div>
    //   </div>

    //   {/* Dropdown */}
    //   <div>
    //     <label>Dropdown:</label>
    //     <select value={gptDropdownValue} onChange={handleDropdownChange}>
    //       <option value="gpt-3.5-turbo">GPT-3.5</option>
    //       <option value="gpt-4">GPT-4</option>
    //     </select>
    //   </div>

    //   {/* Text Input */}
    //   <div style={{ display: 'flex', flexDirection: 'row' }}>
    //     <div>
    //       <label>Text Input: </label>
    //       <input
    //         type="text"
    //         value={textInputValue}
    //         onChange={handleTextInputChange}
    //       />
    //     </div>
    //     <div>
    //       <NiceButton text="Click Me" onClick={getGPTResponse}></NiceButton>
    //     </div>
    //   </div>


    //   {/* Text Output */}
    //   <div>
    //     <label>GPT Response:</label>
    //     <p></p>
    //       <SyntaxHighlighter language="json" style={docco}>
    //         {textOutputValue || '// No response loaded yet'}
    //       </SyntaxHighlighter>
    //   </div>
    // </div>
  );
}
