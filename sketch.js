import './style.css';

// JavaScript and Node.js imports, installed typically with npm install.
import OpenAI from 'openai';

// Declare globals.
// Put your OpenAI API key here.
const apiKey = 'YOUR_API_KEY_HERE';
let openai;

// Keep all non-P5.js code outside of the sketch() function as much as possible.
// This just makes things cleaner and enables you to break them out into
// separate modules if need be. P5.js doesn't support modules without p. notation.

// Add an event listener to the text input.
async function initializePromptInput (callback) {
  const promptInput = document.getElementById('prompt-input');
  
  if (promptInput) {
    promptInput.addEventListener('keydown', async function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        
        // Get the text from the text input element.
        const prompt = promptInput.value;
        
        // Call the OpenAI API to get a completion from the prompt.
        const completion = await chat(prompt);
        callback(completion);
      } // end check for Enter
    }); // end addEventListener click
  } // end check for promptInput existence
}

// Sends a single prompt to the OpenAI completions API.
async function chat (prompt) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          "role": "user",
          "content": prompt
        }
      ]
    });
  
    return completion.choices[0].message.content;
  } catch (err) {
    console.error("An error occurred in the chat function:", err);
    return "An error occurred."
  }
}

// This is the function passed to P5.js that provides the object, p, that
// holds the core functionality of P5.js.
const sketch = p => {
  // Put any sketch-specific state here.
  let textToShow = "";

  p.setup = function () {
    // Provide a callback function to the text prompt for when a successful
    // completion is returned from the OpenAI API. This helps ensure the
    // sketch state, textToShow, remains inside the sketch() function.
    const callback = function (completion) {
      textToShow = completion;
    };
    
    initializePromptInput(callback);

    p.createCanvas(1000, 500);
    p.fill(p.color('black'));
    p.noStroke();
  } // end setup
  
  p.draw = function () {
    p.background(p.color('white'));
    p.textSize(20);
    p.text(textToShow, 70, 70);
  } // end draw
} // end sketch function


// =====================================================================================
// This is initialization code for P5.js and OpenAI.
// There's typically no need to bother with this.

// Initialize P5.js and OpenAI.
function onReady () {
  // Initialize the OpenAI API instance.
  openai = new OpenAI({
    apiKey: apiKey,
  
    // This is ONLY for prototyping locally on your personal machine!
    dangerouslyAllowBrowser: true
  });

  const mainElt = document.querySelector('main');
  new p5(sketch, mainElt);
} // end onReady

if (document.readyState === 'complete') {
  onReady();
} else {
  document.addEventListener("DOMContentLoaded", onReady);
}
