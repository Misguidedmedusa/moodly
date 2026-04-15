let selectedTag = "";

function selectTag(tag) {
  selectedTag = tag;
}

document.getElementById("saveBtn").addEventListener("click", function () {

  const mood = document.getElementById("moodSlider").value;
  const note = document.getElementById("note").value;
  const date = new Date().toLocaleDateString();

  const entry = {
    mood,
    note,
    tag: selectedTag,
    date
  };

  let data = JSON.parse(localStorage.getItem("moodly")) || [];
  data.push(entry);

  localStorage.setItem("moodly", JSON.stringify(data));

  displayEntries();
});

function getColor(value) {
  if (value < 20) return "#ff4d4d";
  if (value < 40) return "#ff944d";
  if (value < 60) return "#ffd11a";
  if (value < 80) return "#8cd98c";
  return "#4da6ff";
}

function displayEntries() {
  const container = document.getElementById("timeline");
  container.innerHTML = "";

  let data = JSON.parse(localStorage.getItem("moodly")) || [];

  data.reverse().forEach(entry => {
    const div = document.createElement("div");
    div.className = "entry";
    div.style.borderColor = getColor(entry.mood);

    div.innerHTML = `
      <strong>${entry.date}</strong><br>
      Mood: ${entry.mood}<br>
      Tag: ${entry.tag}<br>
      ${entry.note}
    `;

    container.appendChild(div);
  });
}

displayEntries();
