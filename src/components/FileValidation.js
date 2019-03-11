export function isImage(file) {
  if (file) {
    let ValidImageTypes = ["image/gif", "image/jpeg", "image/png"];
    let found = ValidImageTypes.indexOf(file["type"]);
    return found === -1 ? false : true;
  }
  return false;
}

export function isDocument(file) {
  if (file) {
    let ValidImageTypes = [
      "text/plain",
      "application/msword",
      "application/pdf"
    ];
    let found = ValidImageTypes.indexOf(file["type"]);
    return found === -1 ? false : true;
  }
  return false;
}

export function isEmail(value) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value);
}
