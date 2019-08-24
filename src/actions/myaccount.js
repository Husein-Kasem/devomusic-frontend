import { returnErrors, createMessage } from "./messages";
import { BASE_URL, REQUEST_METHODES } from "../constants";
import { getFetchHeaderConfig, getHeaderConfigFile } from "../utils";
export const changePassword = (id, current, password) => (
  dispatch,
  getState
) => {
  const requestUrl = `${BASE_URL}auth/changepasswordbyid?id=${id}&current=${current}&password=${password}`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.PUT))
    .then(response => {
      console.log(response);
      dispatch(createMessage("Password rest succesfully"));
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to reset your password",
          err.status
        )
      );
    });
};

export const changeUsername = (id, newUsername) => (dispatch, getState) => {
  const requestUrl = `${BASE_URL}user/changeusernamebyid?id=${id}&desired=${newUsername}`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.PUT))
    .then(response => {
      console.log(response);
      dispatch(createMessage("Username changed succesfully"));
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to change your username",
          err.status
        )
      );
    });
};

export const changeImage = (id, preview) => (dispatch, getState) => {
  //var uintArray = Base64Binary.decode(base64_string);
  //let byteArray = Base64Binary.decodeArrayBuffer(preview);
  let imageFile = dataURLtoFile(preview, "image.png");
  const data = new FormData();
  data.append("image", imageFile);

  const requestUrl = `${BASE_URL}user/changeimage?userId=${id}`;

  console.log(imageFile);
  //<a href={imageFile} download />;

  fetch(requestUrl, getHeaderConfigFile(data))
    .then(response => {
      console.log(response);
      dispatch(createMessage("Profile image changed succesfully"));
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to change your username",
          err.status
        )
      );
    });
};

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
