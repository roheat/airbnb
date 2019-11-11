import React, { Component } from "react";
import { MapWithGeoCode } from "components/map/GoogleMap";

class RentalMap extends Component {
  render() {
    const { location } = this.props;

    return (
      <MapWithGeoCode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBsLG8bSHRDJASRC8N-pB9rLylD8Z_4A-8&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `360px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
      />
    );
  }
}

export default RentalMap;
