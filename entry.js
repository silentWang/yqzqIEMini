var Http = {
    get:function(url,callback){
        var xhr = null;
        if(window.XMLHttpRequest){
            xhr = new window.XMLHttpRequest();
        }
        else if(window.ActiveXObject){
            xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
        }
        if(!xhr){
            alert("浏览器不支持ajax")
            return;
        }
        xhr.open("GET",url);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                if(callback){
                    callback(xhr.responseText)
                }
            }
        }
        xhr.send();
    }
}
var MiniUtils = {
    getDivByData:function(data){
        var pictures = data.pics;
        var div = document.createElement("DIV")
        div.setAttribute("class","mini_content_item")
        var sDiv = document.createElement("DIV");
        div.appendChild(sDiv)
        var _this = this
        if(pictures.length >= 3){
            sDiv.setAttribute("class","mini_three_div")
            var a = document.createElement("A");
            a.innerText = data.title;
            a.onclick = function(){
                DataCenter.gotoNews(data);
            }
            var sdiv = document.createElement("DIV");
            sdiv.setAttribute("class","mini_content_image")
            var shtml = "";
            for(var i = 0;i < 3;i++){
                shtml += "<a target='_blank'><img src="+pictures[0]+"></a>"
            }
            shtml += "<div class='mini_content_more' target='_blank'><span>查看更多>></span></div>";
            sdiv.innerHTML = shtml;
            var span = document.createElement("SPAN");
            span.setAttribute("class","mini_content_image_p")
            span.innerText = data.cateName + data.from;
            sDiv.appendChild(a);
            sDiv.appendChild(sdiv);
            sDiv.appendChild(span);
        }
        else {
            var div1 = document.createElement("DIV");
            var div2 = document.createElement("DIV");
            div1.setAttribute("class","mini_content_one_image")
            div1.onclick = function(){
                DataCenter.gotoNews(data);
            }
            div1.innerHTML = "<a target='_blank'><img src="+pictures[0]+"></a>"
            div2.setAttribute("class","mini_content_one_image_title")
            var a2 = document.createElement("A")
            a2.onclick = function(){
                DataCenter.gotoNews(data);
            }
            a2.setAttribute("target","_blank")
            a2.innerText = data.title;
            div2.appendChild(a2)
            var span2 = document.createElement("SPAN")
            span2.innerText = data.cateName + data.from;
            div2.appendChild(span2);
            sDiv.appendChild(div1)
            sDiv.appendChild(div2)
        }
        return sDiv;
    }
}

function Main(data){
    var gotoCategry = function(idx){
        if(idx < 0){
            var mode = DataCenter.getJumpToPath();
            window.open("//news.kukumai.cn/" + mode,"_blank")
            return;
        }
        var cele = DomUtils.get("mini_middle");
        cele.scrollTop = 0;
        DataCenter.getMiniInfo(idx,function(res){
            if(res.code != 200) return
            var data = res.data;
            // this.actionItemList.reset();
            // this.newsList = data.main_list;
        });
    }
    var cates = data.category;
    for(var i = 0;i < cates.length;i++){
        var cate = cates[i];
        var li = document.createElement("LI")
        li.innerHTML = "<a>"+cate.cateName+"</a>"
        li.setAttribute("cateId",cate.cateId);
        li.onclick = function(){
            gotoCategry(cate.cateId);
        }
        DomUtils.addChild(".mini_main_title_ul",li);
    }
    var mainlist = data.main_list;
    for(var i = 0;i < mainlist.length;i++){
        var info = mainlist[i];
        if(info.type == 2){
            
        }
        else{
            var div = document.createElement("DIV")
            div.setAttribute("class","mini_content_item")
            var itemdiv = MiniUtils.getDivByData(info);
            div.appendChild(itemdiv);
            DomUtils.addChild(".mini_content",div)
        }
    }
    var rand = Math.ceil(100*Math.random());
    var sides = []
    var main_side = data.main_side
    for(var i = 0;i < main_side.length;i++){
        var info = main_side[i]
        if(info.name == "part_0"){
            // this.actionItemList.setIDS(info.adv);
            // this.actionItem3.setIDS(info.adv,false);
            // var xrate = info.adv.open_rate;
            // this.showAdvFlag1 = window.check_version && rand <= xrate;
        }
        else if(info.name == "part_1"){
            // this.actionItemCC1.setIDS(info.adv);
            // info.type = 2
            sides.push(info)
        } 
        else if(info.name == "part_2"){
            sides.push(info);
            // this.actionItem2.setIDS(info.adv,false);
            // let rate = info.adv.open_rate;
            // this.showAdvFlag3 = window.check_version && rand <= rate;
        }
        else if(info.name == "part_3"){
            sides.push(info);
            // info.type = 2;
            // this.actionItemCC2.setIDS(info.adv);
        } 
        // else if(info.name == "part_4"){
        //     this.actionItem1.setIDS(info.adv,false);
        //     this.dialogNewsList = info.data.slice(0,2);
        //     let rate = info.adv.open_rate;
        //     this.showAdvFlag2 = window.check_version && rand <= rate;
        // } 
    }
    MiniRightControl.init(sides);
}
DataCenter.getMiniInfo(1,function(data){
    Main(data)
})
// Http.get("data/online/002/mini/mini_data_1.json",function(res){
//     var data = JSON.parse(res)
//     Main(data);
// })