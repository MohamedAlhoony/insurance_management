let defaultState = {
  isLoading: false,
  categories: [],
  filteredCategories: [],
  search: "",
  tableSorting: {
    column: null,
    direction: null,
  },
};

const categoriesPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "categoriesPage-tableSorting":
      return {
        ...state,
        tableSorting: action.data,
      };
    case "categoriesPage-search":
      return {
        ...state,
        search: action.data,
      };
    case "categoriesPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "categoriesPage-categories":
      return {
        ...state,
        categories: action.data,
      };
    case "categoriesPage-filteredCategories":
      return {
        ...state,
        filteredCategories: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default categoriesPage_reducer;
