import './home.css';
import React, { Component } from 'react';
import Header from '../components/header';
import Matchday from '../components/matchday';
import HeaderMobile from '../components/mobileHeader';
import Article from '../components/articles';
import axios from 'axios';

class Card extends Component {
    state = {
        match: []
    }

componentDidMount() {
    axios.get('http://127.0.0.1:5000/top14_score')
    .then(res => {
        const match = res.data
        this.setState({match})

    })
}

trouverProchainMatch = () => {
    const { match } = this.state;

    // Filtrer les matchs dont le score est null
    return match.filter(matchs => matchs.score.text === null);
}

trouverDernierMatch = () => {
    const { match } = this.state;

    // Filtrer les matchs dont le score est null
    const derniermatch =
    match.filter(matchs => matchs.score.text !== null);

    return derniermatch[(derniermatch.length-1)];
}



    render() {
        const prochainsMatches = this.trouverProchainMatch();
        const lastmatch = this.trouverDernierMatch();
        const matchday = prochainsMatches[0];

        return (
                <>
                <HeaderMobile/>
                 <Header />
                <div className='matchday-card'>
                    {matchday ? (
                    <Matchday
                        date={matchday.time.date}
                        journee={matchday.time.journée}
                        logo_th={matchday.team_home.logo}
                        team_home={matchday.team_home.name}
                        logo_ta={matchday.team_away.logo}
                        team_away={matchday.team_away.name}
                        last_date={lastmatch.time.date}
                        last_journee={lastmatch.time.journée}
                        last_logo_th={lastmatch.team_home.logo}
                        last_team_home={lastmatch.team_home.name}
                        last_logo_ta={lastmatch.team_away.logo}
                        last_team_away={lastmatch.team_away.name}
                        last_score={lastmatch.score.text}
                        tv={matchday.tv.logo}
                        heure={matchday.time.heure}
                    />  
                      
                    ) :(
                        <p>Pas de match</p>
                    )   }  
                     <Article />     
        </div>
        </>
                );
    
    }
}

export default Card;