import Section from "../components/shared/Section";
import Filters from "../components/shared/Filters";
import Table from "../components/shared/Table";
import { useState, useEffect } from "react";
import { fetchAlbumsList } from "../config/config";
import { pageDetails } from "../utils/utils";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilterId, setActiveFilterId] = useState(null);
  const [loading, setLoading] = useState(false);

  const { title, description, mainHeadings } = pageDetails.albums;

  const filterOptions = [
    { id: "alphabetical", label: "A-Z" },
    { id: "releaseDate", label: "Release Date" },
    { id: "trackCount", label: "Track Count" },
  ];

  useEffect(() => {
    const loadAlbums = async () => {
      setLoading(true);
      const deezerAlbums = await fetchAlbumsList();
      setAlbums(deezerAlbums);
      setFilteredAlbums(deezerAlbums);
      setLoading(false);
    };
    loadAlbums();
  }, []);

  const handleFilterSelect = (filterId) => {
    setActiveFilterId(filterId);
    let sortedAlbums = [...albums];
    switch (filterId) {
      case "alphabetical":
        sortedAlbums.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "releaseDate":
        sortedAlbums.sort(
          (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
        );
        break;
      case "trackCount":
        sortedAlbums.sort((a, b) => b.trackCount - a.trackCount);
        break;
      default:
        break;
    }
    setFilteredAlbums(sortedAlbums);
  };

  const handleSearchChange = async (term) => {
    setSearchTerm(term);
    setLoading(true);
    const results = await fetchAlbumsList(term);
    setAlbums(results);
    setFilteredAlbums(results);
    setLoading(false);
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
      ) : filteredAlbums.length === 0 ? (
        <div className="text-white text-center mt-10">
          No data available for your search
        </div>
      ) : (
        <Table mainHeadings={mainHeadings} data={filteredAlbums} />
      )}
    </Section>
  );
};

export default Albums;
