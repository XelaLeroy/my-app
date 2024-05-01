import './home.css';
import React, { Component } from 'react';
import Header from '../components/header';
import './classementPage.css'
import HeaderMobile from '../components/mobileHeader'
import Classement from '../components/classement';
import axios from 'axios';

class ClassementPage extends Component {
    state = {
        classement: []
    }

componentDidMount() {
    axios.get('http://127.0.0.1:5000/top14_classement')
    .then(response => {
        const classement = response.data
        this.setState({classement})
    })
}

render () {
    const { classement } = this.state
    return (
        <div>
        <HeaderMobile/>
        <Header />
    <div className='main'>
           
        <h1> Classement </h1>
        <div className='table'>
                <div className='row'>
                <div className='cell fixed2'>Rang</div>
                <div className='cell fixed2'>Club</div>
                <div className='cell'>Pts</div>
                <div className='cell'>V</div>
                <div className='cell'>N</div>
                <div className='cell'>D</div>
                <div className='cell'>Pts M.</div>
                <div className='cell'>Pts E.</div>
                <div className='cell'>Diff</div>
                <div className='cell'>Bonus</div>
                <div className='cell'>État de forme</div>
                </div>

        {classement.map((team,index) => (
         <Classement key={index}
          rang ={team.team_infos.rank}
          logo = {team.team_infos.logo}
          club ={team.team_infos.name}
          pts ={team.team_stats.Pts}
          V ={team.team_stats.victoires}
          N ={team.team_stats.nuls}
          D ={team.team_stats.defaites}
          PtsScored ={team.team_stats.PtsMarques}
          PtsTaken ={team.team_stats.PtsEncaisses}
          diff ={team.team_stats.Difference}
          bonus ={team.team_stats.bonus}
          streak ={team.team_stats.forme}
            />

        ))} 
        </div>
        </div>
        </div>
    )
}
}


export default ClassementPage