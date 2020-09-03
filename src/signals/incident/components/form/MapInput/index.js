import React from 'react';
import PropTypes from 'prop-types';

import MAP_OPTIONS from 'shared/services/configuration/map-options';
import { formatMapLocation } from 'shared/services/map-location';
import { WebMapView } from 'components/ArcGISMap/MapView';
import Header from '../Header';

const MapInput = ({ handler, touched, hasError, meta, parent, getError, validatorsOrOpts }) => {
  const value = formatMapLocation(handler().value || {});
  const { lat, lng } = value?.location || {};
  // eslint-disable-next-line no-unused-vars
  const mapOptions = {
    ...MAP_OPTIONS,
    center: lat && lng ? [lat, lng] : [...MAP_OPTIONS.center],
  };

  // Can't use useCallback here, would break the rules of hooks
  const onLocationChange = location => {
    parent.meta.updateIncident({ location });
  };

  return (
    meta?.isVisible && (
      <Header
        className="mapInput"
        meta={meta}
        options={validatorsOrOpts}
        touched={touched}
        hasError={hasError}
        getError={getError}
      >
        <div className="invoer">
          <WebMapView onChange={onLocationChange} isShowPopup />
          {/* <MapContext>
          <MapInputComponent onChange={onLocationChange} value={value} mapOptions={mapOptions} hasGPSControl />
        </MapContext> */}
        </div>
      </Header>
    )
  );
};

MapInput.propTypes = {
  handler: PropTypes.func,
  touched: PropTypes.bool,
  getError: PropTypes.func.isRequired,
  hasError: PropTypes.func.isRequired,
  meta: PropTypes.object,
  parent: PropTypes.object,
  validatorsOrOpts: PropTypes.object,
};

export default MapInput;
