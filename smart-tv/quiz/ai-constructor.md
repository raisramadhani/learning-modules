1. Project Overview
   Goal: Create a high-energy, interactive quiz web application designed for a classroom setting using a Smart TV. Concept: A "Relay Race" mode where 4 teams (Red, Blue, Green, Yellow) compete simultaneously on a split-screen interface. Correct answers move the team's avatar forward. Target Hardware: Large Smart TV (1080p/4K) with Touchscreen OR Wireless Mouse/Keyboard input. Tech Stack:

Structure: HTML5

Styling: Tailwind CSS (via CDN for portability)

Logic: Vanilla JavaScript (ES6+)

Data: External JSON or embedded JSON object.

Icons: FontAwesome (via CDN).

2. Technical Specifications
   A. Directory Structure
   Plaintext

/quiz-race
|-- index.html (Main UI)
|-- style.css (Custom animations/overrides not covered by Tailwind)
|-- game.js (Game logic, state management, DOM manipulation)
|-- questions.json (Data source)
B. UI/UX Requirements (Tailwind CSS)
Since this is for a TV screen, UI elements must be Large, Bold, and High Contrast.

Lobby Screen:

Title: "Classroom Quiz Race".

Settings: Input field for "Target Score" (Default: 10 correct answers to win).

Start Button: Large, pulsating animation (animate-pulse).

Instruction: "Siapkan 4 Barisan Siswa!".

Game Arena (Split Screen):

Layout: Grid with 4 vertical columns (one per team) OR 4 horizontal tracks. Preference: 4 Horizontal Tracks (easier to see race progress).

Track Design:

Left side: Team Avatar (Icon/Emoji).

Middle: Progress Bar / Track lines.

Right side: Finish Line.

Control Panel (Bottom Area):

Divided into 4 equal sections.

Each section displays:

Current Question (Text text-lg or text-xl).

3 Option Buttons (A, B, C) stacked vertically.

Feedback indicator (Green flash for correct, Red shake for wrong).

Visual Feedback:

Movement: Smooth CSS transition (transition-all duration-700 ease-out) when the avatar moves.

Wrong Answer: The control panel for that team becomes disabled (opacity-50, cursor-not-allowed) for 3 seconds (Penalty).

Victory: Confetti overlay and a modal showing the Winner.

C. Data Structure (questions.json)
The system must load questions randomly from a pool.

Format:

JSON

[
{
"id": 1,
"question": "Apa ibukota Indonesia?",
"options": ["Bandung", "Jakarta", "Surabaya"],
"correctIndex": 1
}
] 3. Game Logic (game.js) features
State Management:

gameState: 'LOBBY', 'RACING', 'FINISHED'.

teams: Array of 4 objects { id: 1, color: 'red', score: 0, locked: false }.

currentQuestions: Array[4] (Stores the current active question for each team independently).

questionPool: Array of loaded questions.

Core Functions:

loadQuestions(): Fetch JSON.

assignQuestion(teamId): Pick a random question from pool, assign to specific team index.

checkAnswer(teamId, selectedIndex):

If Correct: Increment score -> Update Avatar Position (style.left %) -> check isWinner() -> assignQuestion(teamId).

If Wrong: Lock team keypad -> setTimeout 3000ms -> Unlock -> Keep same question OR New question (Configurable).

Responsiveness:

Use vh and vw units ensuring it fills the TV screen without scrolling.

Prevent text selection (user-select-none).

4. Implementation Steps for AI Generation
   Step 1: Data Creation (questions.json)
   Create a dummy JSON file with 5 educational questions (Mix of Math & General Knowledge).

Content:

JSON

[
{
"id": 1,
"question": "Hasil dari 5 x 5 adalah...",
"options": ["10", "25", "15"],
"correctIndex": 1
},
{
"id": 2,
"question": "Hewan yang memakan daging disebut...",
"options": ["Herbivora", "Omnivora", "Karnivora"],
"correctIndex": 2
},
{
"id": 3,
"question": "Warna bendera Indonesia adalah...",
"options": ["Merah Putih", "Putih Merah", "Merah Biru"],
"correctIndex": 0
},
{
"id": 4,
"question": "Benda langit yang menerangi bumi di siang hari...",
"options": ["Bulan", "Bintang", "Matahari"],
"correctIndex": 2
},
{
"id": 5,
"question": "Bahasa Inggris dari 'Kucing' adalah...",
"options": ["Dog", "Cat", "Bird"],
"correctIndex": 1
}
]
Step 2: HTML Structure & Tailwind Setup
Setup HTML boilerplate.

Import Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>.

Import FontAwesome.

Create the Lobby Section (id="lobby").

Create the Game Interface (id="game-area").

Race Track Section: 4 Flex rows with distinct background colors (Red-100, Blue-100, etc.).

Question/Input Section: A Grid with 4 columns (grid-cols-4).

Step 3: JavaScript Logic
Initialization: Fetch JSON, Hide Game Area, Show Lobby.

Start Game:

Reset scores to 0.

Assign unique random questions to all 4 teams.

Switch UI to Game Area.

Interaction:

Add Event Listeners to option buttons.

Handle logic: score++ or penalty.

Update width/margin of the Avatar based on (score / winningScore) \* 100%.

Winner Handling:

If score >= winningScore (e.g., 10), trigger confetti and show modal.

Step 4: Styling Details (Tailwind Classes)
Team Colors:

Team 1: bg-red-500, border-red-700

Team 2: bg-blue-500, border-blue-700

Team 3: bg-green-500, border-green-700

Team 4: bg-yellow-400, border-yellow-600

Buttons: w-full py-4 text-xl font-bold rounded-lg shadow-md hover:brightness-110 active:scale-95 transition-transform.

Avatar: Use FontAwesome icons (e.g., <i class="fa-solid fa-robot"></i> or <i class="fa-solid fa-rocket"></i>) inside a div that moves absolutely or via width percentage.

Prompt for AI (Copy & Paste this to Copilot/ChatGPT):
"Act as a Senior Frontend Developer. Based on the ai-constructor.md specifications above, please generate the complete source code.

Create the questions.json file content.

Create a single index.html file that includes the CSS (Tailwind CDN) and the JavaScript logic embedded (or separated if you prefer, but explain how to link them).

Ensure the UI is responsive for a 16:9 Landscape TV screen.

Implement the split-screen logic so 4 teams can answer different questions simultaneously."
