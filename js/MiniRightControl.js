window["MiniRightControl"] = (function(){
    var clsObj = {};
    clsObj.init = function(data){
        clsObj.data = data;
        clsObj.initList();
    }
    clsObj.initList = function(){
        var data = clsObj.data;
        var fragment = document.createDocumentFragment()
        for(var i = 0;i < data.length;i++){
            var obj = data[i]
            var li = document.createElement("LI")
            if(obj.type == 2){
                clsObj.createAdv(obj)
            }
            else{
                var ele = clsObj.createView(obj.data[0]);
                li.appendChild(ele)
                fragment.appendChild(li)
            }
        }
        DomUtils.addChild(".mini_right_list",fragment)
    }
    clsObj.createView = function(data){
        var div = document.createElement('DIV')
        div.setAttribute("class","ns_main")
        var ul = document.createElement("UL")
        div.setAttribute("class","ns_main_ul")
        var sli = document.createElement("LI")
        sli.setAttribute("class","ns_main_li")
        var img = document.createElement("IMG")
        img.setAttribute("class","ns_slide_image")
        img.src = data ? data.pic : "";
        img.onclick = function(){
            DataCenter.gotoNews(data)
        }
        var sdiv = document.createElement("DIV")
        sdiv.setAttribute("class","ns_slide_title")
        var a = document.createElement("A")
        a.onclick = function(){
            DataCenter.gotoNews(data);
        }
        a.innerText = data ? data.title:"无";
        sdiv.appendChild(a)
        sli.appendChild(img)
        sli.appendChild(sdiv)
        ul.appendChild(sli)
        div.appendChild(ul)
        return div
    }
    clsObj.createAdv = function(data){

    }
    return clsObj;
})();