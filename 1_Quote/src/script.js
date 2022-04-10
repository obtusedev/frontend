const titleEl = document.getElementById("title");
const quoteEl = document.getElementById("quote");
const buttonContainerEl = document.getElementById("button-container");
const copyrightEl = document.getElementById("copyright");
const previous = document.getElementById("previous");
const random = document.getElementById("random");

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

/* Helpers */
const searchWiki = e => {
    let query = e.target.textContent;
    let url = encodeURI(
        `https://en.wikipedia.org/wiki/${query.replaceAll(" ", "_")}`
    );
    window.open(url, "_blank");
};

const copyQuoteToClipboard = e => {
    navigator.clipboard.writeText(e.target.textContent);
    alert("Copied!"); // TODO: make this more user friendly
};

const refreshQuote = () => {
    const savedDay = window.localStorage.getItem("day");
    const today = new Date().getDate();
    if (savedDay === undefined || savedDay < today) return true;
    return false;
};

const createAuthorSpan = author => {
    const fragment = document.createElement("span");
    fragment.setAttribute("id", "author");
    fragment.setAttribute("class", "underline");
    fragment.innerText = author;
    fragment.onclick = searchWiki;
    quoteEl.insertAdjacentElement("beforeend", fragment);
};

const createCopyrightSpan = (year, link) => {
    const fragment = document.createElement("span");
    fragment.setAttribute("id", "copyright");
    fragment.innerHTML = `Copyright ${year} ${link.split("/")[2]}`;
    fragment.onclick = () => console.log("clicked");
    buttonContainerEl.insertAdjacentElement("afterend", fragment);
};

const quoteOfTheDay = async () => {
    // no cached quote
    if (window.localStorage.getItem("qotd") === null || refreshQuote()) {
        let res = await fetch("https://quotes.rest/qod?language=en");
        let data = await res.json();
        window.localStorage.setItem("qotd", JSON.stringify(data));
        let { quote, author, date } = data.contents.quotes[0];
        let { year, url } = data.copyright;
        window.localStorage.setItem("day", new Date(date).getUTCDate());
        quoteEl.innerText = `${quote} - `;
        quoteEl.onclick = copyQuoteToClipboard;
        createAuthorSpan(author);
        createCopyrightSpan(year, url);
    } else {
        let cached = JSON.parse(window.localStorage.getItem("qotd"));
        let { quote, author } = cached.contents.quotes[0];
        let { year, url } = cached.copyright;
        quoteEl.innerText = `${quote} - `;
        quoteEl.onclick = copyQuoteToClipboard;
        createAuthorSpan(author);
        createCopyrightSpan(year, url);
    }
};

const main = () => {
    quoteOfTheDay();
    setDarkTheme();
};

main();
