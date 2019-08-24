import { COLORS } from "./constants";

// Setup config without token - helper function
export const getHeaderConfig = () => {
  // Get token from local storage
  const token = localStorage.getItem("token");

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

export const getHeaderConfigPost = () => {
  // Get token from local storage
  const token = localStorage.getItem("token");

  // Headers
  const config = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {}
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

export const getFetchHeaderConfig = REQUEST_METHODE => {
  // Get token from local storage
  const token = localStorage.getItem("token");

  // Headers
  const config = {
    method: REQUEST_METHODE, // *GET, POST, PUT, DELETE, etc.
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {}
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

export const getHeaderConfigPut = () => {
  // Get token from local storage
  const token = localStorage.getItem("token");

  // Headers
  const config = {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {}
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

export const getHeaderConfigFile = data => {
  const token = localStorage.getItem("token");

  // Headers
  const config = {
    method: "PUT",
    body: data,
    headers: {}
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

export const getHeaderConfigGet = () => {
  // Get token from local storage
  const token = localStorage.getItem("token");

  // Headers
  const config = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {}
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

export var formatName = name => {
  if (typeof name == "string") {
    var splitName = name.split(" ");

    var formattedName = "";

    for (var i = 0; i < splitName.length; i++) {
      if (i !== 0) formattedName += " ";

      formattedName +=
        splitName[i].substring(0, 1).toUpperCase() +
        splitName[i].substring(1, splitName[i].length).toLowerCase();
    }

    return formattedName;
  } else {
    return "failed, not a string";
  }
};

export const formatPhrase = phrase => {
  if (typeof phrase == "string") {
    return (
      phrase.substring(0, 1).toUpperCase() +
      phrase.substring(1, phrase.length).toLowerCase()
    );
  } else {
    return "failed, not a string";
  }
};

export const postData = (url = ``) => {
  // Default options are marked with *
  return fetch(url, getHeaderConfigPost()).then(response => {
    console.log(response);
  }); // parses JSON response into native Javascript objets
};

export const getData = (url = ``) => {
  // Default options are marked with *
  console.log(getHeaderConfigGet());
  console.log(url);
  return fetch(url, getHeaderConfigGet()).then(response => {
    console.log(response);
  }); // parses JSON response into native Javascript objets
};

export const formateDate = (dateToFormate, divider) => {
  try {
    let dd = dateToFormate.getDate();
    let mm = dateToFormate.getMonth() + 1;
    const yyyy = dateToFormate.getFullYear();

    return `${dd < 10 ? `0${dd}` : dd}${divider}${
      mm < 10 ? `0${mm}` : mm
    }${divider}${yyyy}`;
  } catch (ex) {
    console.log("failed to formate the date because of the following error");
    console.log(ex);
  }
};

export var getRandomColor = arr => {
  if (typeof arr != "object") return null;

  if (arr.length < COLORS.length) {
    let done = false;
    let timer = 0;
    let timeout = 15000;
    do {
      console.log(COLORS);
      let number = Math.floor(Math.random() * COLORS.length);
      console.log(number);
      let color = COLORS[number];
      console.log(color);
      console.log(arr);
      if (!arr.includes(color)) {
        done = true;
        return color;
      }
      timer++;
      if (timer > timeout) {
        alert(timeout);
        break;
      }
    } while (!done);
  } else {
    return (
      "rgb(" +
      Math.floor(Math.random() * 200) +
      ", " +
      Math.floor(Math.random() * 200) +
      ", " +
      Math.floor(Math.random() * 200) +
      ")"
    );
  }
};
