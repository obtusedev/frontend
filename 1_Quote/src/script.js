const titleEl = document.getElementById("title");
const quoteEl = document.getElementById("quote");
const previous = document.getElementById("previous");
const random = document.getElementById("random");
const next = document.getElementById("next");

/* Dark Mode */
const isTimeForDarkMode = () => {
    // between 8:00pm & 6:00am; 20:00-06:00
    const hour = new Date().getHours();
    if (hour >= 20 || hour <= 6) {
        return true;
    }
    return false;
};

const setDarkTheme = () => {
    const bodyEl = document.querySelector("body");
    if (isTimeForDarkMode()) bodyEl.setAttribute("class", "dark");
};

const searchWiki = e => {
    let query = e.target.textContent;
    let url = encodeURI(`https://en.wikipedia.org/wiki/${query.replaceAll(" ", "_")}`);
    window.open(url, "_blank");
}

authorEl.onclick = searchWiki;
