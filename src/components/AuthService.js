import decode from "jwt-decode";

export function isLoggedIn() {
  const token = localStorage.getItem("jwtToken");
  return token && !isTokenExpired(token);
}

export function logout() {
  localStorage.removeItem("jwtToken");
  window.location.href = "/";
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

export function getPermissions() {
  if (!isLoggedIn()) {
    return null;
  }

  const token = localStorage.getItem("jwtToken");
  const decodedToken = decode(token);
  let permissions = {};
  if (decodedToken.data.Permissions) {
    permissions = decodedToken.data.Permissions;
    // permissions = JSON.parse(decodedToken.data.Permissions);
  }

  return permissions;
}

export function isSuperAdmin() {
  if (!isLoggedIn()) {
    return null;
  }

  const token = localStorage.getItem("jwtToken");
  const decodedToken = decode(token);
  return decodedToken.data.IsSuperAdmin;
}

export function checkAuthorization(permissionGroup, permission) {
  let permissions = getPermissions();
  if (isSuperAdmin()) {
    return true;
  } else {
    if (!permissions[permissionGroup]) {
      return false;
    } else if (!Number(permissions[permissionGroup][permission]) == 1) {
      return false;
    }
    return true;
  }
}
