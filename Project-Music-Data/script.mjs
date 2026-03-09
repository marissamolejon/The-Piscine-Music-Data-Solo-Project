import { getUserIDs, getListenEvents, getSong } from "./data.mjs";
import { getMostOften, isFridayNight, calculateLongestStreak, getEveryDaySongs } from "./common.mjs";

const userSelect = document.getElementById("userSelect");
const resultsArea = document.getElementById("results");


function display(title, answer) {
  const card = document.createElement("section");
  card.className = "question-block";

  card.innerHTML = `
    <h3>${title}</h3>
    <p>${answer}</p>
  `;

  resultsArea.appendChild(card);
}


function showEmptyMessage() {
  resultsArea.innerHTML = `<p>This user has no listening history.</p>`;
}


function renderAllAnswers(events) {

  resultsArea.innerHTML = "";

  if (!events || events.length === 0) {
    showEmptyMessage();
    return;
  }

  events.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const eventsWithSongs = events.map(event => ({
    ...event,
    song: getSong(event.song_id)
  }));


  // Most listened song
  const topSong = getMostOften(eventsWithSongs, e => e.song_id);

  if (topSong) {
    const song = getSong(topSong[0]);
    display("Most listened song", `${song.artist} - ${song.title}`);
  }


  // Most listened artist
  const topArtist = getMostOften(eventsWithSongs, e => e.song.artist);

  if (topArtist) {
    display("Most listened artist", topArtist[0]);
  }


  // Friday night song
  const fridayEvents = eventsWithSongs.filter(e =>
    isFridayNight(e.timestamp)
  );

  if (fridayEvents.length > 0) {
    const topFridaySong = getMostOften(fridayEvents, e => e.song_id);
    const song = getSong(topFridaySong[0]);

    display(
      "Most played Friday night song",
      `${song.artist} - ${song.title}`
    );
  }


  // Longest streak song
  const longestStreak = calculateLongestStreak(events);

  if (longestStreak) {
    const song = getSong(longestStreak.id);

    display(
      "Longest streak song",
      `${song.artist} - ${song.title} (${longestStreak.length} plays in a row)`
    );
  }


  // Songs played every active day
  const everydaySongs = getEveryDaySongs(events);

  if (everydaySongs.length > 0) {
    const songs = everydaySongs
      .map(id => {
        const song = getSong(id);
        return `${song.artist} - ${song.title}`;
      })
      .join(", ");

    display("Songs played every day", songs);

  } else {
    display("Songs played every day", "None");
  }


  // Top genres
  const genreStats = {};

  eventsWithSongs.forEach(e => {
    const genre = e.song.genre;
    genreStats[genre] = (genreStats[genre] || 0) + 1;
  });

  const topGenres = Object.entries(genreStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(g => g[0]);

  display("Top genres", topGenres.join(", "));
}


function populateUsers() {

  const ids = getUserIDs();

  ids.forEach(id => {

    const option = document.createElement("option");
    option.value = id;
    option.textContent = id;

    userSelect.appendChild(option);
  });
}


userSelect.addEventListener("change", () => {

  const userId = userSelect.value;

  if (!userId) {
    resultsArea.innerHTML = "";
    return;
  }

  const events = getListenEvents(userId);

  if (!events || events.length === 0) {
    showEmptyMessage();
    return;
  }

  renderAllAnswers(events);
});


populateUsers();