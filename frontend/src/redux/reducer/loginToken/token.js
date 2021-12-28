const intialToken = {
    token: localStorage.getItem('token'),
  };
  
  const token = (state = intialToken, { type, payload }) => {
    switch (type) {
      case "SET_TOKEN":
        return { token: payload };
  
      default:
        return state;
    }
  };
  
  export default token;