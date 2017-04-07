import React from 'react';

export default function EventsList({ events, onEventSelected }) {
  if (!events) {
      return (<div className="loading">Buscando eventos...</div>);
  }

  const listItems = events.map(event => {
    return (
      <li key={event.id} className="nav-item">
          <a
            className="pure-button event"
            onClick={onEventSelected.bind(null, event)}
              href="#">
              {event.name}
            </a>
      </li>
    );
  });

  return (
    <nav className="nav">
      <ul className="nav-list">{listItems}</ul>
    </nav>
  );
}
