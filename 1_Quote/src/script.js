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

const isNewDay = () => {
    // does the quote of the day in local session cache need refreshing
    const savedDate = new Date().getDate();
    window.localStorage.setItem("day", savedDate);
    const today = new Date().getDate();

    if (window.localStorage.getItem("day") < today) return true;
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

const quoteOfTheDay = async () => {
    // no cached quote
    if (window.localStorage.getItem("qotd") === null || isNewDay()) {
        let res = await fetch("https://quotes.rest/qod?language=en");
        let data = await res.json();
        window.localStorage.setItem("qotd", JSON.stringify(data));
        let { quote, author } = data.contents.quotes[0];
        quoteEl.innerText = `${quote} - `;
        quoteEl.onclick = copyQuoteToClipboard;
        createAuthorSpan(author);
    } else {
        let cached = JSON.parse(window.localStorage.getItem("qotd"));
        let { quote, author } = cached.contents.quotes[0];
        quoteEl.innerText = `${quote} - `;
        quoteEl.onclick = copyQuoteToClipboard;
        createAuthorSpan(author);
    }
};

const main = () => {
    quoteOfTheDay();
    setDarkTheme();
};

main();
