const intialSearch = {
    search: "",
  };
  
  const search = (state = intialSearch, { type, payload }) => {
    switch (type) {
      case "SET_Search":
        return { search: payload };
  
      default:
        return state;
    }
  };
  
  export default search;