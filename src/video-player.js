import React from 'react';

export default function VideoPlayer({ selectedEvent }) {
  if (!selectedEvent) return null;
  
  return (
    <div>
      <h2>{selectedEvent ? selectedEvent.name : ''}</h2>
      <div className="video-wrapper">
          <video src={selectedEvent ? selectedEvent.url : ''} autoPlay controls></video>
      </div>
    </div>
  );
}
