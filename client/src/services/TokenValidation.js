export const getTOKEN = () => {
  if (localStorage.getItem("persist:root")) {
    const TOKEN = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root")).user
    ).accessToken;

    return TOKEN;
  }
};
