let defaultState = {
  isLoading: false,
  entities: [],
  filteredEntities: [],
  data: null,
  search: "",
  tableSorting: {
    column: null,
    direction: null,
  },
};

const entitiesPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "entitiesPage-tableSorting":
      return {
        ...state,
        tableSorting: action.data,
      };
    case "entitiesPage-search":
      return {
        ...state,
        search: action.data,
      };
    case "entitiesPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "entitiesPage-entities":
      return {
        ...state,
        entities: action.data,
      };
    case "entitiesPage-filteredEntities":
      return {
        ...state,
        filteredEntities: action.data,
      };
    case "entitiesPage-data":
      return {
        ...state,
        data: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default entitiesPage_reducer;
