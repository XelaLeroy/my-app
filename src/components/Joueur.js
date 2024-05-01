import React, {Fragment} from "react";
import './joueur.css';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';



const Joueur = ({nom, prenom, image, position}) => {
    const navigate=useNavigate();


    const goToPlayerPage=() => {
        const slug = nom.toLowerCase().replace(/\s+/g, '');
        navigate(`/effectif/${slug}`)
    }

    return (
        <Fragment>
            <div className={`player-card ${position}`} onClick={() => goToPlayerPage()}>
            <img src= {image} alt={nom}{...prenom} className="img-player" />
            <p className="player_name">{prenom}{nom}</p>
            </div>
        </Fragment>
    )
}

export default Joueur