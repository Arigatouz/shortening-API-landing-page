const toggler = document.getElementById("menuToggler");
const navMenu = document.getElementById("navMenu");
const enteredLink = document.querySelector(".result__insertedLink");
const outPutLink = document.querySelector(".result__outPutLink p");
const resultBox = document.querySelector(".result");
const copyURL = document.getElementById("copy");

// menu toggler
toggler.addEventListener("click", () => {
  navMenu.classList.toggle("toggle");
  toggler.classList.toggle("rotate");
});

const form = document.querySelector("form");
const myURL = document.getElementById("shortenLinks__input");
const errorFormHandling = document.querySelector(".shortenLinks__error");
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
    const getLink = async () => {
      const result = await fetch(`${shortenAPILink}${jsonData.hashid}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      });
      try {
        const resultJson = await result.json();
        console.log(resultJson);
        enteredLink.textContent = resultJson.url.substr(0, 50) + "...";
        let endLink = "https://rel.ink/" + resultJson.hashid;
        outPutLink.textContent = endLink;
        if (resultJson) {
          resultBox.style.display = "block";
        }
      } catch (error) {
        console.log(error);
        errorFormHandling.style.display = "block";
        setTimeout((_) => {
          errorFormHandling.style.display = "none";
        }, 4000);
      }
    };
    getLink();
  } catch (error) {
    console.log(error);
    errorFormHandling.style.display = "block";
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await fetchLINK(myURL.value);
  myURL.value = "";
});

//copy function

function copyURLToClipBoard() {
  /* Get the text field */
  let copyText = document.querySelector("#myCopiedURL");
  console.log(copyText);
  /* Select the text field */
  let textAreaH = document.createElement("textarea");
  textAreaH.textContent = copyText.textContent;
  copyText.appendChild(textAreaH);
  textAreaH.select();
  textAreaH.setSelectionRange(0, 99999); /*For mobile devices*/
  /* Copy the text inside the text field */
  document.execCommand("copy");
  textAreaH.textContent = "";
  textAreaH.style.display = "none";
  /* Alert the copied text */
  alert("Copied");
}
copyURL.addEventListener("click", copyURLToClipBoard);
/**
 * GET https://rel.ink/api/links/Nn8y9p/

{
  "hashid":"Nn8y9p",
  "url": "https://news.ycombinator.com/",
  "created_at":"2019-06-18T21:29:57.922801Z"
}
 * 
 * 
 */
