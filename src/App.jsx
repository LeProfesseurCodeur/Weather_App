import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "./sass/app.scss";
import TopSection from "./components/top/index";
import BottomSection from "./components/bottom/index";
import axios from "axios";

//import Forcastday from './components/bottom/forcastday';

//Clé API APIXU
const WEATHER_KEY = "e62ca1662f184b4c88d103557191303";

class App extends Component {

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
    
                  this.state = {

      cityName: "Paris",
      numForcastDays: 5,
      isLoading: true,
    
    };
 
  }

  //Mise a jour de la météo 
  updateWeather() {

    const { cityName, numForcastDays } = this.state;

    const URL = `https://api.apixu.com/v1/forecast.json?key=${WEATHER_KEY} &q=${cityName} &days=${numForcastDays}`;

    axios.get(URL)
    .then((res) => {
      
      return res.data;
    
    })
    .then((data) => {
      
      this.setState({ 
        
        isLoading: false,
        temp_c: data.current.temp_c, 
        isDay: data.current.is_day, 
        text: data.current.condition.text, 
        iconURL: data.current.condition.icon,
        forecastdays: data.forecast.forecastday
      
      });
    
    })
    .catch((err) => {
      
      if(err)
      
      console.error("Cannot fetch Weather Data from API, ", err);
    
    });
  
  }

  componentDidMount() { // cette méthode est appelée une fois que tous les éléments de la page sont rendus correctement. 
                        // Une fois le balisage défini sur la page. 
                        // Cette méthode est appelée par React lui-même, soit pour récupérer les données depuis une API externe, 
                        // soit pour effectuer des opérations uniques qui nécessitent des éléments JSX.
    
    const { eventEmitter } = this.props;

    this.updateWeather();

    eventEmitter.on("updateWeather", (data) => {
      
      this.setState({ cityName: data }, () => this.updateWeather());
      this.updateWeather();
    
    });

  }

  render() {  // considérée comme une fonction normale mais en réalité elle doit toujours retourner quelque chose. 
              // Lorsque le fichier composant est appelé, il appelle par défaut la méthode render() parce que ce composant doit afficher 
              // le balisage HTML (qu'on peut qualifier de syntaxe JSX).

    const { 
      
      isLoading, 
      cityName, 
      temp_c, 
      isDay, 
      text, 
      iconURL, 
      forecastdays
    
    } = this.state;

    return (
      
      <div className="app-container">
      
        <div className="main-container">
      
          {isLoading && <h3>Loading Weather ...</h3>}
      
          {!isLoading &&

          <div className="top-section">
            
            <TopSection 
            
              location={cityName} 
              temp_c={temp_c} 
              isDay={isDay} 
              text={text} 
              iconURL={iconURL}
              eventEmitter={this.props.eventEmitter} 
            
            />
          
          </div>}
        

          <div className="bottom-section">
            
            <BottomSection forecastdays={forecastdays}/>
          
          </div>
        
        </div>
      
      </div>
    
    );
  
  }

}

export default App;
