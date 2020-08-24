import React, { useEffect, useRef, useState } from 'react';
import { loadModules, setDefaultOptions } from 'esri-loader';
import CONFIGURATION from '../../shared/services/configuration/configuration';
import { getStadsdeel } from '../MapInput/services/reverseGeocoderService';

setDefaultOptions({ css: true });
const options = {
  // url: 'https://js.arcgis.com/4.6/',
  css: true,
};

export const WebMapView = props => {
  const mapRef = useRef();
  const [location, setLocation] = useState(null);
  const { points } = props;

  useEffect(() => {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/widgets/Search',
        'esri/Graphic',
        'esri/layers/GraphicsLayer',
        'esri/symbols/TextSymbol',
        'esri/widgets/Locate',
      ],
      options
    ).then(([ArcGISMap, MapView, Search, Graphic, GraphicsLayer, Locate]) => {
      const map = new ArcGISMap({
        basemap: 'topo-vector',
      });

      // load the map view at the ref's DOM node
      const view = new MapView({
        container: mapRef.current,
        map: map,
        center: CONFIGURATION.map.options.center,
        zoom: CONFIGURATION.map.options.zoom,
      });

      // const textSymbol2D = new TextSymbol({
      //   color: '#7A003C',
      //   text: '\ue61d', // esri-icon-map-pin
      //   font: {
      //     // autocast as new Font()
      //     size: 24,
      //     family: 'CalciteWebCoreIcons',
      //   },
      // });

      // const textSymbol3D = new TextSymbol({
      //   color: '#7A003C',
      //   text: '\ue61d', // esri-icon-map-pin
      //   font: {
      //     // autocast as new Font()
      //     size: 24,
      //     family: 'CalciteWebCoreIcons',
      //   },
      // });

      const locateWidget = new Locate({
        view: view, // Attaches the Locate button to the view
        // graphic: new Graphic({
        //   symbol: { type: 'simple-marker' }, // overwrites the default symbol used for the
        //   // graphic placed at the location of the user when found
        // }),
      });

      console.log(locateWidget);

      const search = new Search({
        view: view,
      });
      view.ui.add(search, 'top-left');
      view.ui.move('zoom', 'bottom-right');
      // view.ui.add('compass', 'top-left');
      view.ui.add(locateWidget, 'bottom-right');

      var graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

      const getAddressFromLocation = async point => {
        let { longitude, latitude } = point;

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

        return await {
          ...res.address,
          stadsdeel,
        };
      };

      search.on('select-result', function (res) {
        console.log(res);
        let geometry = res.result.feature.geometry;

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
        console.log('AAA');
        search.clear();
        view.popup.clear();
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

      function showPopup(address, pt) {
        const content = Object.keys(address)
          .filter(key => !!address[key])
          .map(key => `<strong>${key}</strong>: ${address[key]}`)
          .reduce((x, y) => x.concat('<br/>').concat(y), '');

        console.log(content);
        view.popup.open({
          title: address.Address,
          // title: +Math.round(pt.longitude * 100000) / 100000 + ',' + Math.round(pt.latitude * 100000) / 100000,
          content,
          location: pt,
        });
      }

      function addPointToMap(points) {
        points.forEach(({ type, longitude, latitude }) => {
          let point = {
            type,
            longitude,
            latitude,
          };

          var simpleMarkerSymbol = {
            type: 'picture-marker',
            url: 'map-marker.svg',
            width: '30px',
            height: '32px',
          };

          var pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
          });

          graphicsLayer.add(pointGraphic);
        });
      }

      points && addPointToMap(points);

      return () => {
        if (view) {
          // destroy the map view
          view.container = null;
        }
      };
      //End Map Block
    });
  }, [points]);

  useEffect(() => {
    console.log(location);
    location && props.onChange(location);
  }, [location]);

  return (
    <div>
      <div className="webmap" ref={mapRef} />
    </div>
  );
};
