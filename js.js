
var richtext1=document.getElementById("inputrichtext")

var richtext2=document.getElementById("outputrichtext")
var button1=document.getElementById("test1")

console.log(typeof button1)

button1.onclick=function () {
        richtext2.value=""
        console.log("结束")
        var texts=richtext1.value.split("\n")
        for (let i = 0; i < texts.length; i++) {

            var text=texts[i]
            text=text.replace(/[-•.．…·?畿噜，"'耄蠡曦争穆?\s]/g,"")
            var under=0
            for (const textElement of text) {
                if(!isNaN(Number(textElement,10))){
                    under++
                }else {
                    break;
                }
            }
            var number_text=text.slice(0,under).split("").reverse()
            text=text.slice(under)
            var join_frequency=2
            var new_number_text=[]
            for (let j=0;j<number_text.length;j++){
                if (join_frequency!==0&&j<number_text.length-1){
                    new_number_text.push(number_text[j])
                    new_number_text.push(".")
                    join_frequency--
                }else {
                    new_number_text.push(number_text[j])
                }
            }
            new_number_text=new_number_text.reverse().join("")
            // var text1=text.slice(0,2)+"."+text.slice(2)
            richtext2.value+=new_number_text+" "+text+"\n"
        }
}

        

