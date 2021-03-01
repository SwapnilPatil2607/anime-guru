window.addEventListener("load", function () {
  var home = document.getElementById("home");
  home.addEventListener("click", backhome);

  if (localStorage.getItem("id")) {
    var id = localStorage.getItem("id");

    var xhm = new XMLHttpRequest();
    xhm.open("GET", "https://api.jikan.moe/v3/anime/" + id + "/pictures");
    xhm.send();
    xhm.onload = function () {
      var pos = JSON.parse(xhm.response).pictures[1].large;
      var poster = document.getElementById("poster");
      poster.setAttribute("src", pos);
    };

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.jikan.moe/v3/anime/" + id + "/episodes");
    xhr.send();

    xhr.onload = function () {
      var epis = JSON.parse(xhr.response).episodes;
      localStorage.setItem("episodes", JSON.stringify(epis));
      var cont = document.getElementById("container");
      if (localStorage.getItem("episodes") != "[]") {
        for (var i = 0; i < epis.length; i++) {
          var card = document.createElement("div");
          card.setAttribute("class", "card");
          var epno = document.createElement("p");
          epno.textContent = "Title : " + epis[i].episode_id;
          var title = document.createElement("p");
          title.textContent = "Title : " + epis[i].title;
          var firstaired = document.createElement("p");
          firstaired.textContent = "First aired : " + epis[i].aired;
          var button = document.createElement("button");
          button.setAttribute("class", "watch");
          button.textContent = "Watch Now";
          button.value = epis[i].video_url;
          button.addEventListener("click", redi);
          card.append(epno, title, firstaired, button);
          cont.append(card);
        }
      } else {
        var cont = document.getElementById("container");
        var h1 = document.createElement("h1");
        h1.textContent = "No Results Available";
        cont.append(h1);
      }
    };

  }
});
function redi() {
  location.assign(event.target.value);
}
function backhome() {
  location.assign("../index.html");
}
