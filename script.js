const scrollContainer = document.getElementById("scrollContainer");
const content = document.getElementById("content");
const titleContainer = document.querySelector('.title-container');

// Web Audio API setup (same as before)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator = audioContext.createOscillator();
oscillator.type = "sine";
oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
oscillator.connect(audioContext.destination);
oscillator.start();

let honkAudio = new Audio("./audio/honk.mp3");
let sirenAudio = new Audio("./audio/siren.mp3");
honkAudio.load();
sirenAudio.load();

let isPlaying = false;
let sirenTriggered = false;

document.body.addEventListener('click', playSounds);

function playSounds() {
  if (isPlaying) return;
  isPlaying = true;

  sirenAudio.play();
  setTimeout(() => {
    honkAudio.play();
  }, 10000);

  setTimeout(() => {
    fadeOutAudio(sirenAudio, 5000);
  }, 5000);

  setTimeout(() => {
    fadeOutAudio(honkAudio, 5000);
  }, 15000);

  setTimeout(() => {
    isPlaying = false;
  }, 20000);
}

function fadeOutAudio(audio, duration) {
  const fadeInterval = 50;
  const fadeStep = audio.volume / (duration / fadeInterval);
  const fadeOut = setInterval(() => {
    if (audio.volume > 0.05) {
      audio.volume -= fadeStep;
    } else {
      clearInterval(fadeOut);
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 1;
    }
  }, fadeInterval);
}

// Cryptic Messages
const crypticMessages = [
  "Why can’t you just listen for once?! It’s not that hard! I am listening, but you’re not even being fair right now!",
  "Does anyone have a lighter?",
  "Can you buzz apartment #13?",
  "Keep it down!",
  "I can't believe you got with him",
  "I'm calling an uber"
];

// Show cryptic messages at specific scroll depths
let lastMessageIndex = -1;  // Keep track of the last shown message

function showCrypticMessage(scrollDepth) {
  const messageIndex = Math.floor(scrollDepth / 1000) - 1;
  
  if (messageIndex > lastMessageIndex && messageIndex < crypticMessages.length) {
    lastMessageIndex = messageIndex;
    const message = document.createElement("div");
    message.classList.add("crypticMessage");
    message.innerText = crypticMessages[messageIndex];
    
    // Position the message randomly
    message.style.top = `${scrollDepth + window.innerHeight / 2}px`;
    message.style.left = `${Math.random() * (window.innerWidth - 200)}px`;
    
    content.appendChild(message);

    // Remove message after 7 seconds
    setTimeout(() => {
      message.remove();
    }, 7000);
  }
}

// Scroll event listener
scrollContainer.addEventListener("scroll", () => {
  const scrollDepth = scrollContainer.scrollTop;
  const scrollBottom = scrollContainer.scrollTop + scrollContainer.clientHeight;
  const containerHeight = scrollContainer.scrollHeight;

  if (scrollBottom >= containerHeight - 100) {
    addMoreContent();
  }

  if (scrollDepth > 10) {
    titleContainer.style.opacity = '0';
  } else {
    titleContainer.style.opacity = '1';
  }

  showCrypticMessage(scrollDepth);
});

// Infinite scroll and creepy effects (same as before)
function addMoreContent() {
  const newContent = document.createElement('div');
  newContent.style.height = '200vh';
  newContent.style.background = 'transparent';
  newContent.innerHTML = "<p style='color:white; font-size:2rem;'></p>";
  content.appendChild(newContent);
}

// Cursor ripple effect and white dots (same as before)
document.addEventListener("mousemove", function (e) {
  changeSoundPitch(e.clientX);
  createRipple(e.clientX, e.clientY);
});

function changeSoundPitch(x) {
  const frequency = 200 + (x / window.innerWidth) * 400;
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
}

function createRipple(x, y) {
  const ripple = document.createElement("div");
  ripple.classList.add("ripple");
  ripple.style.width = ripple.style.height = `${Math.random() * 50 + 50}px`;
  ripple.style.left = `${x - 25}px`;
  ripple.style.top = `${y - 25}px`;
  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 1000);
}

// White dot effect (same as before)
function triggerCreepyEffect() {
  const randomObject = document.createElement("div");
  randomObject.classList.add("randomObject");
  randomObject.style.left = `${Math.random() * window.innerWidth}px`;
  randomObject.style.top = `${scrollContainer.scrollTop + Math.random() * window.innerHeight}px`;
  content.appendChild(randomObject);
  setTimeout(() => {
    randomObject.remove();
  }, 5000);
}

function generateWhiteDots() {
  setInterval(() => {
    triggerCreepyEffect();
  }, 1500);
}

generateWhiteDots();


// Function to add more content for infinite scroll (keeping the same background)
function addMoreContent() {
  // Create a new div element for additional content
  const newContent = document.createElement('div');
  newContent.style.height = '200vh'; // Add height to extend scrolling
  newContent.style.background = 'transparent'; // Keep the background transparent to inherit the existing background
  newContent.innerHTML = "<p style='color:white; font-size:2rem;'></p>";

  // Append the new content to the existing content
  content.appendChild(newContent);
}

/* -------------------- Pop-up Window Feature -------------------- */

// List of images to randomly choose from
const imageList = [
  "./Images/IMG_0395 2.jpg",
  "./Images/IMG_0423 2.jpg",
  "./Images/Bar-3.jpg",
  "./Images/IMG_0426 2.png",
  "./Images/IMG_1207.png",
  // Add more image paths here
];

