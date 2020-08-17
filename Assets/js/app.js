const toggler = document.getElementById("menuToggler");
const navMenu = document.getElementById("navMenu");
toggler.addEventListener("click", () => {
  navMenu.classList.toggle("toggle");
  toggler.classList.toggle("rotate");
});

let shortenLinks= [];
let originalURL = "";

let myURL = `https://www.facebook.com/Arigatouz?ref=bookmarks/`;
const shortenAPILink = `https://rel.ink/api/links/`;
const fetchLINK = async (method, link) => {
  const response = await fetch(shortenAPILink, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({ url: link }),
  });
  const jsonData = await response.json(link);
  console.log(jsonData.url);
  console.log(jsonData.hashid);
  console.log(shortenAPILink + jsonData.hashid);
  return {
    url: `${shortenAPILink}${jsonData.hashid}`,
    originalURL: jsonData.url,
  };
};

fetchLINK("POST", myURL)



