import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import axios from 'axios';

function App() {
  const [searchLyrics, setSearchLyrics] = useState({});
  const [lyrics, setLyrics] = useState('');
  useEffect(() => {
    if (Object.keys(searchLyrics).length === 0) return;
    const getDataLyrics = async () => {
      const { artist, song } = searchLyrics;
      const URL = `https://api.lyrics.ovh/v1/${artist}/${song}`;
      const response = await axios.get(URL);
      setSearchLyrics(response.data.lyrics);
    };
    getDataLyrics();
  }, [searchLyrics]);
  return (
    <>
      <Form setSearchLyrics={setSearchLyrics} />
    </>
  );
}

export default App;
