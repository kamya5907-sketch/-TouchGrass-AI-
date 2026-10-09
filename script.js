
/*
  TouchGrass AI
  Open-weight model: Xenova/flan-t5-small
  Library: Transformers.js

  The first AI request requires internet access to download
  the library and model. A fallback planner is included.
*/

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

let selectedMood = "stressed";
let currentPlan = null;
let generator = null;
let modelPromise = null;
let completed = Number(localStorage.getItem("tg-completed") || 0);

const fallbackPlans = {
    stressed: [
        {
            title: "Take a slow sensory walk",
            description: "Walk gently for your chosen time. Notice five things you can see, four things you can hear, and three things you can feel. Keep your phone in your pocket.",
            icon: "🌿"
        },
        {
            title: "Find a quiet green corner",
            description: "Find a safe outdoor spot, sit comfortably, and take ten slow breaths. Watch the leaves move and give yourself a small break.",
            icon: "🍃"
        },
        {
            title: "Enjoy a mindful sky break",
            description: "Find a safe place to pause and look at the sky. Follow a cloud or notice how the light changes.",
            icon: "☁️"
        }
    ],

    "low-energy": [
        {
            title: "Take a sunlight break",
            description: "Step into a garden, balcony, or sunny outdoor space. Stretch gently and notice the temperature, light, and sounds around you.",
            icon: "☀️"
        },
        {
            title: "Water a plant",
            description: "Spend a few minutes caring for a plant. Check its soil, water it if needed, and notice a detail in one of its leaves.",
            icon: "🪴"
        },
        {
            title: "Sit outside and rest",
            description: "Find a comfortable, safe outdoor spot. Sit for a few minutes and listen to the sounds around you. Rest counts, too.",
            icon: "🌱"
        }
    ],

    curious: [
        {
            title: "Become a nature detective",
            description: "Find three different leaf shapes, textures, or colours. Look closely without picking anything. You can photograph your discoveries.",
            icon: "🔎"
        },
        {
            title: "Listen for bird sounds",
            description: "Pause in a safe outdoor spot and listen quietly. Try to notice how many different bird calls you can hear.",
            icon: "🐦"
        },
        {
            title: "Go on a colour hunt",
            description: "Choose one colour and find five natural things with that colour. Look for details you might normally walk past.",
            icon: "🎨"
        }
    ],

    social: [
        {
            title: "Invite someone for a mini walk",
            description: "Ask a friend or family member to take a short walk with you. Each person points out one thing they appreciate along the way.",
            icon: "👟"
        },
        {
            title: "Share a garden moment",
            description: "Visit a shared garden or park with someone. Choose a comfortable spot and share one interesting thing you notice.",
            icon: "🌼"
        },
        {
            title: "Take a no-scroll stroll",
            description: "Walk with a friend and keep phones away unless needed for safety. Enjoy the surroundings and have a real conversation.",
            icon: "🤝"
        }
    ]
};

const challenges = [
    "Notice 3 things you usually miss.",
    "Find a leaf with an interesting shape.",
    "Listen quietly and count 3 different sounds.",
    "Spot something growing through a tiny crack.",
    "Look up and notice the shape of the clouds.",
    "Find 3 different shades of green.",
    "Take a short walk without checking your phone."
];

let challengeIndex = 0;

/* Show AI status */

function setStatus(message, type = "") {
    const status = $("#ai-status");

    status.className = `ai-status ${type}`.trim();

    const text = document.createElement("span");
    text.textContent = message;

    status.replaceChildren();

    const dot = document.createElement("span");
    dot.className = "status-dot";

    status.append(dot, text);
}

/* Choose a fallback activity */

function chooseFallback(mood, minutes, place) {
    const activities = fallbackPlans[mood] || fallbackPlans.stressed;

    const activity =
        activities[Math.floor(Math.random() * activities.length)];

    let description = activity.description;

    if (place === "home") {
        description +=
            " A balcony, doorstep, or safe outdoor area near home is enough.";
    } else if (place === "park") {
        description +=
            " Choose a comfortable spot in a park or garden and follow its rules.";
    } else if (place === "trail") {
        description +=
            " Stay on marked paths and let someone know where you are going.";
    }

    if (minutes <= 10) {
        description +=
            " Keep it small: even five mindful minutes count.";
    }

    return {
        title: activity.title,
        description: description,
        icon: activity.icon,
        minutes: minutes,
        source: "fallback"
    };
}

/* Load the open-weight AI model */

async function loadModel() {
    if (generator) {
        return generator;
    }

    if (modelPromise) {
        return modelPromise;
    }

    if (
        !window.transformers ||
        !window.transformers.pipeline
    ) {
        throw new Error("Transformers.js could not load.");
    }

    modelPromise = (async () => {
        setStatus(
            "Loading the open model. The first download may take time.",
            "loading"
        );

        const { pipeline, env } = window.transformers;

        // Model files may be cached by the browser.
        env.allowLocalModels = false;
        env.useBrowserCache = true;

        generator = await pipeline(
            "text2text-generation",
            "Xenova/flan-t5-small",
            {
                quantized: true
            }
        );

        return generator;
    })();

    try {
        return await modelPromise;
    } catch (error) {
        modelPromise = null;
        generator = null;

        throw error;
    }
}

/* Mood-specific display helpers */

function titleForMood(mood) {
    const titles = {
        stressed: "A mindful nature reset",
        "low-energy": "A gentle outdoor moment",
        curious: "Explore like a nature detective",
        social: "Share a little adventure"
    };

    return titles[mood] || "Your outside moment";
}

function moodIcon(mood) {
    const icons = {
        stressed: "🌿",
        "low-energy": "☀️",
        curious: "🔎",
        social: "🌼"
    };

    return icons[mood] || "🍃";
}

