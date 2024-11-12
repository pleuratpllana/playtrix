import Section from "../components/shared/Section";
import Table from "../components/shared/Table";
import { useEffect, useState } from "react";
import { fetchPlaylists } from "../config/config";
import { pageDetails } from "../utils/utils";

export const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const { title, description, mainHeadings } = pageDetails.playlists;

  useEffect(() => {
    const loadPlaylists = async () => {
      const deezerPlaylists = await fetchPlaylists();
      setPlaylists(deezerPlaylists);
    };
    loadPlaylists();
  }, []);

  return (
    <Section title={title} description={description}>
      {playlists.length === 0 ? (
        <div className="text-white text-center mt-10">Loading...</div>
      ) : (
        <Table mainHeadings={mainHeadings} data={playlists} />
      )}
    </Section>
  );
};

export default Playlists;
