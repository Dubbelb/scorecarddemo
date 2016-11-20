var ScoreCardBox = React.createClass({
    loadDataFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    },
    componentDidMount: function () {
        this.loadDataFromServer();
        window.setInterval(this.loadDataFromServer, this.props.pollInterval);
    },
    getInitialState: function () {
        return { data: [] };
    },
    render: function () {
        return (
          <div className="scoreCardBox">
            <RoundBox rounds={this.state.data.Rounds} />
            <PlayerList data={this.state.data.Rounds} />
          </div>
      );
    }
});
var RoundBox = React.createClass({
    render: function () {
        debugger
        if (this.props.rounds) {
            var courseData = this.props.rounds[0].Course;

            var holeTdNodes = courseData.Holes.map(function (hole) {
                return (
                    <TdNode value={hole.HoleNumber} key={hole.HoleNumber} />
                    )
            });
            var parTdNodes = courseData.Holes.map(function (hole) {
                return (
                    <TdNode value={hole.Par} key={hole.HoleNumber} />
                    )
            });
            return (
                <div className="courseInfo-container">
                    <div className="courseInfo-name"><strong>{courseData.ClubName} - {courseData.CourseName}</strong></div>
                    <div className="courseInfoRows-container">
                        <table className="courseInfo-table table-responsive table-striped">
                            <tbody>
                                <tr>
                                    <td>Hål</td>{holeTdNodes}
                                </tr>
                                <tr>
                                    <td>Par</td>{parTdNodes}
                                </tr>
                                <tr>
                                    <td>Index</td>
                                </tr>
                                <tr>
                                    <td>Tee</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
        else {
            return null;
        }
    }
});
var TdNode = React.createClass({
    render: function () {
        return (
            <td>{this.props.value}</td>
            );
    }
});
var PlayerList = React.createClass({
    _renderPlayers: function () {
        var playerNodes = [];
        if (this.props.data) {
            playerNodes = this.props.data.map(function (playerData) {
                return playerData.TeeTimes.map(function (data) {
                    return data.Teams.map(function (data2) {
                        return (
                            <PlayerBox data={data2} key={data2.TeamExternalId} />
                        );
                    })
                });
            });
        }
        return playerNodes;
    },
    _renderHoleHeaders: function () {
        var holeHeaders = [];
        if (this.props.data) {
            holeHeaders = this.props.data[0].Course.Holes.map(function (hole) {
                return (
                    <HoleResultHeader hole={hole.HoleNumber} key={hole.HoleNumber} />
                    );
            });
        }
        return holeHeaders;
    },
    render: function () {
        return (
          <div className="playerList">
              <div className="playerListHeader">
                  <div className="playerBox-playerInfo header"><strong>Players</strong></div>
                <div className="playData-header">{this._renderHoleHeaders()}</div>
              </div>
              
              {this._renderPlayers()}
          </div>
      );
    }
});
var HoleResultHeader = React.createClass({
    render: function () {
        return (
            <div className="hole-name"><strong>{this.props.hole}</strong></div>
            );
    }
});
var PlayerBox = React.createClass({
    _renderResultNodes: function () {
        var data = this.props.data;
        var resultNodes = data.TeamHoleResults.map(function (result) {
            return (
                <TeamHoleResultBox data={result} key={result.CourseHoleExternalId} />
                );
        });
        return resultNodes;
    },
    render: function () {
        var data = this.props.data;
        
        return (
            <div className="playerBox">
                <div className="playerBox-playerInfo">
                    <div className="playerBox-playerInfo-upperRow">
                        <div className="playerBox-name">
                            <strong>{data.TeamName}</strong>
                        </div>
                    </div>
                    <div className="playerBox-playerInfo-lowerRow">
                        <span className="playerBox-playerInfo-homeClub">
                            {data.TeamExternalId}
                        </span>
                        &nbsp;
                        <strong>
                            HCP: {data.PlayingHCP}
                        </strong>
                    </div>
                </div>

                <div className="playerBox-playData">
                    {this._renderResultNodes()}
                </div>
            </div>
        );
    }
});
var TeamHoleResultBox = React.createClass({
    render: function () {
        return (
            <div className="teamHoleResultContainer">
                <div className="teamHoleNumber">{this.props.data.Strokes}</div>
                <div>{this.props.data.Score}</div>
            </div>
            );
    }
});

ReactDOM.render(
  <ScoreCardBox url="/data" pollInterval={20000} />,
  document.getElementById('content')
);