import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { loadModules, setDefaultOptions } from 'esri-loader';
import CONFIGURATION from '../../shared/services/configuration/configuration';
import { getStadsdeel } from '../MapInput/services/reverseGeocoderService';

setDefaultOptions({ css: true });
const options = {
  css: true,
};

export const WebMapView = ({ data, onChange, isShowPopup }) => {
  const mapRef = useRef();
  const [location, setLocation] = useState(null);

  // console.log(data);

  useEffect(() => {
    // lazy load the required ArcGIS API for JavaScript modules and CSS

    const points = data
      ? data.features.map(p => ({
        type: p.geometry.type.toLowerCase(),
        longitude: p.geometry.coordinates[0],
        latitude: p.geometry.coordinates[1],
        id: p.properties.id,
        created_at: p.properties.created_at,
      }))
      : [];

    loadModules(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/widgets/Search',
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
        'esri/symbols/TextSymbol',
      ],
      options
    ).then(([ArcGISMap, MapView, Search, Graphic, GraphicsLayer]) => {
      const map = new ArcGISMap({
        basemap: 'topo-vector',
      });

      // load the map view at the ref's DOM node
      const view = new MapView({
        container: mapRef.current,
        map,
        center: CONFIGURATION.map.options.center,
        zoom: CONFIGURATION.map.options.zoom,
      });

      const search = new Search({
        view,
      });
      view.ui.add(search, 'top-left');
      view.ui.move('zoom', 'bottom-right');

      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

      const getAddressFromLocation = async point => {
        const { longitude, latitude } = point;

        let res = await fetch(`${CONFIGURATION.GEOCODE_SERVICE_ENDPOINT}&location=${longitude},${latitude}`);

        res = await res.json();
        if (res.err) {
          view.popup.open({
            title: 'Invalid Location',
            content: 'Location not found.',
            location: point,
          });
        }

        const stadsdeel =
          CONFIGURATION?.map?.options?.stadsdeel || (await getStadsdeel({ lat: latitude, lng: longitude }));

        return{
          ...res.address,
          stadsdeel,
        };
      };

      search.on('select-result', function (res) {
        // console.log(res);
        const geometry = res.result.feature.geometry;
        addPointToMap(geometry);

        getAddressFromLocation(geometry).then(address => {
          if (address) {
            setLocation({
              geometrie: {
                type: 'Point',
                coordinates: [geometry.longitude, geometry.latitude],
              },
              stadsdeel: address.stadsdeel,
              address: {
                openbare_ruimte: address.Match_addr,
                huisnummer: address.AddNum,
                postcode: address.Postal.replace(' ', ''),
                woonplaats: address.City,
              },
            });
            showPopup(address, geometry);
          }
        });
      });

      view.on('click', function (evt) {
        search.clear();
        view.popup.clear();
        graphicsLayer.removeAll();
        addPointToMap(evt.mapPoint);

        getAddressFromLocation(evt.mapPoint).then(address => {
          if (address) {
            setLocation({
              geometrie: {
                type: 'Point',
                coordinates: [evt.mapPoint.longitude, evt.mapPoint.latitude],
              },
              stadsdeel: address.stadsdeel,
              address: {
                openbare_ruimte: address.Match_addr,
                huisnummer: address.AddNum,
                postcode: address.Postal.replace(' ', ''),
                woonplaats: address.City,
              },
            });
            showPopup(address, evt.mapPoint);
          }
        });
      });


      /**
       *
       * @param address
       * @param pt
       */

      function showPopup(address, pt) {
        const content = Object.keys(address)
          .filter(key => !!address[key])
          .filter(key => key === 'Address' || key === 'City' || key === "Postal" || key === 'Region' || key==="CountryCode")
          .map(key => `${address[key]}`)
          .join(', ');



        if(isShowPopup) {
          view.popup.open({
            title: address.Address,
            content,
            location: pt,
          });
        }
      }

      function addPointToMap(mapPoint) {
        const simpleMarkerSymbol = {
          type: 'picture-marker',
          url: '/assets/map-marker.svg',
          width: '30px',
          height: '32px',
        };

        if(Array.isArray(mapPoint)){
          mapPoint.forEach(({ type, longitude, latitude }) => {
            const point = {
              type,
              longitude,
              latitude,
            };

            const pointGraphic = new Graphic({
              geometry: point,
              symbol: simpleMarkerSymbol,
            });

            graphicsLayer.add(pointGraphic);
          });
        }else{
          // Add single Point
          const { type, longitude, latitude } = mapPoint ;
          const pointGraphic = new Graphic({
            geometry: {
              type,
              latitude,
              longitude,
            },
            symbol: simpleMarkerSymbol,
          });

          graphicsLayer.add(pointGraphic);
        }
      }

      // eslint-disable-next-line no-unused-expressions
      points && addPointToMap(points);

      return () => {
        if (view) {
          view.container = null;
        }
      };
    });
  }, [data, isShowPopup]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    location &&  onChange(location);
  }, [location, onChange]);

  return (
    <div>
      <div className="web-map" ref={mapRef} />
    </div>
  );
};

WebMapView.propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  isShowPopup: PropTypes.bool,

};
