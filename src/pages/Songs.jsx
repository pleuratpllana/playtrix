import Section from "../components/shared/Section";
import Filters from "../components/shared/Filters";
import Table from "../components/shared/Table";
import { useState, useEffect } from "react";
import { fetchPopularDeezerSongs as fetchDeezerSongs } from "../config/config";
import { pageDetails } from "../utils/utils";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]); 
  const [activeFilterId, setActiveFilterId] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [playingTrack, setPlayingTrack] = useState(null); 
  const [audio, setAudio] = useState(null); 

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
      setFilteredSongs(initialSongs); 
      setLoading(false);
    };
    loadSongs();
  }, []);

  // Handle play/pause of the track
  const handlePlayPause = (trackId, previewUrl) => {
    if (playingTrack?.trackId === trackId) {
      setPlayingTrack(null); 
    } else {
      setPlayingTrack({ trackId, previewUrl }); 
    }
  };

  // Play audio when a track is selected
  useEffect(() => {
    if (playingTrack) {
      if (audio) audio.pause();
      const newAudio = new Audio(playingTrack.previewUrl);
      newAudio.play();
      setAudio(newAudio);

      // Add event listener for the 'ended' event to reset the playing track when the song finishes
      newAudio.addEventListener("ended", () => {
        setPlayingTrack(null); 
      });
    } else if (audio) {
      audio.pause(); 
    }
  }, [playingTrack]);

  // Handle search functionality (fetch filtered results based on search term)
  const handleSearchChange = async (term) => {
    setSearchTerm(term);
    setLoading(true);
    const results = await fetchDeezerSongs(term); 
    setSongs(results);
    setFilteredSongs(results); 
    setLoading(false);
  };

  // Handle the filter selection (A-Z, Duration, Position)
  const handleFilterSelect = (filterId) => {
    setActiveFilterId(filterId); 
    let sortedSongs = [...filteredSongs]; 

    // Apply sorting based on the selected filter
    switch (filterId) {
      case "alphabetical":
        sortedSongs.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "duration":
        sortedSongs.sort((a, b) => a.duration - b.duration); 
        break;
      case "position":
        sortedSongs.sort((a, b) => a.position - b.position); 
        break;
      default:
        break;
    }
    setFilteredSongs(sortedSongs); 
  };

  return (
    <Section
      title={title}
      description={description}
      searchTerm={searchTerm}
      setSearchTerm={handleSearchChange}
    >
      <Filters
        options={filterOptions}
        onFilterSelect={handleFilterSelect} 
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
          data={filteredSongs}
          handlePlayPause={handlePlayPause}
          playingTrack={playingTrack}
          showPlaylistColumn={true}
        />
      )}
    </Section>
  );
};

export default Songs;
