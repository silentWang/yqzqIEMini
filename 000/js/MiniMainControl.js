window["MiniMainControl"] = (function(window,document){
    var clsObj = window.NewClass("MiniMainControl");
    clsObj.init = function(data){
        this.data = data;
        this.setCategory();
        this.setList();
    }

    clsObj.setCategory = function(){
        var _this = this;
        var cates = this.data.category;
        var firstCateId = -1;
        for(var i = 0;i < cates.length;i++){
            var cate = cates[i];
            var li = document.createElement("LI")
            li.innerHTML = "<a>"+cate.cateName+"</a>"
            li.setAttribute("cateId",cate.cateId);
            if(i == 0) firstCateId = cate.cateId;
            li.onclick = (function(cateId){
                return function(){
                    _this.gotoCategry(cateId);
                }
            })(cate.cateId)
            this.DomUtils.addChild(".mini_main_title_ul",li);
        }
        if(firstCateId >= 0){
            this.setSelect(firstCateId);
        }
    }

    clsObj.setList = function(){
        this.DomUtils.removeAll(".mini_content");
        var mainlist = this.data.main_list;
        var fragment = document.createDocumentFragment();
        for(var i = 0;i < mainlist.length;i++){
            var info = mainlist[i];
            if(info.type == 2){
                var div = document.createElement("DIV");
                var adv = this.DataCenter.getDefaultBDAdv();
                div.appendChild(adv);
                fragment.appendChild(div);
            }
            else{
                var div = document.createElement("DIV")
                div.setAttribute("class","mini_content_item")
                var itemdiv = this.getDivByData(info);
                div.appendChild(itemdiv);
                fragment.appendChild(div);
            }
        }
        this.DomUtils.addChild(".mini_content",fragment)
    }

    clsObj.gotoCategry = function(cateId){
        var _this = this;
        var cele = this.DomUtils.get(".mini_middle");
        cele.scrollTop = 0;
        this.setSelect(cateId);
        this.DataCenter.getMiniInfo(cateId,function(res){
            _this.data = res;
            _this.setList();
        });
    }

    clsObj.setSelect = function(cateId){
        var index = this.getIndexByCateId(cateId);
        var ul = this.DomUtils.get(".mini_main_title_ul");
        var eles = ul.children;
        for(var i = 0;i < eles.length;i++){
            var ele = eles[i];
            var classname = index == i ? 'mini_navLink_selected':'mini_navLink';
            ele.setAttribute("class",classname)
        }
    }

    clsObj.getIndexByCateId = function(cateId){
        var cates = this.data.category;
        var index = 0;
        for(var i = 0;i < cates.length;i++){
            var cate = cates[i];
            if(cate.cateId == cateId){
                index = i;
            }
        }
        return index;
    }

    clsObj.getDivByData = function(data){
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
                shtml += "<a target='_blank'><img src="+pictures[i]+"></a>"
            }
            shtml += "<div class='mini_content_more' target='_blank'><span>查看更多>></span></div>";
            sdiv.innerHTML = shtml;
            var span = document.createElement("SPAN");
            span.setAttribute("class","mini_content_image_p")
            span.innerText = data.from;
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
    return clsObj;
})(window,document);