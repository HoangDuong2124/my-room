export const fetchJSON = async (
  input: string | URL | globalThis.Request,
  init?: RequestInit
) => {
  return fetch(input, init).then(async (res) => {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((text) => {
      console.error(text);
      throw new Error(text);
    });
  });
};
