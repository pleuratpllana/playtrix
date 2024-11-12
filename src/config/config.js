const PROXY_URL = "https://cors-anywhere.herokuapp.com/";

// API endpoint for popular songs
const DEEZER_SONGS_URL = "https://api.deezer.com/chart?limit=72";

// API endpoint for playlists
const DEEZER_PLAYLISTS_URL = "https://api.deezer.com/user/2529/playlists";

// API endpoint for genres
const DEEZER_GENRE_URL = "https://api.deezer.com/genre";

// API endpoint for artist details
const DEEZER_ARTISTS_URL = "https://api.deezer.com/chart/0/artists?limit=80";

// API endpoint for album search
const DEEZER_ALBUM_SEARCH_URL = "https://api.deezer.com/search/album";

// Fetch popular Deezer songs
export const fetchPopularDeezerSongs = async (searchTerm = "") => {
  try {
    const apiUrl = searchTerm
      ? `https://api.deezer.com/search?q=${encodeURIComponent(searchTerm)}`
      : DEEZER_SONGS_URL;
    const response = await fetch(`${PROXY_URL}${apiUrl}`);
    const data = await response.json();

    const tracks = searchTerm ? data.data : data.tracks.data;

    return tracks.map((song) => ({
      id: song.id,
      title: song.title,
      artist: song.artist.name,
      album: song.album.title,
      cover: song.album.cover,
      duration: song.duration,
      position: song.rank || 0,
      preview: song.preview,
      genre: song.genre_id ? "Genre Name" : "Unknown",
    }));
  } catch (error) {
    console.error("Error fetching songs from Deezer API:", error);
    return [];
  }
};

// Fetch playlists
export const fetchPlaylists = async () => {
  try {
    const response = await fetch(`${PROXY_URL}${DEEZER_PLAYLISTS_URL}`);
    const data = await response.json();
    return data.data.map((playlist) => ({
      id: playlist.id,
      title: playlist.title,
      creator: playlist.user?.name || "Unknown",
      trackCount: playlist.nb_tracks,
      duration: playlist.duration,
      cover: playlist.picture_medium,
    }));
  } catch (error) {
    console.error("Error fetching playlists from Deezer API:", error);
    return [];
  }
};

// Fetch genres
export const fetchGenres = async () => {
  try {
    const response = await fetch(`${PROXY_URL}${DEEZER_GENRE_URL}`);
    const data = await response.json();
    return data.data.map((genre) => ({
      id: genre.id,
      name: genre.name,
    }));
  } catch (error) {
    console.error("Error fetching genres from Deezer API:", error);
    return [];
  }
};

// Assuming fetchGenres is already available in the same config file

export const fetchArtistsList = async (searchTerm = "") => {
  try {
    const apiUrl = searchTerm
      ? `https://api.deezer.com/search/artist?q=${encodeURIComponent(
          searchTerm
        )}`
      : DEEZER_ARTISTS_URL;
    const response = await fetch(`${PROXY_URL}${apiUrl}`);
    const data = await response.json();
    const artists = data.data;

    // Fetch genres and create a lookup map by genre ID
    const genres = await fetchGenres();
    const genreMap = genres.reduce((map, genre) => {
      map[genre.id] = genre.name;
      return map;
    }, {});

    return artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      fanCount: artist.nb_fan, // Renamed to fanCount for clarity
      nb_album: artist.nb_album,
      genre: genreMap[artist.genre_id] || "Not Available", // Use genreMap for genre_id
      picture: artist.picture_medium,
    }));
  } catch (error) {
    console.error("Error fetching artists from Deezer API:", error);
    return [];
  }
};

// Fetch albums with optional search term
export const fetchAlbumsList = async (searchTerm = "top albums") => {
  try {
    const apiUrl = `${DEEZER_ALBUM_SEARCH_URL}?q=${encodeURIComponent(
      searchTerm
    )}`;
    const response = await fetch(`${PROXY_URL}${apiUrl}`);
    const data = await response.json();

    if (!data.data) return [];

    // Map over albums and fetch detailed information for each one
    const albums = await Promise.all(
      data.data.map(async (album) => {
        // Fetch detailed album info
        const detailsResponse = await fetch(
          `${PROXY_URL}https://api.deezer.com/album/${album.id}`
        );
        const detailsData = await detailsResponse.json();

        return {
          id: album.id,
          title: album.title,
          artist: album.artist.name,
          cover: album.cover_medium || "",
          releaseDate: detailsData.release_date || "N/A", // Use "N/A" if release_date is not available
          trackCount: detailsData.nb_tracks || 0,
          genre: detailsData.genres?.data?.[0]?.name || "Unknown Genre",
        };
      })
    );

    return albums;
  } catch (error) {
    console.error("Error fetching albums from Deezer API:", error);
    return [];
  }
};
