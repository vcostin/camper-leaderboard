import React, { Component } from 'react';
const RECENT_URL = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
const ALLTIMES_URL = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
class LeaderBoardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campers: [],
      recent: true,
      alltimes: false,
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
        console.log(json);
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
      <div className="LeaderBoardContainer">
        <h1>Campers Leaderboard</h1>
        <div className="leaderboard">
          <div className="container">
            <div className="row">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Camper Name</th>
                    <th className="text-center"><a onClick={this.fetchRecentCampers}>Points in past 30 days</a></th>
                    <th className="text-center"><a onClick={this.fetchAlltimeCampers}>All time point</a></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.campers.map((camper) => {
                      count += 1;
                      return (
                        <tr key={camper.username}>
                          <td>{count}</td>
                          <td>
                            <div className="table-cell-container">
                              <div className="avatar">
                                <img src={camper.img} alt={camper.username} className="img-thumbnail" />
                              </div>
                              <div className="user-name">{camper.username}</div>
                            </div>
                          </td>
                          <td>
                            <div className="table-cell-container centrate">
                              <div className="inner-cell">{camper.recent}</div>
                            </div>
                          </td>
                          <td>
                            <div className="table-cell-container centrate">
                              <div className="inner-cell">{camper.alltime}</div>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LeaderBoardContainer;
