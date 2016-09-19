import React from 'react'
import Map, {GoogleApiWrapper} from 'google-maps-react'
import {searchNearby} from 'utils/googleApiHelpers'
export class Container extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      places: [],
      pagination: null
    }
  }

  onReady(mapProps, map) {
    const {google} = this.props;
    const opts = {
      location: map.center,
      radius: '500',
      types: ['cafe']
    }
    searchNearby(google, map, opts)
      .then((results, pagination) => {
        // We got some results and a pagination object
         this.setState({
          places: results,
          pagination
        })
       }).catch((status, result) => {
          // There was an error
       })
  }
  render() {
    return (
      <div>
        Hello from the container
        <Map
        google={this.props.google}
        onReady={this.onReady.bind(this)}
        visible={false}>
           {
               this.state.places.map(place => {
                 return (<div key={place.id}>{place.name}</div>)
               })
           }
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(Container)
