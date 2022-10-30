let defaultState = {
  isLoading: false,
  cars: [],
  filteredCars: [],
  data: null,
  search: "",
  tableSorting: {
    column: null,
    direction: null,
  },
};

const carsPage_reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "carsPage-tableSorting":
      return {
        ...state,
        tableSorting: action.data,
      };
    case "carsPage-search":
      return {
        ...state,
        search: action.data,
      };
    case "carsPage-isLoading":
      return {
        ...state,
        isLoading: action.data,
      };
    case "carsPage-cars":
      return {
        ...state,
        cars: action.data,
      };
    case "carsPage-filteredCars":
      return {
        ...state,
        filteredCars: action.data,
      };
    case "carsPage-data":
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

export default carsPage_reducer;
