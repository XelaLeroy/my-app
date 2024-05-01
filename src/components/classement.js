import React, { Fragment, useState } from "react";
import './classement.css';



const Classement = ({rang,club,logo,pts,V,N,D,PtsScored,PtsTaken,diff,bonus,streak}) => {

   
return (

    <Fragment>
                    <div className="table-row" id={club}>
                        <div className="table-cell fixed rang">{rang}</div>
                        <div className="table-cell fixed club"><img src={logo} width={"20px"}></img>{club}</div>
                        <div className="table-cell">{pts}</div>
                        <div className="table-cell">{V}</div>
                        <div className="table-cell"> {N}</div>
                        <div className="table-cell">{D}</div>
                        <div className="table-cell">{PtsScored}</div>
                        <div className="table-cell">{PtsTaken}</div>
                        <div className="table-cell">{diff}</div>
                        <div className="table-cell">{bonus}</div>  
                        <div className="table-cell">{streak}</div>
                    </div>
     
            
                


    </Fragment>
)

}


export default Classement;