import React from "react";

import SunImg from "../../resources/images/sun.png";

export default class Weather extends React.Component {
    
    constructor(props) { // le constructeur d'un composant React est appelé avant son montage. 
                        // lors de l'implémentation du constructeur pour une sous-classe React.Component,
                        // nous devons appeler super(props) avant tout autre instruction. 
                        // Sinon, this.props sera indéfini dans le constructeur, ce qui peut entraîner des bugs.
                        //
                        // Constructor est le seul endroit où nous devons renseinger this.state. 
                        // Dans les autres méthodes, nous devons utiliser this.setState() à la place. 

        super(props); // super fait référence au constructeur de la classe parente. pointe sur l’implémentation de React.Component.
                      // Props : Une prop est toujours passée par un composant parent à son composants enfants : c’est le seul moyen normal de transmission
                      // Une prop est considérée en lecture seule dans le composant qui la reçoit  
    
    }

    render() {

        const { location, temp_c, isDay, text, iconURL } = this.props;

        return (
            
            <div className="weather-container">
            
                <div className="header">{location}</div>
            
                <div className="inner-container">
            
                    <div className="image">
            
                        <img src={iconURL} />
            
                    </div>
            
                    <div className="current-weather">{ temp_c }°</div>
            
                </div>
            
                <div className="footer">{text}</div>
            
            </div>
        
        );
    
    }

}