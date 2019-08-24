// Layout variables
export const DRAWER_WIDTH = 240;
export const HEADER_HEIGHT = 64;
export const SHIFT_WHEN_DRAWER_OPEN = DRAWER_WIDTH + 5;
export const SHIFT_WHEN_DRAWER_CLOSE = DRAWER_WIDTH / 6;

// The options for alerts
export const ALERT_OPTIONS = {
  timeout: 5000,
  position: "bottom center"
};

export const DEMO_PERIODE = 30;

// Music player
export const REPEAT_STATES = Object.freeze({
  order: "order",
  orderLoop: "all loop",
  singleLoop: "single loop",
  shufflePlay: "shuffle"
});

export const REQUEST_METHODES = Object.freeze({
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
});

// base ulr for the backend
//(note that there is a slash on the end so no need to put any when concatenating )
export const BASE_URL = "http://localhost:8080/";

// temporary function to solve the problem of browser blocking FTP
export const getFromHttpInsteadOfFtp = urlString => {
  return (urlString = urlString.replace(
    "ftp://localhost",
    "http://localhost:2000/data"
  ));
};

export const COLORS = [
  "rgb(51, 204, 255)",
  "rgb(0, 38, 153)",
  "rgb(204, 255, 255)",
  "rgb(0, 204, 102)",
  "rgb(0, 255, 0)",
  "rgb(0, 153, 51)",
  "rgb(204, 255, 51)",
  "rgb(153, 102, 51)",
  "rgb(255, 255, 102)",
  "rgb(255, 153, 102)",
  "rgb(204, 51, 0)",
  "rgb(255, 153, 0)",
  "rgb(255, 102, 0)",
  "rgb(255, 204, 204)",
  "rgb(255, 102, 153)",
  "rgb(102, 0, 51)",
  "rgb(255, 0, 255)",
  "rgb(153, 153, 255)",
  "rgb(102, 102, 153)",
  "rgb(255, 255, 255)"
];
