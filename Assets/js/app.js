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
const shortenAPILink = `https://cors-anywhere.herokuapp.com/https://cleanuri.com/api/v1/shorten`;

const fetchLINK = async (link) => {
  try {
    let encodedURL = `url=${encodeURIComponent(link)}`;
    console.log(encodedURL);
    const response = await fetch(shortenAPILink, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "same-origin",
      body: encodedURL,
    });
    console.log(response.body);
    try {
      const jsonData = await response.json();
      console.log(jsonData);
      if (jsonData.error == "API Error: After sanitization URL is empty") {
        resultBox.style.display = "none";
        errorFormHandling.style.display = "block";
        setTimeout((_) => {
          errorFormHandling.style.display = "none";
        }, 1000);
      } else {
        resultBox.style.display = "block";
        enteredLink.textContent = `${myURL.value.substring(0, 50)}.....`;
        outPutLink.textContent = jsonData.result_url;
        outPutLink.parentElement.setAttribute("href", jsonData.result_url);
      }
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error.message);
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
  copyURL.textContent = "Copied!";
  copyURL.style.backgroundColor = "hsl(257, 27%, 26%)";
  setTimeout(() => {
    copyURL.textContent = "Copy";
    copyURL.style.backgroundColor = " hsl(180, 66%, 49%)";
  }, 3000);
}
copyURL.addEventListener("click", copyURLToClipBoard);
