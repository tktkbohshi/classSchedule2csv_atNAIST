let Data = { URL: "" };
let id = 0;
const syllabus_url_pattern = /https:\/\/syllabus.naist.jp\/[a-z]*\/preview_detail/g;

window.addEventListener("load", (e) => {
  chrome.tabs.getSelected((tab) => {
    Data.URL = tab.url;
    id = tab.id;

    if (Data.URL.search(syllabus_url_pattern) !== -1) {
      var className = document.getElementById("class-name");
      var classYear = document.getElementById("class-year");
      var classURL = document.getElementById("class-url");
      var classDetail = document.getElementById("class-detail");
      chrome.tabs.executeScript(
        id,
        {
          file: "dataGetScripts.js",
        },
        function (results) {
          console.log(results);
          className.innerText = results[0]["授業名"];
          classYear.innerText = "年度: " + results[0]["年度"];
		  classURL.innerText = Data.URL
          for (el in results[0]["授業日程"]) {
            classDetail.innerHTML +=
              "<div>" +
              "第" +
              el +
              "回, " +
              results[0]["授業日程"][el]["日付"] +
              ", 時限:" +
              results[0]["授業日程"][el]["時限"] +
              ", 場所: " +
              results[0]["授業日程"][el]["講義室"] +
              "</div><br/>";
          }
        }
      );

      //Add to google Calender
    } else {
      var className = document.getElementById("class-name");
      var addButton = document.getElementById("add-button");
      className.innerText = "Not found in this site.";
      addButton.disabled = true;
    }
  });
  // 1. Load the JavaScript client library.
  gapi.load("client", start);
});

function add_google_calender() {}

function start() {
  // 2. Initialize the JavaScript client library.
  gapi.client
    .init({
      apiKey: "AIzaSyC8qU43-dMwK4Pi_xlf_Jj1hCbCdX-qOtw",
      // Your API key will be automatically added to the Discovery Document URLs.
      discoveryDocs: ["https://people.googleapis.com/$discovery/rest"],
    })
    .then(function () {
      // 3. Initialize and make the API request.
      return gapi.client.people.people.get({
        resourceName: "people/me",
        "requestMask.includeField": "person.names",
      });
    })
    .then(
      function (response) {
        console.log(response.result);
      },
      function (reason) {
        console.log("Error: " + reason.result.error.message);
      }
    );
}
