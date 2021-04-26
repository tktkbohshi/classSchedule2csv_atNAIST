//get class name
var contents_body = document.getElementById("contents")
var title = contents_body.children[0].innerText
var title_splited= title.split(" ")
title = title_splited[1]+title_splited[2]+title_splited[3]
var year = title_splited[0].replace(/[^0-9]/g, '');

//get time table and place
class_dict = { 授業日程: {} }
var table_body = document.getElementsByClassName("tbl01 mB20")[4].children[0]
trs = Array.from(table_body.children)
trs.map((el, i)=>{
    if(i>0){
        class_dict["授業日程"][i] = {}
        class_dict["授業日程"][i]["日付"] = el.children[1].innerText
        class_dict["授業日程"][i]["時限"] = el.children[2].innerText
        class_dict["授業日程"][i]["講義室"] = el.children[3].innerText
    }
})
class_dict["授業名"] = title
class_dict["年度"] = year

class_dict