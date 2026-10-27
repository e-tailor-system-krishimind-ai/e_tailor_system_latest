const sharedAuthRoot = new URL("../../", document.currentScript.src);
function getLoggedInUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = new URL("features/authentication/pages/flip-auth.html", sharedAuthRoot).href;
    return null;
  }
  return user;
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = new URL("features/landing/pages/newlanding_pg.html", sharedAuthRoot).href;
}
