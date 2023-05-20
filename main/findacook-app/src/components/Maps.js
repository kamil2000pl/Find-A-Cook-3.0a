import React, { Component } from 'react';
import { GoogleApiWrapper, Map, InfoWindow, Marker } from 'google-maps-react';

var markers = []


// function populateMarkers(schedulelist) {
//   var latlng = [];
//     // const schedulelist = this.props.schedule
//     console.log(schedulelist.title)
//     schedulelist.forEach(schedule => {
//       // latlng.push(schedule.lat)
//       // latlng.push(schedule.lng)

//       markers.push( {title: schedule.title, position: {lat: schedule.lat , lng: schedule.lng}})

//       // new google.maps.LatLng(schedule.lat,schedule.lng);
      
//       console.log(markers)
//     });
// }

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.schedule = this.props.schedule;
  }
  
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false
  };

  onMarkerClick = (props, marker) =>
  this.setState({
    activeMarker: marker,
    selectedPlace: props,
    showingInfoWindow: true
  });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };
  schedulelist = this.props.schedule

  // componentDidMount() {
  //   var latlng = [];
  //   const schedulelist = this.props.schedule
  //   console.log(schedulelist.title)
  //   schedulelist.forEach(schedule => {
  //     // latlng.push(schedule.lat)
  //     // latlng.push(schedule.lng)

  //     markers.push( {title: schedule.title, position: {lat: schedule.lat , lng: schedule.lng}})

  //     // new google.maps.LatLng(schedule.lat,schedule.lng);
      
  //     console.log(markers)
  //   });
  // }

  render() {
    const data = this.props.data;
    var i = 0;
    var latlng = [];
    const schedulelist = this.props.schedule
    // console.log(schedulelist.title)
    schedulelist.forEach(schedule => {
      // latlng.push(schedule.lat)
      // latlng.push(schedule.lng)

      markers.push( {title: schedule.title, start: schedule.start, position: {lat: schedule.lat , lng: schedule.lng}})

      // new google.maps.LatLng(schedule.lat,schedule.lng);
      
      console.log(markers)
    }); 
  return (
    
    <div class="mapdiv">
      <br></br>
      {/* <p>data: {this.props.data}</p>
      <p>schedule: {this.props.schedule[1].title}</p> */}
      <br></br>
    <Map
    onClick={this.onMapClicked}
      // google={props.google}
      google={this.props.google}
      style={{width: "50%", height:"50%"}}
      zoom={14}
      initialCenter={{
        lat: this.props.data[0],
        lng: this.props.data[1]
      }}
    >
      <Marker  onClick={this.onMarkerClick} position={{ lat: this.props.data[0], lng: this.props.data[1] }} name={'You'} />

      {markers.map(({ title, start, position }) => (
        <Marker
          position={position}
          onClick={this.onMarkerClick}
          name={title}
          starttime={start}
          icon={{ url: `https://maps.google.com/mapfiles/ms/icons/arrow.png`}}
        >
          
           
        </Marker>
      ))}

      <InfoWindow onClose={this.onInfoWindowClose}
      marker={this.state.activeMarker}
      visible={this.state.showingInfoWindow}>
            <div>
              <h3>{this.state.selectedPlace.name}</h3>
              <h4>{this.state.selectedPlace.starttime}</h4>
            </div>
        </InfoWindow>
    </Map>
    </div>
  );
};
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
})(MapContainer);
