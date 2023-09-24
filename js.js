
const richtext1=document.getElementById("inputrichtext")
const richtext2 = document.getElementById("outputrichtext");
const button1 = document.getElementById("test1");
const button2 = document.getElementById("test2");
const start_level=document.getElementById("parent_directory");

/**
 * 不允许在无正则的情况下整理目录
 */
function block_button() {
    let text_length = richtext1.value.trim().length
    let is_regex=button1.getAttribute("is_regex")
    if (text_length===0&&is_regex==="false"){
        button1.disabled=true
    }else button1.disabled = !(text_length !== 0 && is_regex === "ture");
}

richtext1.oninput=function (){
    if (richtext1.value.trim().length===0){
        button1.setAttribute("is_regex","false")
    }
    block_button()
}
/**
 * 正则化
 */
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

function add_tab(new_text){
    let tabs=[]
    for(let i=0;i<new_text.length-1;i++){
        tabs.push("\t")
    }
    return tabs.join("")
}

function set_multi_level_directory(chas,parent_directory) {
    let max_level=document.getElementById("max_level").value
    let new_chas=[]
    if (max_level>=chas.length){
        max_level=chas.length-1
    }
    if (parent_directory==="0"){
        for (const cha of chas) {
            if (max_level!==0){
                new_chas.push(cha)
                new_chas.push(".")
                max_level--
            }else {
                new_chas.push(cha)
            }
        }
        return [new_chas.join(""),new_chas.join("")]
    }else {
        let under=0
        let origin_num=chas.join("")
        let parent_directory_collection=parent_directory.split(".")
        for (let i = 0; i < parent_directory_collection.length; i++) {
            let cut_origin_num=origin_num.slice(under,under+parent_directory_collection[i].length)
            let after_cut=origin_num.slice(under)
            let next_num=(Number(parent_directory_collection[i])+1).toString()
            under+=parent_directory_collection[i].length
            if (cut_origin_num===parent_directory_collection[i]){
                new_chas.push(cut_origin_num)
                new_chas.push(".")
            }else {
                if (Number(cut_origin_num)-1===Number(parent_directory_collection[i])){
                    new_chas.push(cut_origin_num)
                    new_chas.push(".")
                }else if (next_num.indexOf(after_cut)!==-1){
                    new_chas.push(next_num)
                    under+=1
                }
                break
            }
        }
        new_chas.push(origin_num.slice(under))
        while (1){
            if (!(new_chas[new_chas.length-1]===""||new_chas[new_chas.length-1]===".")){
                break
            }else {
                new_chas.pop()
            }
        }
        let new_text=new_chas.join("").trim()
        return [new_text,new_text]
    }
}

button1.onclick=function () {
        richtext2.value=""
        console.log("结束")
        var texts=richtext1.value.split("\n")
        var parent_directory=document.getElementById("parent_directory").value
    for (let i = 0; i < texts.length; i++) {
        //获取文本
        var text = texts[i].trim()
        if (text===""){
            break
        }
        var under = 0
        for (const textElement of text) {
            if (!isNaN(Number(textElement, 10))) {
                under++
            } else {
                break;
            }
        }
        var number_text = text.slice(0, under).split("")
        text = text.slice(under)
        let new_number_text;
        new_number_text = set_multi_level_directory(number_text,parent_directory)
        if (new_number_text[1]!==""){
            parent_directory=new_number_text[1]
            start_level.value=parent_directory
        }
        new_number_text=new_number_text[0]
        richtext2.value += add_tab(new_number_text.split("."))+new_number_text + " " + text + "\n"
    }
}

block_button()

        

