import React, {Fragment} from "react";
import './match.css';


const Match = ({logo_ta,logo_th,team_away,team_home,score,journee,date}) => {
    return (
        <Fragment>
            <div className="match-card">
            <div className="time-details"><p>{date}</p><p>{journee}</p></div>
            <div className="match-details">
            <div className="team-home"><img src={logo_th} className="logo" /> <p>{team_home}</p></div>
            <div className="score">{score}</div>
            <div className="team-away"><img src={logo_ta} className="logo" /> <p>{team_away}</p></div>
            </div>
            </div>
        </Fragment>
    )
}

export default Match