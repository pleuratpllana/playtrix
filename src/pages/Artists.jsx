import Section from "../components/shared/Section";
import Filters from "../components/shared/Filters";
import Table from "../components/shared/Table";
import { useState, useEffect } from "react";
import { fetchArtistsList } from "../config/config";
import { pageDetails } from "../utils/utils";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilterId, setActiveFilterId] = useState(null);
  const [loading, setLoading] = useState(false);

  const { title, description, mainHeadings } = pageDetails.artists;

  const filterOptions = [
    { id: "alphabetical", label: "A-Z" },
    { id: "popularity", label: "Popularity" },
    { id: "albumCount", label: "Album Count" },
  ];

  useEffect(() => {
    const loadArtists = async () => {
      setLoading(true);
      const deezerArtists = await fetchArtistsList();
      setArtists(deezerArtists);
      setFilteredArtists(deezerArtists);
      setLoading(false);
    };
    loadArtists();
  }, []);

  const handleFilterSelect = (filterId) => {
    setActiveFilterId(filterId);
    let sortedArtists = [...artists];
    switch (filterId) {
      case "alphabetical":
        sortedArtists.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "popularity":
        sortedArtists.sort((a, b) => b.nb_fan - a.nb_fan);
        break;
      case "albumCount":
        sortedArtists.sort((a, b) => b.nb_album - a.nb_album);
        break;
      default:
        break;
    }
    setFilteredArtists(sortedArtists);
  };

  const handleSearchChange = async (term) => {
    setSearchTerm(term);
    setLoading(true);
    const results = await fetchArtistsList(term);
    setArtists(results);
    setFilteredArtists(results);
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
      ) : filteredArtists.length === 0 ? (
        <div className="text-white text-center mt-10">
          No data available for your search
        </div>
      ) : (
        <Table mainHeadings={mainHeadings} data={filteredArtists} />
      )}
    </Section>
  );
};

export default Artists;
