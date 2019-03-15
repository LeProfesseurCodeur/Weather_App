import React from "react";

export default class Forcastday extends React.Component {

    constructor(props) { // le constructeur d'un composant React est appelé avant son montage. 
                        // lors de l'implémentation du constructeur pour une sous-classe React.Component,
                        // nous devons appeler super(props) avant tout autre instruction. 
                        // Sinon, this.props sera indéfini dans le constructeur, ce qui peut entraîner des bugs.
                        //
                        // Constructor est le seul endroit où nous devons renseinger this.state. 
                        // Dans les autres méthodes, nous devons utiliser this.setState() à la place. 

        super(props);   // super fait référence au constructeur de la classe parente. pointe sur l’implémentation de React.Component.
                        // Props : Une prop est toujours passée par un composant parent à son composants enfants : c’est le seul moyen normal de transmission
                        // Une prop est considérée en lecture seule dans le composant qui la reçoit  

    }

    render() {

        const { day } = this.props; // CONST :  permet de déclarer une variable à assignation unique bindée.
                                    // déclarer une variable qui ne contiendra qu'une valeur et qui sera scopée au niveau du bloc.

                                    // LET : permet de faire pareil que const mais sans la contrainte d'assignation unique. 
                                    // Vous devriez donc instinctivement voir que les cas d'utilisation pour let sont les mêmes que ceux de var.

        if(!day) return null;

        return (
        
        <div className="forcastday-container">
        
            <div className="image">
        
                <img src={day.condition.icon} />
        
            </div>
        
            <div className="text">{day.avgtemp_c}</div>
            <div className="muted-text">{day.condition.text}</div>
        
        </div>

        );

    }

}