/* Generate an activity */

async function generatePlan() {
    const minutes = Number($("#time-select").value);
    const place = $("#place-select").value;
    const button = $("#generate-btn");

    button.disabled = true;
    button.textContent = "Thinking...";

    // A fallback is always available.
    let plan = chooseFallback(selectedMood, minutes, place);

    try {
        const model = await loadModel();

        setStatus(
            "Creating an activity with open-weight AI in your browser...",
            "loading"
        );

        const prompt =
            `Suggest one safe and simple outdoor activity for someone ` +
            `who feels ${selectedMood}, has ${minutes} minutes, and is ` +
            `near ${place}. Encourage noticing nature and spending less ` +
            `time on screens. Avoid special equipment. ` +
            `Reply in two short sentences.`;

        const result = await model(prompt, {
            max_new_tokens: 90,
            temperature: 0.8,
            do_sample: true
        });

        const generated =
            result?.[0]?.generated_text?.trim();

        if (generated && generated.length > 12) {
            plan = {
                title: titleForMood(selectedMood),
                description: generated,
                icon: moodIcon(selectedMood),
                minutes: minutes,
                source: "ai"
            };
        }

        setStatus(
            "Open-weight AI is ready. Your idea was generated in the browser."
        );

    } catch (error) {
        console.warn("AI unavailable; using fallback planner:", error);

        setStatus(
            "AI could not load. Your activity comes from the built-in planner. Internet is needed for the first model download.",
            "error"
        );
    }

    currentPlan = plan;

    renderPlan(plan);

    button.disabled = false;
    button.innerHTML = 'Make my plan <span>✦</span>';
}

/* Display the selected activity */

function renderPlan(plan) {
    const card = $("#recommendation");

    card.querySelector(".recommendation-icon").textContent =
        plan.icon;

    card.querySelector(".result-kicker").textContent =
        plan.source === "ai"
            ? "YOUR AI-GENERATED OUTSIDE MOMENT"
            : "YOUR OUTSIDE MOMENT";

    card.querySelector("h3").textContent = plan.title;

    card.querySelector("p").textContent =
        plan.description;

    const chips = card.querySelector(".chips");

    chips.replaceChildren();

    const timeChip = document.createElement("span");
    timeChip.textContent = `About ${plan.minutes} minutes`;

    const typeChip = document.createElement("span");
    typeChip.textContent =
        plan.source === "ai"
            ? "Open-weight AI"
            : "No special gear";

    chips.append(timeChip, typeChip);

    const completeButton = $("#complete-btn");

    completeButton.disabled = false;
    completeButton.classList.remove("done");
    completeButton.textContent = "Mark done ✓";
}

/* Update completed outdoor activities */

function renderProgress() {
    completed = Number(
        localStorage.getItem("tg-completed") || 0
    );

    $("#progress-fill").style.width =
        completed > 0 ? "100%" : "0%";

    $("#progress-label").textContent =
        `${completed} outdoor moment${completed === 1 ? "" : "s"} completed`;
}

/* Load saved nature journal entries */

function loadJournal() {
    const notes = JSON.parse(
        localStorage.getItem("tg-journal") || "[]"
    );

    const list = $("#journal-list");

    list.replaceChildren();

    notes.slice(0, 5).forEach((note) => {
        const item = document.createElement("li");

        item.textContent = `✳ ${note}`;

        list.appendChild(item);
    });
}

/* Mood button selection */

$$(".mood").forEach((button) => {
    button.addEventListener("click", () => {
        $$(".mood").forEach((item) => {
            const selected = item === button;

            item.classList.toggle("selected", selected);

            item.setAttribute(
                "aria-pressed",
                String(selected)
            );
        });

        selectedMood = button.dataset.mood;
    });
});

/* Generate plan button */

$("#generate-btn").addEventListener("click", generatePlan);

/* Complete activity button */

$("#complete-btn").addEventListener("click", () => {
    if (!currentPlan) {
        return;
    }

    completed += 1;

    localStorage.setItem(
        "tg-completed",
        String(completed)
    );

    renderProgress();

    const button = $("#complete-btn");

    button.textContent = "Moment completed ✓";
    button.classList.add("done");
    button.disabled = true;

    $("#saved-label").textContent =
        "Nice work! You made time for the outdoors.";
});

/* Generate a new daily challenge */

$("#challenge-btn").addEventListener("click", () => {
    challengeIndex =
        (challengeIndex + 1) % challenges.length;

    $("#challenge-title").textContent =
        challenges[challengeIndex];
});

/* Save a nature journal entry */

$("#save-journal").addEventListener("click", () => {
    const value = $("#journal-entry").value.trim();

    if (!value) {
        $("#saved-label").textContent =
            "Write a little note first.";

        return;
    }

    const notes = JSON.parse(
        localStorage.getItem("tg-journal") || "[]"
    );

    notes.unshift(value);

    localStorage.setItem(
        "tg-journal",
        JSON.stringify(notes.slice(0, 5))
    );

    $("#journal-entry").value = "";

    $("#saved-label").textContent =
        "Your note is saved on this device.";

    loadJournal();
});

/* Reset saved progress */

$("#reset-btn").addEventListener("click", () => {
    const confirmed = confirm(
        "Reset your outdoor progress and saved nature notes?"
    );

    if (!confirmed) {
        return;
    }

    localStorage.removeItem("tg-completed");
    localStorage.removeItem("tg-journal");

    completed = 0;
    currentPlan = null;

    renderProgress();
    loadJournal();

    $("#saved-label").textContent = "Progress reset.";

    $("#complete-btn").disabled = true;
    $("#complete-btn").textContent = "Mark done ✓";
    $("#complete-btn").classList.remove("done");
});

/* Initialize the application */

renderProgress();
loadJournal();