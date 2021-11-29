DataCenter = (function(window,document){
    var clsObj = window.NewClass("DataCenter");
    clsObj.Http = {
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
    clsObj.gotoNews = function(item){
        var idx = item.id;
        var mode = clsObj.getJumpToPath();
        var xurl = "//news.kukumai.cn/content/"+mode+"?id="+idx+"&qid=0&cateid="+item.cateId;
        window.open(xurl, '_blank');
        return false;
    }
     /**创建一个广告管理
     * container 父滚动容器
     * dfttIds 东方广告ids
     * showIds  360 showids
     */
    // clsObj.createAdvItem = function(container = "",name = "actionDefault"){
    //     let item = new AdvDFTT(container);
    //     item.name = name;
    //     return item;
    // }
    // clsObj.getRealUrl = function(cmd = ""){
    //     return process.env.PROXY_BASE + cmd;
    // }
    /**渠道path路径 */
    clsObj.getModeUrlRoot = function(){
        var mode = process.env.BUILD_MODE;
        if(mode >= 100){
            var type = mode%10;
            var xpath = ~~((~~(mode/10))*10);
            xpath = type >= 5 ? "test" + xpath : xpath;
            return xpath + "/";
        }
        return "100/";
    }
    // /**跳转对应url 002特殊*/
    clsObj.getJumpToPath = function(){
        var mode = process.env.BUILD_MODE;
        if(mode == 1 || mode == 3) return "";
        if(mode >= 100){
            var type = mode%10;
            var xpath = ~~((~~(mode/10))*10);
            var tpath = type >= 5 ? "test" + xpath : xpath;
            if(type == 2 || type == 6){
                xpath = "home/"+tpath
            }
            return xpath + "/";
        }
        return "100/";
    }
    // clsObj.getNextId = function(){
    //     if(!clsObj.index) clsObj.index = 10000;
    //     clsObj.index++;
    //     return clsObj.index;
    // }
    // /**加载广告 360一次最多4条 */
    // clsObj.addAdsByClassName = function(classname){
    //     if(!classname) return
    //     let elements = document.getElementsByClassName(classname);
    //     if(!elements || elements.length == 0) return
    //     let len = elements.length;
    //     for(let i = 0;i < len;i++){
    //         let element = elements[i];
    //         if(!element) continue;
    //         clsObj.changeAndExecuteJS(element);
    //     }
    // }
    // /**默认打底广告 */
    // clsObj.getDefaultBDAdv = function(){
    //     let advcode = `<div class="_fnnhq1kgkkb"></div>
    //     <script type="text/javascript">
    //         (window.slotbydup = window.slotbydup || []).push({
    //             id: "u6606892",
    //             container: "_fnnhq1kgkkb",
    //             async: true
    //         });
    //     </script>`;
    //     return advcode;
    // }
    
    // /**change function */
    // clsObj.changeAndExecuteJS = function(element,loaded = true){
    //     if(element.isAdLoaded) return;
    //     if(element.style.display == "none") return;
    //     let sScript = element.getElementsByTagName("script")[0];
    //     if(!sScript) return;
    //     element.removeChild(sScript);
    //     let nScript = document.createElement("script");
    //     nScript.type = "text/javascript";
    //     nScript.innerHTML = sScript.innerHTML;
    //     element.appendChild(nScript);
    //     element.isAdLoaded = loaded;
    // }

    // /**广告iframe上报 */
    clsObj.upToAdverByIframe = function(advers){
        if(!advers || advers.length == 0) return;
        var len = advers.length;
        var element = DomUtils.get("#common_other_container");
        element.innerHTML = "";
        var div = document.createElement("div");
        for(var i = 0;i < len;i++){
            var adv = advers[i];
            if(adv.type == 3 && adv.impression && adv.impression.length > 0){
                for(var j = 0;j < adv.impression.length;j++){
                    var iframe = document.createElement("iframe");
                    iframe.src = adv.impression[j];
                    div.append(iframe);
                }
            }
        }
        // console.log(div);
        element.appendChild(div);
    }

    // /**360show上报 */
    // clsObj.upTo360ShowLog = function(adv){
    //     ReportUtils.track360Show(adv);
    // }
    // /**360点击广告 */
    // clsObj.upTo360ClkLog = function(adv,elementId,x,y,start){
    //     let url = ReportUtils.track360Click(adv,elementId,x,y,start);
    //     return url;
    // }
    // /**上报  qid 渠道号*/
    // clsObj.upToActivity = function(type){
    //     let mode = clsObj.getModeUrlRoot();
    //     let channel_code = mode && mode.slice(0,3);
    //     if(process.env.NODE_ENV != "production"){
    //         console.log(channel_code + "----" + type)
    //         return;
    //     }
    //     let url = "http://api.kukumai.cn/RedisData";//clsObj.getRealUrl("/v1/demo/index");
    //     let userid = clsObj.axios.defaults.headers["userId"];
    //     let params = "?userid=" + userid + "&" + "channel_code=" + channel_code;
    //     if(type){
    //         params += "&type=" + type;
    //     }
    //     let rurl = url + params;
    //     clsObj.axios.get(rurl).then((res)=>{
    //         // console.log(res);
    //     });
    // }
    // /**获取本机ip */
    // clsObj.getIP = function(){
    //     if(clsObj.myIP) return clsObj.myIP;
    //     clsObj.myIP = "";
    //     if(returnCitySN && returnCitySN.cip){
    //         clsObj.myIP = returnCitySN.cip;
    //     }
    //     if(process.env.NODE_ENV == "development"){
    //         console.log("IP相关信息",returnCitySN);
    //     }
    //     return clsObj.myIP;
    // }
    // /**地域屏蔽 */
    // clsObj.getAreaData = function(){        
    //     if(Utils.getRegion()) return new Promise((resolve,reject)=>{resolve()});
    //     let url = "https://1320418215543173.cn-hangzhou.fc.aliyuncs.com/2016-08-15/proxy/Dtxww/ClientArea/";
    //     return clsObj.axios.get(url).then(res=>{
    //         let area = res.data
    //         Utils.setRegion(area.data);
    //     })
    // }
    // /**分类下资讯列表 */
    // clsObj.getNewsListById = function(idx,page = 1){
    //     if(isLocalTest){
    //         let data = {};
    //         return new Promise((resolve,reject)=>{resolve(data)})
    //     }
    //     let ext = "/v1/news/list?cateid="+idx + "&page=" + page;
    //     let url = clsObj.getRealUrl(ext);
    //     return clsObj.axios.get(url).then(res=>{
    //         let data = res.data;
    //         if(data.code == 200){
    //             clsObj.upToAdverByIframe(data.data);
    //         }
    //         return data;
    //     });
    // }
    // /**新闻详情 */
    // clsObj.getNewsDetailById = function(idx){
    //     if(isLocalTest){
    //         let data = {
    //             "status": "success", 
    //             "code": 200, 
    //             "data": {}
    //         }
    //         return new Promise((resolve,reject)=>{resolve(data)})
    //     }
    //     let ext = "/v1/news/detail?id=" + idx
    //     let url = clsObj.getRealUrl(ext);
    //     return clsObj.axios.get(url).then(res=>res.data)
    // }
    // /****************************json版接口******************************************** */
    clsObj.getJsonUrl = function(type,cateid){
        var env = process.env.NODE_ENV;
        var mode = process.env.BUILD_MODE;
        var path = clsObj.getModeUrlRoot();
        var root = "//news.kukumai.cn";
        var url = "";
        if(type == "home"){
            url = root+"/data/online/"+path+"home/home_data.json";
            if(env == "development"){
                url = "/data/develop/"+path+"home/home_data.json";
            }
            else if(mode == 8 || (mode >= 100 && mode%100 == 5)){
                url = root+"/data/develop/"+path+"home/home_data.json";
            }
            return url;
        }
        if(type == "detail"){
            var query = Utils.getUrlParams();
            var cateid = query.cateid ? query.cateid : 1;
            url = root+"/data/online/"+path+"detail/mini_detail_v_"+cateid+".json";
            if(env == "development"){
                url = "/data/develop/"+path+"detail/mini_detail_v_"+cateid+".json";
            }
            else if(mode == 7 || (mode >= 100 && mode%10 == 7)){
                url = root+"/data/develop/"+path+"detail/mini_detail_v_"+cateid+".json";
            }
            return url;
        }
        if(type == "mini"){
            url = root+"/data/online/"+path+"mini/mini_data_"+cateid+".json?v="+new Date().getTime();
            if(env == "development"){
                url = "/data/develop/"+path + "mini/mini_data_"+cateid+".json?v="+new Date().getTime();
            }
            else if(mode == 6 || (mode >= 100 && mode%10 == 5)){
                url = root+"/data/develop/"+path+"mini/mini_data_"+cateid+".json?v="+new Date().getTime();
            }
            return url;
        }
        return url;
    }
    // /**首页新接口 */
    // clsObj.getHomeInfo = function(){
    //     let ext = clsObj.getJsonUrl("home");
    //     return clsObj.axios.get(ext,{headers:{'Content-Type':'application/json'}}).then(res=>{
    //         let data = res.data;
    //         return {code:200,data};
    //     });
    // }
    // /**详情页单接口 */
    // clsObj.getDetailInfo = function(){
    //     if(clsObj.detailData) return new Promise((resolve,reject)=>{resolve(clsObj.detailData)});
    //     let query = Utils.getUrlParams();
    //     let ext = clsObj.getJsonUrl("detail");
    //     return clsObj.axios.get(ext,{headers:{'Content-Type':'application/json'}}).then(res=>{
    //         let data = res.data;
    //         if(query.from && !Utils.isLimitRegion(data.area_limit)){
    //             window.location.href = `http://news.kukumai.cn/?id=${query.id}&from=${query.from}`;
    //             return {code:-1};
    //         }
    //         clsObj.detailData = {code:200,data};
    //         return clsObj.detailData;
    //     });
    // }
     /**get mini info */
    clsObj.getMiniInfo = function(cateid,callback,page){
        if(!page) page = 1;
        if(!cateid) cateid = 1;
        if(page == 1){
            var ext = clsObj.getJsonUrl("mini",cateid);
            this.Http.get(ext,function(res){
                var data = JSON.parse(res)
                clsObj.upToAdverByIframe(data.main_list);
                if(callback){
                    callback(data)
                }
            });
        }
        // var ext = "/v1/mini/index?cateid=" + cateid + "&page=" + page;
        // var url = clsObj.getRealUrl(ext);
        // return clsObj.axios.get(url).then(res=>{
        //     var data = res.data;
        //     // console.log(data.data.main_list);
        //     if(data.code == 200){
        //         clsObj.upToAdverByIframe(data.data.main_list);
        //     }
        //     return data;
        // });
    }
    return clsObj;
})(window,document);