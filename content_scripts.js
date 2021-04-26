let Data = { URL: "" };
let id = 0;
const syllabus_url_pattern = /https:\/\/syllabus.naist.jp\/charges\/preview_detail/g;

window.addEventListener("load", (e) => {
  chrome.tabs.getSelected((tab) => {
    Data.URL = tab.url;
    id = tab.id;

    if (Data.URL.search(syllabus_url_pattern) !== -1) {
      var className = document.getElementById("class-name");
      chrome.tabs.executeScript(
        id,
        {
          file: "dataGetScripts.js",
        },
        function (results) {
			console.log(results)
			className.innerText = results[0]["授業名"]
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
});

function add_google_calender() {}
