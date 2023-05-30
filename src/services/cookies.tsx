export function saveCookie(cred: any) {
  const date = new Date();
  const expirationDate = new Date(date.getTime() + 60 * 60 * 1000); // 1 hour
  document.cookie = `firebaseToken=${cred}; expires=${expirationDate.toUTCString()}; path=/`;
}

export function getCookie() {
  const name = "firebaseToken";
  const cookie = document.cookie
    .split(";")
    .find((c: string) => c.trim().startsWith(`${name}=`));
  return String (cookie);
}

export function deleteCookie() {
    document.cookie = "firebaseToken=; path=/;"
}
