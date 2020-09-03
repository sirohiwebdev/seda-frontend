import {
  DEFAULT_SUBMIT_BUTTON_LABEL,
  RESET,
  SAVE_SUBMIT_BUTTON_LABEL,
  SET_ADDRESS,
  SET_CATEGORIES,
  SET_DATE,
  SET_GROUP_OPTIONS,
  SET_MAIN_CATEGORY,
  SET_NAME,
  SET_NOTE_KEYWORD,
  SET_REFRESH,
  SET_SAVE_BUTTON_LABEL,
} from './constants';

export const initialState = {
  submitBtnLabel: DEFAULT_SUBMIT_BUTTON_LABEL,
  filter: {
    name: '',
    refresh: false,
    id: undefined,
  },
  options: {
    address_text: '',
    category_slug: [],
    feedback: '',
    maincategory_slug: [],
    note_keyword: '',
    priority: [],
    source: [],
    stadsdeel: [],
    status: [],
  },
};

/**
 * State init function
 *
 * Merges incoming filter data with the initial state value
 *
 * @param   {Object} filter
 * @param   {Object} filter.options
 * @returns {Object}
 */
export const init = ({ options, ...filter }) => ({
  ...initialState,
  filter: {
    ...initialState.filter,
    ...filter,
  },
  options: {
    ...initialState.options,
    ...options,
  },
});

export default (state, action) => {
  switch (action.type) {
    case RESET:
      return initialState;

    case SET_ADDRESS:
      return {
        ...state,
        options: {
          ...state.options,
          address_text: action.payload,
        },
      };

    case SET_NOTE_KEYWORD:
      return {
        ...state,
        options: {
          ...state.options,
          note_keyword: action.payload,
        },
      };

    case SET_NAME:
      return {
        ...state,
        filter: {
          ...state.filter,
          name: action.payload,
        },
      };

    case SET_REFRESH:
      return {
        ...state,
        filter: {
          ...state.filter,
          refresh: action.payload,
        },
      };

    case SET_DATE:
    case SET_GROUP_OPTIONS:
      return {
        ...state,
        options: {
          ...state.options,
          ...action.payload,
        },
      };

    case SET_SAVE_BUTTON_LABEL:
      return {
        ...state,
        submitBtnLabel: action.payload
          ? SAVE_SUBMIT_BUTTON_LABEL
          : DEFAULT_SUBMIT_BUTTON_LABEL,
      };

    case SET_MAIN_CATEGORY:
      return {
        ...state,
        options: {
          ...state.options,
          category_slug: [],
          maincategory_slug: action.payload.isToggled ? action.payload.category: [],
        },
      };

    case SET_CATEGORIES:
      return {
        ...state,
        options: {
          ...state.options,
          category_slug: action.payload.subCategories,
          maincategory_slug: [],
        },
      };

    default:
      return state;
  }
};
