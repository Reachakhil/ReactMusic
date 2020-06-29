import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Song from './components/Song';
import Info from './components/Info';
import Spinner from './components/Spinner';
import axios from 'axios';

function App() {
  const [searchLyrics, setSearchLyrics] = useState({});
  const [lyrics, setLyrics] = useState('');
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (Object.keys(searchLyrics).length === 0) return;
    const getDataLyrics = async () => {
      const { artist, song } = searchLyrics;
      const URL = `https://api.lyrics.ovh/v1/${artist}/${song}`;
      const URL_INFO = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;
      setLoading(true);
      const [lyrics, info] = await Promise.all([
        axios.get(URL),
        axios.get(URL_INFO),
      ]);
      setLoading(false);
      setLyrics(lyrics.data.lyrics);
      console.log(lyrics.data);
      console.log(info.data.artists[0]);
      if (Array.isArray(info.data.artists) && info.data.artists.length) {
        setInfo(info.data.artists[0]);
      }
    };
    getDataLyrics();
  }, [searchLyrics]);
  return (
    <>
      <Form setSearchLyrics={setSearchLyrics} />
      <div className='container mt-5'>
        <div className='row'>
          {loading ? (
            <Spinner />
          ) : (
            <div className='col-md-6'>
              <Info info={info} />
            </div>
          )}
          {loading ? (
            <Spinner />
          ) : (
            <div className='col-md-6'>
              <Song lyrics={lyrics} searchLyrics={searchLyrics} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
