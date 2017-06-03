import React, { Component } from 'react';
import CamperRow from './CamperRow';
import FetchCampers from './FetchCampers';

const RECENT_URL = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
const ALLTIMES_URL = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';

class LeaderBoardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campers: [],
      recent: true,
      alltime: false,
    };

    this.fetchRecentCampers = this.fetchRecentCampers.bind(this);
    this.fetchAlltimeCampers = this.fetchAlltimeCampers.bind(this);
  }

  componentDidMount() {
    this.fetchCampersData(RECENT_URL);
  }

  fetchCampersData(url) {
    fetch(url, { cache: 'force-cache' })
      .then(response => response.json())
      .then((json) => {
        this.setState({
          campers: [...json],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchRecentCampers(e) {
    e.preventDefault();
    if (this.state.recent) { return; }
    this.fetchCampersData(RECENT_URL);
    this.setState({
      recent: true,
      alltime: false,
    });
  }

  fetchAlltimeCampers(e) {
    e.preventDefault();
    if (this.state.alltime) { return; }
    this.fetchCampersData(ALLTIMES_URL);
    this.setState({
      recent: false,
      alltime: true,
    });
  }

  render() {
    let count = 0;
    return (
      <div className="fcc-leaderboard">
        <nav className="navbar navbar-light bg-faded header">
          <a
            className="navbar-brand"
            href="https://www.freecodecamp.com"
            target="_blank"
            rel="noopener noreferrer"
          >Campers Leaderboard</a>
        </nav>
        <div className="LeaderBoardContainer">
          <div className="leaderboard">
            <div className="container">
              <div className="row">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Camper Name</th>
                      <th className="text-center">
                        <FetchCampers
                          getData={this.fetchRecentCampers}
                          isActive={this.state.recent}
                          text="Points in past 30 days"
                        />
                      </th>
                      <th className="text-center">
                        <FetchCampers
                          getData={this.fetchAlltimeCampers}
                          isActive={this.state.alltime}
                          text="All time point"
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.campers.map((camper) => {
                        count += 1;
                        return (
                          <CamperRow
                            key={camper.username}
                            count={count}
                            camperImg={camper.img}
                            camperUsername={camper.username}
                            camperRecent={camper.recent}
                            camperAlltime={camper.alltime}
                          />
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar fixed-bottom navbar-light bg-faded">
          <div className="text-center">by <a
            href="https://www.freecodecamp.com/vcostin"
            target="_blank"
            rel="noopener noreferrer"
          >vcostin</a></div>
        </nav>
      </div>
    );
  }
}

export default LeaderBoardContainer;
