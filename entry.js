var DomUtils = {
    // 获取单一DOM元素
    get: function(query) {
        var _this = this;
        if(!document.querySelector) {
            return document.querySelector(query);
        } else {
            var elements = document;
            var queryStrArray = query.split(/ +/);
            for(var i = 0; i < queryStrArray.length; i++) {
                var domName = queryStrArray[i];
                elements = _this.getElementsOfParentNode(domName, elements);
            }
            if(elements.length == 1) {
                return elements[0];
            } else {
                return elements;
            }
        }
    },
    // 获取DOM元素集合
    getAll: function (query) {
        if(!document.querySelectorAll) {
            return document.querySelectorAll(query);
        }else{
            var className = query.slice(1)
            var children = document.getElementsByTagName('*');                   //获取html中所有的DOM节点 
            var elements = [];                                                                //用一个空数组存放要获取的class类名
            for (var i = 0; i < children.length; i++) {
                var child = children[i];                                                        
                var classNames = child.className.split(' ');                                    //将所有的class节点保存在一个数组之中
                for (var j = 0; j < classNames.length; j++) {                                 //遍历循环，将满足要求的class存入elements空数组中
                    if (classNames[j] == className) {
                        elements.push(child);
                        break;
                    }
                }
            }
            return elements;
        }
    },
    // 获取DOM元素
    getElementsOfParentNode: function(domName, parentNode) {
        var _this = this;
        parentNode = parentNode || document;
        var regExps = {
            id: new RegExp("^#"),
            className: new RegExp("^.")
        };
        if(regExps.id.test(domName)) {
            domName = domName.replace(/^\#/g, "");
            return parentNode.getElementById(domName);
        } else if(regExps.className.test(domName)) {
            domName = domName.replace(/^./g, "");
            return _this.getElementsByClassName(domName, parentNode);
        } else {
            return parentNode.getElementsByTagName(domName);
        }
    },
    // 获取class元素的兼容方法
    getElementsByClassName: function(className, parentNode) {
        if(parentNode.getElementsByClassName){
            return parentNode.getElementsByClassName(className);
        } else {
            className = className.replace(/^ +| +$/g,"");
            var classArray = className.split(/ +/);
            var eles = parentNode.getElementsByTagName("*");
            for(var i = 0;i < classArray.length; i++){
                var classEles = [];
                var reg = new RegExp("(^| )" + classArray[i] + "( |$)");
                for(var j = 0;j < eles.length; j++){
                    var ele = eles[j];
                    if(reg.test(ele.className)){
                        classEles.push(ele);
                    }
                }
                eles = classEles;
            }
            return eles;
        }
    },
    addChild:function(elementId,child){
        var parent = this.get(elementId)
        parent.appendChild(child)
    }
};
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
function Main(data){
    var cates = data.category;
    for(var i = 0;i < cates.length;i++){
        var cate = cates[i];
        var li = document.createElement("LI")
        li.innerHTML = "<a>"+cate.cateName+"</a>"
        li.setAttribute("cateId",cate.cateId);
        DomUtils.addChild(".mini_main_title_ul",li);
    }
}
Http.get("data/online/002/mini/mini_data_1.json",function(res){
    var data = JSON.parse(res)
    Main(data);
})