// Function to create pop-up windows as you scroll
function triggerPopUpWindow() {
  const popup = document.createElement("div");
  popup.classList.add("popupWindow");

  // Randomly choose an image from the list
  const randomImage = imageList[Math.floor(Math.random() * imageList.length)];

  // Add a random position
  popup.style.left = `${Math.random() * (window.innerWidth - 200)}px`; // Avoid placing it off-screen
  popup.style.top = `${scrollContainer.scrollTop + Math.random() * (window.innerHeight - 200)}px`;

  // Add the image content inside the pop-up
  popup.innerHTML = `
    <p style="color: white; font-size: 1rem;">Click to open image</p>
    <img class="popupContent" style="display: none;" src="${randomImage}" width="320" height="240" alt="Sample Image">`;

  // Add click event to toggle the content
  popup.addEventListener('click', function () {
    const content = popup.querySelector('.popupContent');
    if (content.style.display === 'none') {
      content.style.display = 'block';
      content.style.border = '2px solid white'; // Add white border when content is shown
    } else {
      content.style.display = 'none';
    }
  });

  // Append the pop-up to the content
  content.appendChild(popup);

  // Automatically remove the popup after 10 seconds
  setTimeout(() => {
    popup.remove();
  }, 10000);
}

// Function to continuously add pop-up windows
function generatePopUpWindows() {
  setInterval(() => {
    triggerPopUpWindow();  // Add a pop-up periodically
  }, 10000);  // Every 10 seconds
}

// Start generating pop-up windows
generatePopUpWindows();

// Function to trigger the flashing siren lights
function triggerSirenEffect() {
  if (sirenTriggered) return; // Prevent multiple triggers

  sirenTriggered = true; // Set flag to true after first trigger

  const siren = document.createElement("div");
  siren.classList.add("sirenEffect");
  document.body.appendChild(siren);

  // Flashing for 5 seconds, then fade out
  setTimeout(() => {
    fadeOutSiren(siren);
  }, 5000); // Siren lasts for 5 seconds
}

// Fade out the siren effect
function fadeOutSiren(siren) {
  siren.style.opacity = '0'; // Set opacity to 0 to trigger fade-out

  setTimeout(() => {
    siren.remove(); // Remove the siren effect after fading out
  }, 3000); // 3 seconds to match the CSS transition time
}

// Ensure the siren is triggered based on scroll depth
scrollContainer.addEventListener("scroll", () => {
  const scrollDepth = scrollContainer.scrollTop;
  const scrollBottom = scrollContainer.scrollTop + scrollContainer.clientHeight;
  const containerHeight = scrollContainer.scrollHeight;

  if (scrollBottom >= containerHeight - 100) {
    addMoreContent();
  }

  if (scrollDepth > 10) {
    titleContainer.style.opacity = '0';
  } else {
    titleContainer.style.opacity = '1';
  }

  // Trigger the siren and flashing lights based on scroll depth
  if (scrollDepth > 2000 && !sirenTriggered) {
    triggerSirenEffect(); // Trigger siren lights
    triggerCreepyEffect(); // Optional: Trigger other effects too
  }

  showCrypticMessage(scrollDepth); // Show the cryptic messages
});
// Debounce function to prevent the scroll event from firing too quickly
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Function to add more content for infinite scroll
function addMoreContent() {
  const newContent = document.createElement('div');
  newContent.style.height = '200vh'; // Add height to extend scrolling
  newContent.style.background = 'transparent'; // Keep the background transparent to inherit the existing background
  newContent.innerHTML = "<p style='color:white; font-size:2rem;'></p>";

  // Append the new content to the existing content
  content.appendChild(newContent);
}

// Scroll event listener with debounce for smoother experience
scrollContainer.addEventListener('scroll', debounce(() => {
  const scrollBottom = scrollContainer.scrollTop + scrollContainer.clientHeight;
  const containerHeight = scrollContainer.scrollHeight;

  // Infinite scroll: Check if the user has reached near the bottom (within 300px of the end)
  if (scrollBottom >= containerHeight - 300) {
    addMoreContent(); // Add more content for infinite scroll
  }

}, 100)); // 100ms debounce for smoother performance
// Function to generate random cryptic text flood
function floodCrypticText() {
  const randomTexts = [
    "3f5f8~*^^404", "bzZ#z~r", "!!@%$", "xYZ*&%9", "9kJS!!*", 
    "kjQww#", "!$#%@!!", "/*404*/", "Error~!?%", "@Unknown*", 
    "~404~$$!", "7x9z&$@!", "O8#%404", "??#$%@**", "qZ!&*404"
  ];

  // Create multiple cryptic text elements
  for (let i = 0; i < 20; i++) {
    const text = document.createElement('div');
    text.classList.add('crypticFlood');
    text.innerText = randomTexts[Math.floor(Math.random() * randomTexts.length)];

    // Set random position for each text element
    text.style.left = `${Math.random() * (window.innerWidth - 200)}px`;
    text.style.top = `${Math.random() * (window.innerHeight - 200)}px`;

    document.body.appendChild(text);

    // Remove the text after 5 seconds (matching the animation duration)
    setTimeout(() => {
      text.remove();
    }, 5000);
  }
}

// Trigger the flood of cryptic text 10 seconds after the page loads
setTimeout(floodCrypticText, 10000);
