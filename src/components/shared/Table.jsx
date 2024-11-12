import { useState, useEffect } from "react";
import {
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";
import { useOutletContext } from "react-router-dom";

const Table = ({
  mainHeadings,
  data,
  handlePlayPause,
  playingTrack,
  showPlaylistColumn = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(6);
  const { addToPlaylist, playlist } = useOutletContext();
  const [tooltip, setTooltip] = useState({
    visible: false,
    songId: null,
    message: "",
  });

  useEffect(() => {
    const handleResize = () => {
      setDataPerPage(window.innerWidth < 640 ? 5 : 6);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const indexOfLastItem = currentPage * dataPerPage;
  const indexOfFirstItem = indexOfLastItem - dataPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / dataPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const iconClasses = (isInPlaylist) =>
    `w-5 h-5 transition-colors duration-300 ${
      isInPlaylist ? "text-green-500 fill-green-500" : "text-green-500"
    } hover:text-white/70`;

  const handleAddToPlaylist = (item) => {
    if (!item.title || !item.artist) {
      setTooltip({
        visible: true,
        songId: item.id,
        message: "Only songs can be added to the playlist",
      });
    } else {
      const isAlreadyAdded = playlist?.some(
        (existingItem) => existingItem.id === item.id
      );
      if (isAlreadyAdded) {
        setTooltip({
          visible: true,
          songId: item.id,
          message: "Already Added",
        });
      } else {
        addToPlaylist(item);
        setTooltip({ visible: true, songId: item.id, message: "Added" });
      }
    }

    setTimeout(() => {
      setTooltip({ visible: false, songId: null, message: "" });
    }, 3000);
  };

  return (
    <main className="max-w-[420px] lg:max-w-full w-full mx-auto overflow-x-auto">
      <table className="w-full text-white text-left mt-7">
        <thead>
          <tr className="bg-white/90 text-black">
            {mainHeadings.map((heading) => (
              <th key={heading} className="py-2 px-3">
                {heading}
              </th>
            ))}
            {showPlaylistColumn && (
              <th className="py-2 px-3 w-40">Add to Playlist</th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row) => (
            <tr
              key={row.id}
              className={`${
                (currentData.indexOf(row) + indexOfFirstItem) % 2 === 0
                  ? "bg-white/10"
                  : ""
              }`}
            >
              {mainHeadings.map((heading) => (
                <td key={heading} className="py-4 px-3">
                  {heading === "Stream" && handlePlayPause ? (
                    <button
                      className="flex items-center space-x-1 p-1 text-green-400 hover:text-white/80 transition duration-200 border border-white/60 rounded-full px-2.5 py-2 text-sm"
                      onClick={() => handlePlayPause(row.id, row.preview)}
                    >
                      {playingTrack && playingTrack.trackId === row.id ? (
                        <PauseIcon className="w-5 h-5" />
                      ) : (
                        <PlayIcon className="w-5 h-5" />
                      )}
                    </button>
                  ) : heading === "Cover" ? (
                    <img
                      src={row.cover}
                      alt="cover"
                      className="w-12 h-12 object-cover"
                    />
                  ) : heading === "Release Date" ? (
                    row.releaseDate || "N/A"
                  ) : (
                    row[heading.toLowerCase().replace(" ", "")] || "N/A"
                  )}
                </td>
              ))}
              {showPlaylistColumn && (
                <td className="py-2 px-3 w-32 text-center relative">
                  <div className="flex justify-start space-x-2">
                    <button
                      onClick={() => handleAddToPlaylist(row)}
                      title="Add to Playlist"
                      className="relative"
                    >
                      <StarIcon
                        className={iconClasses(
                          playlist.some(
                            (existingItem) => existingItem.id === row.id
                          )
                        )}
                      />
                    </button>
                    {tooltip.visible && tooltip.songId === row.id && (
                      <div className="w-24 text-center absolute top-8 left-20 transform -translate-x-1/2 text-white/80 text-xs font-medium shadow-lg text-left">
                        {tooltip.message}
                      </div>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1 || data.length === 0}
          className="flex items-center text-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed group"
        >
          <ChevronLeftIcon className="mt-0.5 w-4 h-4 text-white/70 group-hover:text-white transition duration-300" />
          <span className="ml-1 text-white/70 text-sm group-hover:text-white transition duration-300">
            Prev
          </span>
        </button>
        <div className="flex space-x-2 text-sm justify-end">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-1.5 py-1 rounded-full ${
                currentPage === i + 1
                  ? "bg-green-500 text-black px-3"
                  : "bg-transparent text-white/70 hover:text-green-500 transition duration-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages || data.length === 0}
          className="flex items-center text-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed group"
        >
          <span className="mr-1 text-white/70 text-sm group-hover:text-white transition duration-300">
            Next
          </span>
          <ChevronRightIcon className="mt-0.5 w-4 h-4 text-white/70 group-hover:text-white transition duration-300" />
        </button>
      </div>
    </main>
  );
};

export default Table;
