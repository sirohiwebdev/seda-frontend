import { fromJS } from 'immutable';

import { parseInputFormData } from 'signals/shared/filter/parse';
import {
  makeSelectFilterCategories,

} from 'models/categories/selectors';

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { FILTER_PAGE_SIZE } from './constants';

/**
 * Direct selector to the overviewPage state domain
 */
const selectIncidentManagementDomain = state => (state && state.get('incidentManagement')) || fromJS(initialState);

export const makeSelectAllFilters = createSelector(
  [selectIncidentManagementDomain, makeSelectFilterCategories, makeSelectFilterCategories],
  (stateMap, maincategory_slug, category_slug) => {
    const filters = stateMap.get('filters').toJS();

    return filters.map(filter => {
      const { priority } = filter.options;
      const converted = (Array.isArray(priority) ? priority : [priority]).filter(Boolean);
      const fltr = {
        ...filter,
        options: {
          ...filter.options,
          priority: converted,
        },
      };

      return parseInputFormData(fltr, {
        maincategory_slug,
        category_slug,
      });
    });
  }
);

export const makeSelectActiveFilter = createSelector(
  [selectIncidentManagementDomain, makeSelectFilterCategories, makeSelectFilterCategories],
  (stateMap, maincategory_slug, category_slug) => {
    if (!(maincategory_slug && category_slug)) {
      return {};
    }

    const state = stateMap.toJS();

    const { priority } = state.activeFilter.options;
    const converted = (Array.isArray(priority) ? priority : [priority]).filter(Boolean);
    const filter = {
      ...state.activeFilter,
      options: {
        ...state.activeFilter.options,
        priority: converted,
      },
    };

    return parseInputFormData(filter, {
      maincategory_slug,
      category_slug,
    });
  }
);

export const makeSelectEditFilter = createSelector(
  [selectIncidentManagementDomain, makeSelectFilterCategories, makeSelectFilterCategories],
  (stateMap, maincategory_slug, category_slug) => {
    if (!(maincategory_slug && category_slug)) {
      return {};
    }

    const state = stateMap.toJS();

    return parseInputFormData(
      state.editFilter,
      {
        maincategory_slug,
        category_slug,
      },
      (category, value) => {
        if (category.key || category.slug) return undefined;

        return category._links.self.public.endsWith(`/${value}`);
      }
    );
  }
);

export const makeSelectFilterParams = createSelector(selectIncidentManagementDomain, incidentManagementState => {
  const incidentManagement = incidentManagementState.toJS();
  const filter = incidentManagement.activeFilter;
  const { options } = filter;
  const { page } = incidentManagement;
  let { ordering } = incidentManagement;

  if (ordering === 'days_open') {
    ordering = '-created_at';
  }

  if (ordering === '-days_open') {
    ordering = 'created_at';
  }

  const pagingOptions = {
    page,
    ordering,
    page_size: FILTER_PAGE_SIZE,
  };


  // mapping category_slug as a category_filter_label because we are using filter label fo categories
  const { category_slug, ...rest } = options;
  const category_filter_label = category_slug;


  return { ...rest, category_filter_label,  ...pagingOptions };
});

export const makeSelectPage = createSelector(selectIncidentManagementDomain, state => {
  const obj = state.toJS();

  return obj.page;
});

export const makeSelectOrdering = createSelector(selectIncidentManagementDomain, state => {
  const obj = state.toJS();

  return obj.ordering;
});

export const makeSelectSearchQuery = createSelector(selectIncidentManagementDomain, state => {
  const obj = state.toJS();

  return obj.searchQuery;
});

export const makeSelectIncidents = createSelector(selectIncidentManagementDomain, state => {
  const { incidents, loading } = state.toJS();

  return { ...incidents, loading };
});

export const makeSelectIncidentsCount = createSelector(selectIncidentManagementDomain, state => {
  const {
    incidents: { count },
  } = state.toJS();

  return count;
});
