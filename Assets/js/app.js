const toggler = document.getElementById("menuToggler");
const navMenu = document.getElementById("navMenu");
const enteredLink = document.querySelector(".result__insertedLink");
const outPutLink = document.querySelector(".result__outPutLink p");
toggler.addEventListener("click", () => {
  navMenu.classList.toggle("toggle");
  toggler.classList.toggle("rotate");
});
const form = document.querySelector("form");
const myURL = document.getElementById("shortenLinks__input");

const shortenLinks = [];
let shortenLink = {
  id: Math.random(),
  link: "",
  shortenedLink: "",
};
const shortenAPILink = `https://rel.ink/api/links/`;

const fetchLINK = async (link) => {
  const response = await fetch(shortenAPILink, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({ url: link }),
  });
  try {
    const jsonData = await response.json(link);
    shortenLink.link = jsonData.url;
    shortenLink.shortenedLink = `${shortenAPILink}${jsonData.hashid}`;
    shortenLinks.push(shortenLink);
    const getLink = async () => {
      const result = await fetch(shortenLink.shortenedLink);
      try {
        const resultJson = await result.json();
        enteredLink.textContent = shortenLink.link;
        outPutLink.textContent = shortenLink.shortenedLink;
        shortenLink.shortenedLink = document.location.href = shortenLink.link;
        console.log(resultJson);
        console.log(shortenLink.shortenedLink);
      } catch (error) {
        console.log(error);
      }
    };

    getLink();
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener("submit", (e) => {
  fetchLINK(myURL.value);
  e.preventDefault();
  myURL.value = "";
});
