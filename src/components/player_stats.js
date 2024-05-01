import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./player_stats.css";
import "bootstrap/dist/css/bootstrap.css";

const PlayerStat = () => {
  const [player, setPlayer] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/top14_player_stats/${slug}`)
      .then((res) => {
        setPlayer(res.data);
      });
  }, [slug]);

  return (
    <Fragment>
        <div className="d-flex  flex-column align-items-center">
      <div className="text-center">
        <h2>{player.name}</h2> 
        </div>    
      <div className="d-flex">
        <div>
          <img className="player-img" src={player.photo} />
        </div>
        <div>
          <p>Age : {player.age}</p>
          <p>Taille : {player.height}</p>
          <p>Poids : {player.weight}</p>       
        </div>
      </div>
      </div>
      <div className="container align-items-center">
    <div>
        <div>
            <table className="table table-bordered table-hover">
                <tbody>
                    <tr>
                        <td className="text-right">Minutes jouées</td>
                        <td>{player.minutes}</td>
                    </tr>
                    <tr>
                        <td className="text-right">Points marqués</td>
                        <td>{player.points}</td>
                    </tr>
                    <tr>
                        <td className="text-right">Essais</td>
                        <td>{player.essais}</td>
                    </tr>
                    <tr className="col">
                        <td className="text-right">Plaquages</td>
                        <td>{player.plaquages}</td>
                    </tr>
                    <tr>
                        <td className="text-right">Grattages</td>
                        <td>{player.grattages}</td>
                    </tr>
                    <tr>
                        <td className="text-right">Offload</td>
                        <td>{player.offload}</td>
                    </tr>
                    <tr>
                        <td className="text-right">Franchissements</td>
                        <td>{player.franchissements}</td>
                    </tr>
                    <tr>
                        <td className="text-right">Cartons rouges</td>
                        <td>{player.redCard}</td>
                    </tr>
                    <tr>
                        <td className="text-right">Cartons jaunes</td>
                        <td>{player.yellowCard}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

    </Fragment>
  );
};

export default PlayerStat;
