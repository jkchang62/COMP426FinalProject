import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React from 'react';
import GoogleMapReact from 'google-maps-react';
import logo from './harvard-art.jpg'

export class AboutPage extends React.Component {
render() {

  return (
      <>

      <p style={{ color: 'black' }}>The Harvard Art Museums are part of Harvard University and comprise three museums: 
      the Fogg Museum (established in 1895), the Busch-Reisinger Museum (established in 1903), and the Arthur M. Sackler 
      Museum (established in 1985) and four research centers: the Archaeological Exploration of Sardis (founded in 1958), 
      the Center for the Technical Study of Modern Art (founded in 2002), the Harvard Art Museums Archives, and the Straus 
      Center for Conservation and Technical Studies (founded in 1928). The three museums that constitute the Harvard Art 
      Museums were initially integrated into a single institution under the name Harvard University Art Museums in 1983. 
      The word "University" was dropped from the institutional name in 2008.

The collections include approximately 250,000 objects in all media, ranging in date from antiquity to the present and originating 
in Europe, North America, North Africa, the Middle East, South Asia, East Asia, and Southeast Asia.
</p>
      <img height = '500px' width ='500px' src={logo}/>
      <p style={{ color: 'black' }}>
      We want to thank the Harvard Art Museums for making their API 
      available to use. We believe this project will enable the younger, 
      tech-driven generation to become more interested in art than ever before.
      </p>
      <h1 style={{ color: 'black' }}>We encourage all of our users to visit Harvard Museums' 3 magnificent museums, located
      in Cambridge, Massachusetts:
      </h1>
    <GoogleMapReact google={this.props.google} zoom={14}
    style={{height: '500px', width: '500px'}}
    initialCenter={{ lat: 42.3741, lng: -71.1144}}>
      <Marker onClick={this.onMarkerClick}
            name={'Current location'}
            position={{ lat: 42.3741, lng: -71.1144}} />
      <InfoWindow onClose={this.onInfoWindowClose}>
      </InfoWindow>
  </GoogleMapReact>

  </>
  
 );
 }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBrxYw7wGiEGuOBNY_3O0coLAX01KPhn6A'
})(AboutPage)