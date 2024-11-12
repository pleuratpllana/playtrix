import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components//shared/Sidebar";
import Header from "../components//shared/Header";
import PlaylistModal from "../components/shared/PlaylistModal";

const Default = () => {
  const [playlist, setPlaylist] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteAllFromPlaylist = () => {
    setPlaylist([]);
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const addToPlaylist = (song) => {
    if (!playlist.some((item) => item.id === song.id)) {
      setPlaylist((prevPlaylist) => [...prevPlaylist, song]);
    }
  };

  const updateSongTitle = (songId, newTitle) => {
    setPlaylist((prevPlaylist) =>
      prevPlaylist.map((song) =>
        song.id === songId ? { ...song, title: newTitle } : song
      )
    );
  };

  const removeFromPlaylist = (songId) => {
    setPlaylist((prevPlaylist) =>
      prevPlaylist.filter((song) => song.id !== songId)
    );
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-grow w-full">
        <Header playlistCount={playlist.length} toggleModal={toggleModal} />
        <Outlet context={{ addToPlaylist, playlist }} />
        {isModalOpen && (
          <PlaylistModal
            playlist={playlist}
            removeFromPlaylist={removeFromPlaylist}
            toggleModal={toggleModal}
            updateSongTitle={updateSongTitle}
            deleteAllFromPlaylist={deleteAllFromPlaylist}
          />
        )}
      </main>
    </div>
  );
};

export default Default;
