import React from 'react';
const Song = ({ lyrics, searchLyrics }) => {
  if (lyrics.length === 0) return null;
  const { song } = searchLyrics;
  return (
    <>
      <h2>{song} ♫</h2>
      <p className='letra'>{lyrics}</p>
    </>
  );
};

export default Song;
