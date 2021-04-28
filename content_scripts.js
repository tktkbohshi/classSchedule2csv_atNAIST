let Data = { URL: "" };
let id = 0;
const syllabus_url_pattern = /https:\/\/syllabus.naist.jp\/[a-z]*\/preview_detail/g;
const timeTable = {
  1: { start: "9:20", end: "10:50" },
  2: { start: "11:00", end: "12:30" },
  3: { start: "13:30", end: "15:00" },
  4: { start: "15:10", end: "16:40" },
  5: { start: "16:50", end: "18:20" },
  6: { start: "18:30", end: "20:00" },
};

window.addEventListener("load", (e) => {
  chrome.tabs.getSelected((tab) => {
    Data.URL = tab.url;
    id = tab.id;

    if (Data.URL.search(syllabus_url_pattern) !== -1) {
      var className = document.getElementById("class-name");
      var classYear = document.getElementById("class-year");
      var classURL = document.getElementById("class-url");
      var classDetail = document.getElementById("class-detail");
      var content =
        "Subject,Start Date,Start Time,End Date,End Time,Place,Description\n";
      var fileName = "test";
      chrome.tabs.executeScript(
        id,
        {
          file: "dataGetScripts.js",
        },
        function (results) {
          //show the class data in the popup
          className.innerText = results[0]["授業名"];
          fileName = results[0]["授業名"];
          classYear.innerText = "年度: " + results[0]["年度"];
          classURL.innerText = Data.URL;

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

            //csv用データ作成
            content +=
              results[0]["授業名"] +
              "(" +
              el +
              ")," +
              results[0]["授業日程"][el]["日付"] +
              "/" +
              results[0]["年度"] +
              "," +
              timeTable[results[0]["授業日程"][el]["時限"]]["start"] +
              "," +
              results[0]["授業日程"][el]["日付"] +
              "/" +
              results[0]["年度"] +
              "," +
              timeTable[results[0]["授業日程"][el]["時限"]]["end"] +
              "," +
              results[0]["授業日程"][el]["講義室"] +
              "," +
              Data.URL +
              "\n";
          }
        }
      );

      //Add to google Calender
      var addButton = document.getElementById("add-button");
      addButton.onclick = () => {
        console.log("Click!");
        console.log(fileName);
        const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
        const blob = new Blob([bom, content], { type: "text/csv" });

        if (window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(blob, fileName + ".csv");
          window.navigator.msSaveOrOpenBlob(blob, fileName + "test.csv");
        } else {
          const url = window.URL.createObjectURL(blob);
          addButton.href = url;
          addButton.download = fileName+".csv";
          setTimeout(() => {
            window.URL.revokeObjectURL(url);
          }, 1000);
        }
      };
    } else {
      var className = document.getElementById("class-name");
      var addButton = document.getElementById("add-button");
      className.innerText = "Not found in this site.";
      addButton.disabled = true;
    }
  });
});
