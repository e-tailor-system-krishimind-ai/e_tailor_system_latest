function getLoggedInUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "../pages/flip-auth.html";
    return null;
  }
  return user;
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "../pages/newlanding_pg.html";
}

