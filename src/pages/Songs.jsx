import Section from "../components/shared/Section";
import Filters from "../components/shared/Filters";
import Table from "../components/shared/Table";
import { useState, useEffect } from "react";
import { fetchPopularDeezerSongs as fetchDeezerSongs } from "../config/config";
import { pageDetails } from "../utils/utils";

const Songs = () => {
  const [songs, setSongs] = useState([]); // All songs fetched
  const [filteredSongs, setFilteredSongs] = useState([]); // Filtered songs based on search or filter
  const [activeFilterId, setActiveFilterId] = useState(null); // Filter selection
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [loading, setLoading] = useState(false); // Loading state
  const [playingTrack, setPlayingTrack] = useState(null); // Track being played
  const [audio, setAudio] = useState(null); // Audio instance

  const { title, description, mainHeadings } = pageDetails.songs;

  const filterOptions = [
    { id: "alphabetical", label: "A-Z" },
    { id: "duration", label: "Duration" },
    { id: "position", label: "Position" },
  ];

  // Fetch the list of songs when component mounts
  useEffect(() => {
    const loadSongs = async () => {
      setLoading(true);
      const initialSongs = await fetchDeezerSongs();
      setSongs(initialSongs);
      setFilteredSongs(initialSongs); // Set both to initial fetched songs
      setLoading(false);
    };
    loadSongs();
  }, []);

  // Handle play/pause of the track
  const handlePlayPause = (trackId, previewUrl) => {
    if (playingTrack?.trackId === trackId) {
      setPlayingTrack(null); // Pause if the same track is playing
    } else {
      setPlayingTrack({ trackId, previewUrl }); // Play the new track
    }
  };

  // Play audio when a track is selected
  useEffect(() => {
    if (playingTrack) {
      if (audio) audio.pause(); // Pause previous audio if playing
      const newAudio = new Audio(playingTrack.previewUrl);
      newAudio.play();
      setAudio(newAudio);

      // Add event listener for the 'ended' event to reset the playing track when the song finishes
      newAudio.addEventListener("ended", () => {
        setPlayingTrack(null); // Reset playing track when song ends
      });
    } else if (audio) {
      audio.pause(); // Pause the audio if no track is selected
    }
  }, [playingTrack]);

  // Handle search functionality (fetch filtered results based on search term)
  const handleSearchChange = async (term) => {
    setSearchTerm(term);
    setLoading(true);
    const results = await fetchDeezerSongs(term); // Fetch filtered data based on search term
    setSongs(results);
    setFilteredSongs(results); // Set the filtered songs based on the search
    setLoading(false);
  };

  // Handle the filter selection (A-Z, Duration, Position)
  const handleFilterSelect = (filterId) => {
    setActiveFilterId(filterId); // Set active filter
    let sortedSongs = [...filteredSongs]; // Start with the already filtered list

    // Apply sorting based on the selected filter
    switch (filterId) {
      case "alphabetical":
        sortedSongs.sort((a, b) => a.title.localeCompare(b.title)); // Sort A-Z
        break;
      case "duration":
        sortedSongs.sort((a, b) => a.duration - b.duration); // Sort by duration
        break;
      case "position":
        sortedSongs.sort((a, b) => a.position - b.position); // Sort by position
        break;
      default:
        break;
    }
    setFilteredSongs(sortedSongs); // Set the sorted songs
  };

  return (
    <Section
      title={title}
      description={description}
      searchTerm={searchTerm}
      setSearchTerm={handleSearchChange} // Search handler
    >
      <Filters
        options={filterOptions}
        onFilterSelect={handleFilterSelect} // Filter handler
        activeFilterId={activeFilterId}
      />

      {loading ? (
        <div className="text-white text-center mt-10">Loading...</div>
      ) : filteredSongs.length === 0 ? (
        <div className="text-white text-center mt-10">
          No data available for your search
        </div>
      ) : (
        <Table
          mainHeadings={mainHeadings}
          data={filteredSongs} // Pass filtered songs
          handlePlayPause={handlePlayPause}
          playingTrack={playingTrack}
          showPlaylistColumn={true}
        />
      )}
    </Section>
  );
};

export default Songs;
