import React from "react";
import "./style.scss";
import Weather from "./weather";
import { Manager, Reference, Popper } from 'react-popper';

export default class TopSection extends React.Component {

    constructor(props) { // le constructeur d'un composant React est appelé avant son montage. 
                        // lors de l'implémentation du constructeur pour une sous-classe React.Component,
                        // nous devons appeler super(props) avant tout autre instruction. 
                        // Sinon, this.props sera indéfini dans le constructeur, ce qui peut entraîner des bugs.
                        //
                        // Constructor est le seul endroit où nous devons renseinger this.state. 
                        // Dans les autres méthodes, nous devons utiliser this.setState() à la place. 

        super(props);
        this.state = { // super fait référence au constructeur de la classe parente. pointe sur l’implémentation de React.Component.
                        // Props : Une prop est toujours passée par un composant parent à son composants enfants : c’est le seul moyen normal de transmission
                        // Une prop est considérée en lecture seule dans le composant qui la reçoit  

            isSelectLocationOpen: false,

        };

    }

    onToggleSelectLocation() {

        this.setState((prevState) => ({ isSelectLocationOpen: !prevState.isSelectLocationOpen }));

    }

    onLocationNameChange(e) {

        this.setState({ 

            locationName: e.target.value 

        });

    }

    onSelectCity() {

        const { locationName } = this.state;
        const { eventEmitter } = this.props;
        eventEmitter.emit("updateWeather", locationName);
        this.setState({ isSelectLocationOpen: false});

    }

    render() {

        const { isSelectLocationOpen } = this.state;
        const { eventEmitter } = this.props;

        return (

                <div className="top-container">
                    
                    <div className="title">Weather Up</div>
                    
                    <Weather {...this.props} />
                
                    <Manager>

                        <Reference>
                            
                            {({ ref }) => (
                            
                                <button className="btn btn-select-location" 
                                        ref={ref} 
                                        onClick={this.onToggleSelectLocation.bind(this)}
                                >
                                    Select Location
                                </button>
                            )}

                        </Reference>
                    
                        <Popper placement="top">
                        
                            {({ ref, style, placement, arrowProps }) =>  
                        
                            isSelectLocationOpen && (
                            
                                <div 
                            
                                    className="popup-container"
                                    ref={ref} 
                                    style={style}
                                    data-placement={placement}
                                
                                >
                                
                                <div className="form-container">
                                
                                    <label htmlFor="location-name">Location Name</label>
                                
                                    <input 
                                
                                        id="location-name" 
                                        type="text" 
                                        placeholder="City Name" 
                                        onChange={this.onLocationNameChange.bind(this)}
                                    
                                    />
                                    
                                    <button className="btn btn-select-location" onClick={this.onSelectCity.bind(this)}>Select</button>
                                
                                </div>
                                
                                <div 
                                
                                    ref={arrowProps.ref} 
                                    style={arrowProps.style} 
                                
                                />
                                </div>
                            
                            )}
                        
                        </Popper>
                    
                    </Manager>

                </div>
        
        );
    }
}