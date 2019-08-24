import { OPEN_DRAWER, CLOSE_DRAWER } from "./types";

// CREATE MESSAGE
export const openDrawer = () => {
  return {
    type: OPEN_DRAWER
  };
};

// RETURN ERRORS
export const closeDrawer = () => {
  return {
    type: CLOSE_DRAWER
  };
};
