window.addEventListener("load", function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.jikan.moe/v3/top/anime/1");
  xhr.send();
  xhr.onload = function () {
    var detail = JSON.parse(xhr.response).top;
    var cont = document.getElementById("container");
    for (var i = 0; i < detail.length; i++) {
      var card = document.createElement("div");
      var poster = document.createElement("img");
      poster.setAttribute("src", detail[i].image_url);
      poster.setAttribute("class", "poster");
      poster.setAttribute("id", detail[i].mal_id);
      var title = document.createElement("h3");
      title.textContent = detail[i].title;
      var about = document.createElement("div");
      about.setAttribute("class", "about");
      var episodes = document.createElement("p");
      episodes.textContent = `Episodes: ${detail[i].episodes}`;
      var sdate = document.createElement("p");
      sdate.textContent = `Start Date: ${detail[i].start_date}`;
      var edate = document.createElement("p");
      edate.textContent = `End Date: ${detail[i].end_date}`;
      var view = document.createElement("button");
      view.textContent = "View More info";
      view.value = detail[i].mal_id;
      view.setAttribute("class", "view");
      about.append(episodes, sdate, edate, view);
      var classic = document.createElement("div");
      classic.append(poster, about);
      classic.setAttribute("class", "classic");
      card.setAttribute("class", "card");
      card.append(title, classic);
      cont.append(card);
      view.addEventListener("click", id);
    }
  };
  var searched = document.getElementById("searchbtn");
  searched.addEventListener("click", searchgo);
});

function searchgo() {
  var genre = document.getElementById("Genre").value;
  var q = document.getElementById("search").value;
  var url = new URLSearchParams();
  url.append("q", q);
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.jikan.moe/v3/search/" + genre + "?" + url);
  xhr.send();
  console.log("https://api.jikan.moe/v3/search/" + genre + "?" + url);
  xhr.onerror = function () {
    alert("No Results Found");
  };
  xhr.onload = function () {
    if (JSON.parse(xhr.response).results) {
      var detail = JSON.parse(xhr.response).results;
      var cont = document.getElementById("container");
      cont.innerHTML = "";
      for (var i = 0; i < detail.length; i++) {
        var card = document.createElement("div");
        var poster = document.createElement("img");
        poster.setAttribute("src", detail[i].image_url);
        poster.setAttribute("class", "poster");
        var title = document.createElement("h3");
        title.textContent = detail[i].title;
        var about = document.createElement("div");
        about.setAttribute("class", "about");
        var episodes = document.createElement("p");
        episodes.textContent = `Episodes: ${detail[i].episodes}`;
        var sdate = document.createElement("p");
        sdate.textContent = `Start Date: ${detail[i].start_date}`;
        var edate = document.createElement("p");
        edate.textContent = `End Date: ${detail[i].end_date}`;
        var view = document.createElement("button");
        view.textContent = "View More info";
        view.value = detail[i].mal_id;
        view.setAttribute("class", "view");
        about.append(episodes, sdate, edate, view);
        var classic = document.createElement("div");
        classic.append(poster, about);
        classic.setAttribute("class", "classic");
        card.setAttribute("class", "card");
        card.append(title, classic);
        cont.append(card);
        view.addEventListener("click", id);
      }
    } else {
      alert("No results Found");
    }
  };
}
function id() {
  localStorage.setItem("id", event.target.value);
  location.assign("html/episodes.html");
}
