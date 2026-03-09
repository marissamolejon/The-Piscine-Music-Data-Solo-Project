export function getMostOften(events, propertyGetter) {
  if (!events || events.length === 0) return null;

  const stats = {};

  events.forEach(event => {
    const key = propertyGetter(event);
    stats[key] = (stats[key] || 0) + 1;
  });

  return Object.entries(stats).reduce((a, b) =>
    b[1] > a[1] ? b : a
  );
}

export function isFridayNight(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDay();
  const hours = date.getHours();

  if (day === 5 && hours >= 17) return true;
  if (day === 6 && hours < 4) return true;

  return false;
}


/* Longest streak of the same song played consecutively */

export function calculateLongestStreak(events) {

  if (!events || events.length === 0) return null;

  let maxStreak = 1;
  let currentStreak = 1;

  let bestSongId = events[0].song_id;
  let currentSongId = events[0].song_id;

  for (let i = 1; i < events.length; i++) {

    if (events[i].song_id === currentSongId) {
      currentStreak++;

    } else {

      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
        bestSongId = currentSongId;
      }

      currentSongId = events[i].song_id;
      currentStreak = 1;
    }
  }

  if (currentStreak > maxStreak) {
    maxStreak = currentStreak;
    bestSongId = currentSongId;
  }

  return {
    id: bestSongId,
    length: maxStreak
  };
}


/* Songs played every active day */

export function getEveryDaySongs(events) {

  if (!events || events.length === 0) return [];

  const days = [...new Set(events.map(e => e.timestamp.split("T")[0]))];

  const songsPerDay = days.map(day => {

    const songs = events
      .filter(e => e.timestamp.startsWith(day))
      .map(e => e.song_id);

    return new Set(songs);
  });

  const firstDaySongs = [...songsPerDay[0]];

  return firstDaySongs.filter(songId =>
    songsPerDay.every(daySet => daySet.has(songId))
  );
}