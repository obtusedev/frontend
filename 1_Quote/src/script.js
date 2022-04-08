const titleEl = document.getElementById("title");
const authorEl = document.getElementById("author");



const searchWiki = e => {
    let query = e.target.textContent;
    let url = encodeURI(`https://en.wikipedia.org/wiki/${query.replaceAll(" ", "_")}`);
    window.open(url, "_blank");
}

authorEl.onclick = searchWiki;
