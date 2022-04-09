const titleEl = document.getElementById("title");
const quoteEl = document.getElementById("quote");
const previous = document.getElementById("previous");
const random = document.getElementById("random");
const next = document.getElementById("next");



const searchWiki = e => {
    let query = e.target.textContent;
    let url = encodeURI(`https://en.wikipedia.org/wiki/${query.replaceAll(" ", "_")}`);
    window.open(url, "_blank");
}

authorEl.onclick = searchWiki;
