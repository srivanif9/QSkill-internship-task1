async function getSpotifyData() {

    const spotifyUrl = document.getElementById("spotifyUrl").value;
    const result = document.getElementById("result");

    if (!spotifyUrl) {
        alert("Please enter a Spotify URL");
        return;
    }

    result.innerHTML = "<p>Loading...</p>";

    try {

        const response = await fetch(
            `https://spotify-downloader9.p.rapidapi.com/downloadSong?songId=${encodeURIComponent(spotifyUrl)}`,
            {
                method: "GET",
                headers: {
                    "x-rapidapi-key": "a6afa5333fmsh9c1b4cbd12eb42ep1eb80djsnca098ceab79d",
                    "x-rapidapi-host": "spotify-downloader9.p.rapidapi.com"
                }
            }
        );

        const data = await response.json();

        console.log(data);

        result.innerHTML = `
            <div class="card">
                <h2>${data.title || "Song Found"}</h2>
                <p>${data.artist || ""}</p>
                <a href="${data.data?.downloadLink || '#'}" target="_blank">
                    Download Song
                </a>
            </div>
        `;

    } catch (error) {

        console.error(error);

        result.innerHTML = `
            <div class="card">
                <h3>Error</h3>
                <p>API request failed.</p>
            </div>
        `;
    }
}