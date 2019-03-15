/*
    Aide mémo apprentissage : 

        - Si components est définie en tant que class, alors cela founient davantage plus de fonctionnalité.

        - La seule méthode que nous devons définir dans une sous-classe React.Component est Render()
*/



import React from "react";
import "./style.scss";
import Forcastday from "./forcastday";

export default class BottomSection extends React.Component {

    constructor(props) {

        super(props);
        this.state = {};

    }

    render() {

        const { forecastdays } = this.props;    // CONST :  permet de déclarer une variable à assignation unique bindée.
                                                // déclarer une variable qui ne contiendra qu'une valeur 
                                                // et qui sera scopée au niveau du bloc.

        return (

            <div className="bottom-container">

                <div className="inner-container">

                {forecastdays && 

                    forecastdays.map((day, idx) => {

                    return <Forcastday day={day.day} key={idx} />;

                })}

                </div>

            </div>

        );

    }

}