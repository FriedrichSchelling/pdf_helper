
const richtext1=document.getElementById("inputrichtext")

var richtext2=document.getElementById("outputrichtext")
var button1=document.getElementById("test1")
var button2=document.getElementById("test2")

console.log(typeof button1)

function block_button() {
    let text_length = richtext1.value.trim().length
    let is_regex=button1.getAttribute("is_regex")
    if (text_length===0&&is_regex==="false"){
        button1.disabled=true
    }else button1.disabled = !(text_length !== 0 && is_regex === "ture");
}

richtext1.oninput=function (){
    block_button()
}

button2.onclick=function () {
    richtext2.value=""
    var texts=richtext1.value.split("\n")
    richtext1.value=""
    for (let i = 0; i < texts.length ; i++) {
        var text=texts[i]
        text=text.replace(/[-•.．…·?畿噜，"'耄蠡曦争穆?\s]/g,"")
        richtext1.value+=text+"\n"
    }
    button1.setAttribute("is_regex","ture")
    block_button()
}

function set_multi_level_directory(chas) {
    let max_level=document.getElementById("max_level").value
    let new_chas=[]
    if (max_level>=chas.length){
        max_level=chas.length-1
    }
    for (let i = 0; i < max_level; i++) {
        new_chas.push("\t")
    }
    for (const cha of chas) {
        if (max_level!==0){
            new_chas.push(cha)
            new_chas.push(".")
            max_level--
        }else {
            new_chas.push(cha)
        }
    }
    return new_chas.join("")
}
button1.onclick=function () {
        richtext2.value=""
        console.log("结束")
        var texts=richtext1.value.split("\n")
        for (let i = 0; i < texts.length; i++) {
            //获取文本
            var text=texts[i]
            var under=0
            for (const textElement of text) {
                if(!isNaN(Number(textElement,10))){
                    under++
                }else {
                    break;
                }
            }
            var number_text=text.slice(0,under).split("")
            text=text.slice(under)
            var new_number_text=set_multi_level_directory(number_text)
            // var text1=text.slice(0,2)+"."+text.slice(2)
            richtext2.value+=new_number_text+" "+text+"\n"
        }
}

block_button()

        

