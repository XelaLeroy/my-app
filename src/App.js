import './App.css';
import React, { Component } from 'react';
import Joueur from './components/Joueur';
import Header from './components/header';
import HeaderMobile from '../src/components/mobileHeader'
import axios from 'axios';

// const equipe = {
//   joueur1: {
//       nom : 'Emilien',
//       prenom: 'Gailleton',
//       age : 22
//   },
//   joueur2: {
//       nom : 'Jack',
//       prenom: 'Maddocks',
//       age : 29
//   },
//   joueur3: {
//       nom : 'Theo',
//       prenom: 'Attisogbe',
//       age : 20,

//   },
//   joueur4: {
//       nom : 'Sacha',
//       prenom: 'Zegueur',
//       age : 26

//   },
//   joueur5: {
//       nom : 'Reece',
//       prenom: 'Hewat',
//       age : 31
//   }
// }

class App extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    equipe: [],
    positionsAffichees: [],
  }

 


  componentDidMount() {
    axios.get(`http://127.0.0.1:5000/top14_stats`)
      .then(res => {
        const equipe = res.data;
        this.setState({ equipe });
      })
  }


  handleClick(position) {
    this.setState(() => ({
      positionsAffichees: [position],
      active:position
    }),
    );
  }


  render () {
    const { titre }=this.props
    const { equipe }=this.state
    return (
      <body>
      <div className="App">
        <HeaderMobile/>
        <Header />
        <h1>Joueurs</h1>
        <div className='buttons_position'>
        <button className={this.state.active === '1ère ligne' ? 'active' : ''} onClick={() => this.handleClick('1ère ligne')}>1ère ligne</button>
        <button className={this.state.active === '2ème ligne' ? 'active' : ''} onClick={() => this.handleClick('2ème ligne')}>2ème ligne</button>
        <button className={this.state.active === '3ème ligne' ? 'active' : ''} onClick={() => this.handleClick('3ème ligne')}>3ème ligne</button>
        <button className={this.state.active === 'Centre' ? 'active' : ''}  onClick={() => this.handleClick('Centre')}>Centre</button>
        <button className={this.state.active === 'Ailier' ? 'active' : ''} onClick={() => this.handleClick('Ailier')}>Ailier</button>
        <button className={this.state.active === 'Arrière' ? 'active' : ''} onClick={() => this.handleClick('Arrière')}>Arrière</button>
        </div>

        <div className='equipe'>
        <h2> Première ligne</h2>
          <div className='premiereligne'>
        {
    equipe
    .filter(joueur => joueur.position === "1ère ligne")
      .map((joueur, index) => (
        <Joueur
          key={index}
          nom={joueur.name} 
          prenom={joueur.prenom}
          image={joueur.image}
          position={joueur.position}
          handleClick={this.handleClick}
        />      
      ))
  }
  </div>
        <h2> Seconde ligne</h2>
          <div className='premiereligne secondeligne'>
        {
    equipe
    .filter(joueur => joueur.position === "2ème ligne")
      .map((joueur, index) => (
        <Joueur
          key={index}
          nom={joueur.name} 
          prenom={joueur.prenom}
          image={joueur.image}
          position={joueur.position}
          handleClick={this.handleClick}
        />      
      ))
  }
  </div>
  </div>
        <h2> Seconde ligne</h2>
          <div className='premiereligne'>
        {
    equipe
    .filter(joueur => joueur.position === "3ème ligne")
      .map((joueur, index) => (
        <Joueur
          key={index}
          nom={joueur.name} 
          prenom={joueur.prenom}
          image={joueur.image}
          position={joueur.position}
          handleClick={this.handleClick}
        />      
      ))
  }
  </div>
        <h2> Demi de mélée</h2>
          <div className='premiereligne'>
        {
    equipe
    .filter(joueur => joueur.position === "Demi de mêlée")
      .map((joueur, index) => (
        <Joueur
          key={index}
          nom={joueur.name} 
          prenom={joueur.prenom}
          image={joueur.image}
          position={joueur.position}
          handleClick={this.handleClick}
        />      
      ))
  }
  </div>
  <h2> Demi d'ouverture</h2>
          <div className='premiereligne'>
        {
    equipe
    .filter(joueur => joueur.position === "Demi d'ouverture")
      .map((joueur, index) => (
        <Joueur
          key={index}
          nom={joueur.name} 
          prenom={joueur.prenom}
          image={joueur.image}
          position={joueur.position}
          handleClick={this.handleClick}
        />      
      ))
  }
  </div>
  <h2> Centre</h2>
          <div className='premiereligne'>
        {
    equipe
    .filter(joueur => joueur.position === "Centre")
      .map((joueur, index) => (
        <Joueur
          key={index}
          nom={joueur.name} 
          prenom={joueur.prenom}
          image={joueur.image}
          position={joueur.position}
          handleClick={this.handleClick}
        />      
      ))
  }
  </div>
  <h2> Ailier</h2>
          <div className='premiereligne'>
        {
    equipe
    .filter(joueur => joueur.position === "Ailier")
      .map((joueur, index) => (
        <Joueur
          key={index}
          nom={joueur.name} 
          prenom={joueur.prenom}
          image={joueur.image}
          position={joueur.position}
          handleClick={this.handleClick}
        />      
      ))
  }
  </div>
  <h2> Arrière</h2>
          <div className='premiereligne'>
        {
    equipe
    .filter(joueur => joueur.position === "Arrière")
      .map((joueur, index) => (
        <Joueur
          key={index}
          nom={joueur.name} 
          prenom={joueur.prenom}
          image={joueur.image}
          position={joueur.position}
          handleClick={this.handleClick}
        />      
      ))
  }
  </div>
      </div>
      </body>
    )
    }

}


export default App
