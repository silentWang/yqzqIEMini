NewClass = function(name){
    var clsObj = {
        __classname:name
    }
    clsObj.ctor = function(app){
        this.DomUtils = app.DomUtils;
        this.process = app.process;
        this.DataCenter = app.DataCenter;
        return this;
    }
    clsObj.dtor = function(){
        this.app = null;
    }
    return clsObj;
}
process = {
    env:{
        // NODE_ENV:"production",
        NODE_ENV:"development",
        BUILD_MODE:100
    }
}
DomUtils = (function(){
    // 获取单一DOM元素
    var obj = {
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
        removeChild:function(parent,child){
            if(!parent || !child) return
            var children = parent.children;
            if(!children || children.length == 0) return;
            // if(parent.removeChild){
            //     parent.removeChild(child)
            //     return;
            // }
            var index = -1;
            for(var i = 0;i < children.length;i++){
                if(child == children[i]){
                    index = i;
                    break;
                }
            }
            if(index < 0) return;
            parent.removeNode(child);
        },
        removeAll:function(elementId){
            var ele = this.get(elementId)
            if(ele){
                while(ele.firstChild){
                    ele.removeChild(ele.firstChild)
                }
            }
        },
        addChild:function(elementId,child){
            var parent = this.get(elementId)
            parent.appendChild(child)
        }
    }
    return obj
})();
