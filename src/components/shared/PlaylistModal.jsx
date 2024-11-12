import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const PlaylistModal = ({
  playlist,
  removeFromPlaylist,
  toggleModal,
  updateSongTitle,
  deleteAllFromPlaylist,
}) => {
  const [editMode, setEditMode] = useState(null);
  const [titleInput, setTitleInput] = useState("");

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") toggleModal();
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [toggleModal]);

  const handleEditClick = (song) => {
    setEditMode(song.id);
    setTitleInput(song.title);
  };

  const handleSave = (songId) => {
    if (titleInput.trim()) {
      updateSongTitle(songId, titleInput);
      setEditMode(null);
    }
  };

  const handleKeyDown = (event, songId) => {
    if (event.key === "Enter") {
      handleSave(songId);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 modal-overlay z-10"
      onClick={toggleModal}
    >
      <div
        className="bg-gray-200 p-6 rounded-lg max-w-3xl w-full mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold mb-2">
            Your Current Playlist has{" "}
            <span className="text-green-600">{playlist.length} </span>
            {playlist.length === 1 ? "song" : "songs"}
          </h2>

          <div className="flex space-x-3">
            {/* "Delete All" Button */}
            <button
              onClick={deleteAllFromPlaylist}
              className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition duration-200 text-xs mb-2"
            >
              <TrashIcon className="w-4 h-4" />
              <span className="text-sm">Remove All</span>
            </button>

            {/* Close button */}
            <button
              onClick={toggleModal}
              className="flex mb-3 bg-green-600 rounded-full px-2 py-1 text-xs text-white transition duration-300 ease-in-out hover:bg-green-700"
            >
              ✕
            </button>
          </div>
        </div>
        <ul className="space-y-6 border-t border-gray-300 max-h-[60vh] overflow-y-auto">
          {playlist.map((song, index) => (
            <li
              key={song.id}
              className={`flex justify-between items-center border-b border-gray-300 pb-6 mr-4 ${
                index === 0 ? "pt-6" : "pt-0"
              }`}
            >
              {editMode === song.id ? (
                <input
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, song.id)}
                  className="border px-2 py-1 rounded"
                />
              ) : (
                <span>{song.title}</span>
              )}
              <div className="flex space-x-5">
                {editMode === song.id ? (
                  <button
                    onClick={() => handleSave(song.id)}
                    className="flex items-center space-x-1 text-black hover:text-green-600"
                  >
                    <PencilIcon className="w-5 h-5" />
                    <span className="text-sm">Save</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(song)}
                    className="flex items-center space-x-1 text-black hover:text-green-600"
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span className="text-sm">Edit</span>
                  </button>
                )}
                <button
                  onClick={() => removeFromPlaylist(song.id)}
                  className="flex items-center space-x-1 text-black hover:text-green-600"
                >
                  <TrashIcon className="w-4 h-4" />
                  <span className="text-sm">Remove</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlaylistModal;
