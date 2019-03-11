// Local Configuration API_URL Osama
// export const API_URL =
//   window.location.protocol + "//localhost/mozdan/api/api/v1/";

// Local Configuration API_URL Esraa
//  export const API_URL =
// window.location.protocol + "//localhost/kijamiiwork/mozdanUpdated/api/api/v1/";

// Live Configuration API_URL
export const API_URL =
  window.location.protocol + "//api.mozdan.kijamii-dev.com/api/v1/";

///////////////////////////////////////////////////////////////////////////////////////////////////////

// Local Configuration BASE_URL Osama
// export const BASE_URL = window.location.protocol + "//localhost/mozdan/api/";

// Local Configuration BASE_URL Esraa
// export const BASE_URL =
//   window.location.protocol + "//localhost/kijamiiwork/mozdanUpdated/api/";

// Live Configuration API_URL
export const BASE_URL =
  window.location.protocol + "//admin.mozdan.kijamii-dev.com/";

//////////////////////////////////////////////////////////////////////////////////////////////////////
export const headers = {
  Authorization: "Bearer " + localStorage.getItem("jwtToken")
};
