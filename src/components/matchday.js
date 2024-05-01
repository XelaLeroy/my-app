import './matchday.css';
import React, { Component, Fragment, useState } from 'react';

const Matchday = ({logo_ta, logo_th, team_away, team_home, journee, date, last_logo_ta, last_logo_th, last_team_away, last_team_home, last_journee, last_date,last_score,heure,tv}) => {

    const [NextMatch,showNextMatch] = useState(true);
  
    const displaylast = () => {
       showNextMatch(prevState => !prevState);        
    };
            return (
            <Fragment>
                <div className="rounded-card">
                    <div className="header-card">
                        <span className="incoming" onClick={displaylast}>A venir</span>
                        <span className="last" onClick={displaylast}>Dernier match</span>
                    </div>
                    {NextMatch ? (
                    <div className="card1">
                        <div className="details">
                            <p>{date}</p>
                            <p>{journee}</p>
                        </div>
                        <div className="match">
                            <div className="team-home"><img src={logo_th} className="logo" /> <p>{team_home}</p></div>
                            <div className="score">0-0</div>
                            <div className="team-away"><img src={logo_ta} className="logo" /> <p>{team_away}</p></div>
                        </div>
                        <div className='more_details'>
                        <img src={tv} width={`20%`}/>
                        <p>{heure}</p>
                        <button>Je prend ma place</button>
                        </div>
                    </div>
                    ) : (
                    <div className="card2">
                        <div className="details">
                            <p>{last_date}</p>
                            <p>{last_journee}</p>
                        </div>
                        <div className="match">
                            <div className="team-home"><img src={last_logo_th} className="logo" /> <p>{last_team_home}</p></div>
                            <div className="score">{last_score}</div>
                            <div className="team-away"><img src={last_logo_ta} className="logo" /> <p>{last_team_away}</p></div>
                        </div>
                    </div> 
                    )}
                    </div>
                   
            </Fragment>
        );
    }




export default Matchday