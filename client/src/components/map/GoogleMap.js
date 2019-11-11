import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import Cacher from "services/cacher";

const MapComponent = ({ coordinates, error }) => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={coordinates}
    center={coordinates}
    options={{ disableDefaultUI: true }}
  >
    {!error && <Marker position={coordinates} />}
    {error && (
      <InfoWindow position={coordinates}>
        <div>Sorry! Some error occurred :(</div>
      </InfoWindow>
    )}
  </GoogleMap>
);

const withGeoCode = WrappedComponent => {
  return class extends React.Component {
    constructor() {
      super();

      this.cacher = new Cacher();
      this.state = {
        coordinates: {
          lat: 0,
          lng: 0
        },
        error: false
      };
    }

    componentDidMount() {
      this.getGeoCodeLocation();
    }

    getGeoCodeLocation() {
      const { location } = this.props;
      if (this.cacher.isValueCached(location)) {
        const coordinates = this.cacher.getCachedValue(location);
        this.setState({ coordinates });
      } else {
        this.geocodeLocation(location).then(
          coordinates => this.setState({ coordinates }),
          error => this.setState({ error: true })
        );
      }
    }

    geocodeLocation(location) {
      const geocoder = new window.google.maps.Geocoder();

      return new Promise((resolve, reject) => {
        geocoder.geocode({ address: location }, (res, status) => {
          if (status === "OK") {
            const geometry = res[0].geometry.location;
            const coordinates = { lat: geometry.lat(), lng: geometry.lng() };
            this.cacher.cacheValue(location, coordinates);
            resolve(coordinates);
          }
          reject("Error!");
        });
      });
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
};

export const MapWithGeoCode = withScriptjs(
  withGoogleMap(withGeoCode(MapComponent))
);
