// ========== Data section ==========
// Static schedule of aartis; you can change times/names as needed.
const aartiSchedule = [
  { name: "Pratah Sandhya & Gayatri Japa", time: "6:00 AM" },
  { name: "Madhyahna Pooja", time: "12:00 PM" },
  { name: "Sayam Sandhya & Aarti", time: "6:30 PM" }
];

// A small list of mantras / lines to rotate through.
const mantras = [
  "ॐ भूर्भुवः स्वः। तत्सवितुर्वरेण्यं। भर्गो देवस्य धीमहि। धियो यो नः प्रचोदयात्॥",
  "ॐ शान्तिः शान्तिः शान्तिः॥",
  "ॐ नमो भगवते वासुदेवाय॥"
];

// Keeps track of which mantra is currently shown.
let currentMantraIndex = 0;

// ========== Initialization ==========
// This runs when the DOM is ready because of 'defer' in the script tag.
// It wires up the button and sets initial text.
document.addEventListener("DOMContentLoaded", function () {
  setTodayInfo();
  showCurrentMantra();

  const nextBtn = document.getElementById("next-mantra-btn");
  if (nextBtn) {
    nextBtn.addEventListener("click", nextMantra);
  }

  // Optional: gentle seva reminder after some time
  setTimeout(showDonationReminder, 20000); // 20 seconds
});

// ========== Functions ==========

// Sets the date and next aarti text on the homepage.
function setTodayInfo() {
  const todayDateEl = document.getElementById("today-date");
  const todayAartiEl = document.getElementById("today-aarti");

  if (!todayDateEl || !todayAartiEl) return;

  const now = new Date();

  // This formatting of date/time is slightly advanced JS:
  // toLocaleDateString uses user's locale (here en-IN) to format nicely.
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  todayDateEl.textContent = "Today: " + now.toLocaleDateString("en-IN", options);

  const hour = now.getHours();
  let nextAarti = "";

  // Simple logic based on current hour to choose which aarti is "next".
  if (hour < 9) {
    nextAarti = `Next: ${aartiSchedule[0].name} at ${aartiSchedule[0].time}`;
  } else if (hour < 15) {
    nextAarti = `Next: ${aartiSchedule[1].name} at ${aartiSchedule[1].time}`;
  } else {
    nextAarti = `Next: ${aartiSchedule[2].name} at ${aartiSchedule[2].time}`;
  }

  todayAartiEl.textContent = nextAarti;
}

// Displays the current mantra from the mantras array.
function showCurrentMantra() {
  const mantraEl = document.getElementById("mantra-text");
  if (!mantraEl) return;
  mantraEl.textContent = mantras[currentMantraIndex];
}

// Moves to the next mantra and wraps around using modulo.
function nextMantra() {
  // This line is slightly "clever":
  // (index + 1) % length keeps it cycling 0 -> 1 -> 2 -> 0 -> ...
  currentMantraIndex = (currentMantraIndex + 1) % mantras.length;
  showCurrentMantra();
}

// Shows a confirm dialog and scrolls to contact page if they click OK.
function showDonationReminder() {
  const wantsToKnow = window.confirm(
    "Gayatri Trust – Would you like to know how to participate in seva or donations?"
  );
  if (wantsToKnow) {
    // Redirect to the contact page.
    window.location.href = "contact.html";
  }
}
