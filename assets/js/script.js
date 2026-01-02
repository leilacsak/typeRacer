
  // Sample texts for each difficulty level
  const sampleTexts = {
    easy: [
      "The quick brown fox jumps over the lazy dog.",
      "Pack my box with five dozen liquor jugs.",
      "A wizard’s job is to vex chumps quickly in fog."
    ],
    medium: [
      "Sphinx of black quartz, judge my vow.",
      "How razorback-jumping frogs can level six piqued gymnasts!",
      "The five boxing wizards jump quickly."
    ],
    hard: [
      "Jinxed wizards pluck ivy from the big quilt.",
      "Crazy Frederick bought many very exquisite opal jewels.",
      "We promptly judged antique ivory buckles for the next prize."
    ]
  };

  let startTime = null;
  let timerInterval = null;

  function getRandomSample(level) {
    const texts = sampleTexts[level] || sampleTexts.easy;
    return texts[Math.floor(Math.random() * texts.length)];
  }

  function updateSampleText() {
    const select = document.getElementById("difficultySelect");
    const sampleText = document.getElementById("sampleText");
    sampleText.textContent = getRandomSample(select.value);
    document.getElementById("resultLevel").textContent = select.value.charAt(0).toUpperCase() + select.value.slice(1);
  }

  function startTest() {
    document.getElementById("userInput").value = "";
    startTime = Date.now();
    document.getElementById("resultTime").textContent = "0.00s";
    document.getElementById("resultWpm").textContent = "";
    timerInterval = setInterval(updateTimer, 100);
  }

  function stopTest() {
    if (!startTime) return;
    clearInterval(timerInterval);
    const endTime = Date.now();
    const elapsed = (endTime - startTime) / 1000;
    document.getElementById("resultTime").textContent = elapsed.toFixed(2) + "s";
    calculateWPM(elapsed);
    startTime = null;
  }

  function retryTest() {
    updateSampleText();
    document.getElementById("userInput").value = "";
    document.getElementById("resultTime").textContent = "";
    document.getElementById("resultWpm").textContent = "";
    startTime = null;
    clearInterval(timerInterval);
  }

  function updateTimer() {
    if (!startTime) return;
    const now = Date.now();
    const elapsed = (now - startTime) / 1000;
    document.getElementById("resultTime").textContent = elapsed.toFixed(2) + "s";
  }

  function calculateWPM(elapsed) {
    const userInput = document.getElementById("userInput").value.trim();
    const wordCount = userInput.length > 0 ? userInput.split(/\s+/).length : 0;
    const wpm = elapsed > 0 ? (wordCount / elapsed) * 60 : 0;
    document.getElementById("resultWpm").textContent = Math.round(wpm);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const select = document.getElementById("difficultySelect");
    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");
    const retryBtn = document.getElementById("retryBtn");
    const userInput = document.getElementById("userInput");

    select.addEventListener("change", updateSampleText);
    startBtn.addEventListener("click", startTest);
    stopBtn.addEventListener("click", stopTest);
    retryBtn.addEventListener("click", retryTest);

    // Optional: calculate WPM live as user types
    userInput.addEventListener("input", function () {
      if (startTime) {
        const now = Date.now();
        const elapsed = (now - startTime) / 1000;
        calculateWPM(elapsed);
      }
    });

    // Set initial text and level
    updateSampleText();
  });
