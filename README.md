# 🌿 TouchGrass AI — Less Screen, More Green

> Your AI-powered outdoor buddy that helps you take a break from screens and reconnect with the real world.

TouchGrass AI is a nature-inspired web application that encourages people to spend more time outdoors through personalized activity ideas, daily nature challenges, and a digital nature journal.

Users choose their mood, available time, and surroundings to receive an outdoor activity suggestion. The project attempts to use an open-weight language model through Transformers.js, with a built-in JavaScript fallback planner when the model cannot load.

**The mission: Make the screen the shortest part of the experience.**

---

## 📚 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [How the AI Works](#-how-the-ai-works)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [How to Use](#-how-to-use)
- [Why Open Innovation Matters](#-why-open-innovation-matters)
- [Privacy](#-privacy)
- [Limitations](#-limitations)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🌱 About the Project

Screens are a big part of studying, working, and relaxing. TouchGrass AI is built around a simple idea: technology can help people spend less time on their devices and more time experiencing the world around them.

Instead of encouraging long conversations with an AI, TouchGrass AI uses activity suggestions to help people take small, achievable steps outdoors.

The project was created for the **Touch Grass** theme: build something with open-weight models or open-source AI that gets people off the screen and into the world.

### Project goals

- Encourage short, accessible outdoor breaks.
- Offer activity suggestions based on mood, time, and surroundings.
- Help users notice nature through simple challenges.
- Let users record observations in a browser-based journal.
- Explore open-weight AI in a simple HTML, CSS, and JavaScript project.

---

## ✨ Features

### 🤖 Personalized outdoor activity planner

Choose a mood:
- 🌧️ **Stressed** — gentle activities to pause and reset.
- 🌱 **Low energy** — low-effort ways to get outside.
- 🔎 **Curious** — nature observation and exploration.
- 🌼 **Social** — activities to enjoy with a friend or family member.

Then select how much time you have (10, 20, 30, or 60 minutes) and your surroundings (anywhere outdoors, park or garden, home or balcony, or trail/open space).

The app attempts to generate an activity with an open-weight model. If the model is unavailable, a built-in planner supplies an activity instead.

### ☀️ Daily nature challenges

Try small prompts such as:
- Notice three things you usually miss.
- Find a leaf with an interesting shape.
- Listen for three different sounds.
- Find three shades of green.
- Look up and observe the clouds.
- Take a short walk without checking your phone.

### 📓 Nature journal

Record something you noticed outside. Journal entries are stored in the browser using `localStorage`, and the current version displays up to five recent notes.

### 📈 Outdoor progress tracker

Mark an activity as completed and see your completed-moment count update. Progress is saved in the current browser.

### 🌿 Responsive nature-inspired design

- Soft green and cream color palette.
- CSS-created landscape illustration.
- Responsive layout for desktop and mobile screens.
- Interactive buttons and activity cards.
- Simple, beginner-friendly interface.

### 🔄 Fallback planner

The core activity-planning experience can still work when the model or network is unavailable, using predefined JavaScript suggestions.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and content |
| CSS3 | Styling, layout, and responsive design |
| JavaScript | Interactions, activity planning, and application logic |
| Transformers.js | Browser-side inference for compatible machine-learning models |
| FLAN-T5-small | Intended open-weight text-to-text model |
| `localStorage` | Saves journal entries and progress in the browser |
| Live Server | Local development server (optional) |

---

## 🧠 How the AI Works

The project attempts to load `Xenova/flan-t5-small` through Transformers.js.

At a high level:

1. The user selects a mood, time limit, and surroundings.
2. JavaScript builds a prompt from those selections.
3. Transformers.js attempts to load the model and run text generation in the browser.
4. The generated suggestion is displayed in the planner.
5. If the model fails to load or generate usable text, the fallback planner supplies a predefined activity.

The model is **not bundled** in this repository. The first model download requires an internet connection, and the download may take time depending on the device and network.

Local inference may be possible after the model loads, but fully offline use is **not guaranteed** by this prototype. Browser caching, library availability, and model-host availability affect the experience.

---

## 📁 Project Structure

```text
TouchGrass-AI/
├── index.html    # Website structure
├── style.css     # Visual design and responsive layout
├── script.js     # Planner, AI integration, journal, and progress
├── README.md     # Project documentation
└── screenshots/  # Optional screenshots for this README
    └── homepage.png
```

The `screenshots/` directory is optional. Create it and add a screenshot of your running app if you want to show the interface on GitHub.

To display a screenshot in this README, use:

```markdown
![TouchGrass AI homepage](screenshots/homepage.png)
```

---

## 🚀 Getting Started

### Prerequisites

- A modern browser such as Chrome, Edge, or Firefox.
- A code editor such as Visual Studio Code.
- The project files: `index.html`, `style.css`, and `script.js`.
- An internet connection for the initial library and AI model download.

### 1. Clone the repository

After you upload this project to GitHub, clone it with:

```bash
git clone https://github.com/YOUR-USERNAME/TouchGrass-AI.git
cd TouchGrass-AI
```

Replace `YOUR-USERNAME` and `TouchGrass-AI` with your actual GitHub username and repository name.

### 2. Open the folder

Open the project folder in Visual Studio Code. Make sure all three files are in the same folder.

### 3. Start the website

**Option A — Live Server**

1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html`.
3. Select **Open with Live Server**.

**Option B — Python local server**

If Python is installed, run this command from the project folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### 4. Try the planner

1. Select a mood.
2. Choose an available time.
3. Choose your surroundings.
4. Click **Make my plan**.
5. Allow time for the model to download the first time.

If the AI model cannot load, the app should use its built-in fallback planner.

---

## 🧭 How to Use

### Make an outdoor plan
Choose the options that fit your day and click **Make my plan**. Treat suggestions as ideas, and choose a safe activity that suits your surroundings.

### Complete an activity
After doing the activity, click **Mark done** to update your progress count.

### Save a journal note
Write an observation in the Nature Journal and click **Save note**. Notes are saved in the current browser profile on that device.

### Get another challenge
Click **Give me another challenge** to cycle through nature prompts.

### Reset your data
Use **Reset progress** to clear the saved progress and journal notes. This action cannot be undone.

---

## 🌍 Why Open Innovation Matters

Open-weight AI gives developers more room to experiment than relying exclusively on a closed, hosted AI API.

- **Model flexibility:** The model and prompts can be changed, and other compatible models can be tested.
- **Local inference:** Once downloaded and supported by the browser, the model can run on the user's device instead of sending each prompt to a remote inference service.
- **Privacy-conscious design:** Journal entries and progress are saved in browser storage and are not sent to a project backend by this code.
- **Less backend infrastructure:** The project does not require a dedicated AI inference server, though model downloads, hosting, and device compute still have costs or constraints.
- **Learning and customization:** The code is separated into HTML, CSS, and JavaScript so learners can inspect and modify how the experience works.

Open-weight does not automatically mean public-domain, unrestricted, or completely offline. Always check the model and dependency licenses, and be clear about what is downloaded or sent over the network.

---

## 🔐 Privacy

The current prototype:
- Stores journal notes and completed-moment counts in browser `localStorage`.
- Does not include an application-specific backend or database.
- Loads its JavaScript library and model files from external hosting.
- Runs model inference in the browser when loading and inference succeed.

**Important:** `localStorage` is not encrypted by this application. Other people with access to the same browser profile may be able to see saved notes. Avoid entering sensitive personal information.

---

## ⚠️ Limitations

- The AI model is downloaded at runtime and is not included in the repository.
- First-time use requires internet access to fetch the library and model.
- The app does not guarantee full offline operation.
- Model performance depends on browser compatibility, memory, and device resources.
- The planner does not currently use live weather, GPS, or verified local trail data.
- Fallback suggestions are predefined rather than generated by AI.
- Journal entries are not synced between devices.
- The progress counter records completed activities, not independently verified outdoor time.
- AI-generated text may be incomplete or unsuitable; use judgment and prioritize safety.

---

## 🔮 Future Improvements

Ideas for future versions:
- Improve reliable offline support and model caching.
- Add optional weather-aware suggestions.
- Add opt-in location-based discovery for parks and walking routes.
- Explore compatible open models for plant, bird, or bird-call identification.
- Add weekly goals, streaks, and optional activity-duration tracking.
- Improve keyboard accessibility and screen-reader support.
- Add a progressive web app manifest and service worker.
- Let users configure supported models and generation settings.
- Add more activity ideas and languages.

---

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Make and test your changes.
4. Commit your work: `git commit -m "Add your feature"`.
5. Push your branch and open a pull request.

Please check the license of any new library or model you introduce and document any additional setup steps.

---

## 📜 License

Choose a license before presenting the project as open-source. For example, the MIT License is a common option for code projects. If you choose MIT, add a `LICENSE` file containing the full MIT License text.

The license for this project's code does not automatically apply to model weights, Transformers.js, or other dependencies. Review each component's own license and usage terms.

---

## 👩‍💻 Author

**Your Name**

- GitHub: `https://github.com/YOUR-USERNAME`
- Project: TouchGrass AI

Replace these placeholders with your own details before publishing.

---

## 🌱 Final Thought

> Technology should not only keep us connected to our screens. It should also help us reconnect with the world around us.

Take a breath. Step outside. Notice something new.

**Less screen. More green. 🌿**
