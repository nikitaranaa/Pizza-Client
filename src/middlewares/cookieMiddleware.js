import Cookies from "js-cookie";

// Function to save the Redux state to a cookie
export const saveStateToCookie = (state) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 3); // Set expiration date to 3 days from now
    Cookies.set("reduxState", JSON.stringify(state), { expires: expirationDate });
  };

// Function to load the Redux state from a cookie
export const loadStateFromCookie = () => {
  const cookieState = Cookies.get("reduxState");
  return cookieState ? JSON.parse(cookieState) : undefined;
};

// Custom middleware to save the state to a cookie on every Redux action
export const createCookieMiddleware = (saveState) => (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  saveState(state);
  return result;
};
