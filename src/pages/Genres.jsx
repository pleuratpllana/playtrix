import React, { useEffect, useState } from "react";
import Section from "../components/shared/Section";
import Table from "../components/shared/Table";
import { fetchGenres } from "../config/config";
import { pageDetails } from "../utils/utils";

export const Genres = () => {
  const [genres, setGenres] = useState([]);
  const { title, description, mainHeadings } = pageDetails.genres;

  useEffect(() => {
    const loadGenres = async () => {
      const genreData = await fetchGenres();
      setGenres(genreData);
    };
    loadGenres();
  }, []);

  return (
    <Section title={title} description={description}>
      {genres.length === 0 ? (
        <div className="text-white text-center mt-10">Loading...</div>
      ) : (
        <Table mainHeadings={mainHeadings} data={genres} />
      )}
    </Section>
  );
};

export default Genres;
