import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Song from './components/Song';
import axios from 'axios';

function App() {
  const [searchLyrics, setSearchLyrics] = useState({});
  const [lyrics, setLyrics] = useState('');
  const [info, setInfo] = useState({});
  useEffect(() => {
    if (Object.keys(searchLyrics).length === 0) return;
    const getDataLyrics = async () => {
      const { artist, song } = searchLyrics;
      const URL = `https://api.lyrics.ovh/v1/${artist}/${song}`;
      const URL_INFO = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;

      const [lyrics, info] = await Promise.all([
        axios.get(URL),
        axios.get(URL_INFO),
      ]);

      setLyrics(lyrics.data.lyrics);
      setInfo(info.data.artist[0]);
    };
    getDataLyrics();
  }, [searchLyrics]);
  return (
    <>
      <Form setSearchLyrics={setSearchLyrics} />
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6'> </div>
          <div className='col-md-6'>
            <Song lyrics={lyrics} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
