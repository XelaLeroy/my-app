import './calendar.css';
import React, { Component } from 'react';
import Header from '../components/header';
import Match from '../components/match';
import HeaderMobile from '../components/mobileHeader'
import axios from 'axios';


class Calendar extends Component {
  state = {
    calendar: []
  }


  componentDidMount() {
    axios.get(`http://127.0.0.1:5000/top14_score`)
      .then(res => {
        const calendar = res.data;
        this.setState({ calendar });
      })
  }

  render () {  
    const { calendar }=this.state
    return (
      <div className="calendar">
        <HeaderMobile/>
         <Header />
        <h1>Calendrier</h1>
        <div className='calendar_matchs'>
        {calendar.map((match, index) => (
          <Match key={index}
            date= {match.time.date} 
            journee= {match.time.journée} 
            logo_th= {match.team_home.logo} 
            team_home= {match.team_home.name}
            logo_ta= {match.team_away.logo} 
            team_away= {match.team_away.name}
            score= {match.score.text}
            />      
        ))}
  </div>
      </div>
    )
    }


}


export default Calendar;
