import React from 'react';
const Song = ({ lyrics }) => {
  if (lyrics.length === 0) return null;
  return (
    <>
      <h2>Song's lyrics</h2>
      <p className='letra'>{lyrics}</p>
    </>
  );
};

export default Song;
