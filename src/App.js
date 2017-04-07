import React, { Component } from 'react';
import { get } from 'axios';

import 'purecss/build/base.css';
import 'purecss/build/grids.css';
import 'purecss/build/grids-responsive.css';
import 'purecss/build/buttons.css';
import 'purecss/build/menus.css';

import './App.css';

import EventsList from './events-list';
import VideoPlayer from './video-player';

const DATASOURCE_URL = `https://protected-reef-31216.herokuapp.com/p?u=http://ildom.es/supertvapp/dock/api.php?latest=25&ts=${Date.now()}`;

class App extends Component {

  constructor() {
    super();

    this.state = {
      events: null,
      selectedEvent: null
    };

    this.onEventSelected = this.onEventSelected.bind(this);
  }

  componentDidMount() {
    get(DATASOURCE_URL)
      .then(response => {
        const events = response.data.DailyMotion
          .filter(channel => channel.cid === '35')
          .map(channel => {
            return {
              id: channel.id,
              name: channel.video_title,
              description: channel.video_description,
              url: channel.video_url
            };
          });

        this.setState({ events });
      })
      .catch(err => {
        console.error('Could not load evens info:', err);
      });
  }

  onEventSelected(selectedEvent, e) {
    e.preventDefault();
    console.log('Seleted event:', event);
    this.setState({ selectedEvent })
  }

  createEventsList(events, onEventSelected) {
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

  render() {
    const { events, selectedEvent } = this.state;
    return (
      <div className="App">
        <div className="pure-g">
          <div className="sidebar pure-u-1 pure-u-md-1-4">
            <EventsList events={events} onEventSelected={this.onEventSelected} />
          </div>
          <div className="content pure-u-1 pure-u-md-3-4">
            <VideoPlayer selectedEvent={selectedEvent} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
