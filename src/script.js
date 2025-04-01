const apiKey = "5dd1aa5cb96fee4ae39c6ccc7d145030";
const username = "Mlody22222";

async function fetchCurrentlyPlaying() {
  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`,
    );
    const data = await response.json();

    if (
      data.recenttracks &&
      data.recenttracks.track &&
      data.recenttracks.track[0]
    ) {
      const track = data.recenttracks.track[0];
      const isPlaying = track["@attr"] && track["@attr"].nowplaying === "true";
      const trackName = track.name;
      const artistName = track.artist["#text"];
      const albumArt = track.image && track.image[2]["#text"];

      if (isPlaying) {
        document.getElementById("current-track").textContent =
          `${trackName} - ${artistName}`;
        const albumArtElement = document.getElementById("album-art");
        if (albumArt) {
          albumArtElement.src = albumArt;
          albumArtElement.style.display = "block";
        } else {
          albumArtElement.style.display = "none";
        }
      } else {
        document.getElementById("current-track").textContent =
          "No music is playing currently.";
        document.getElementById("album-art").style.display = "none";
      }
    } else {
      document.getElementById("current-track").textContent =
        "No music is playing currently.";
      document.getElementById("album-art").style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching currently playing track:", error);
    document.getElementById("current-track").textContent =
      "Error fetching currently playing track.";
    document.getElementById("album-art").style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchCurrentlyPlaying();
  setInterval(fetchCurrentlyPlaying, 30000);
});
