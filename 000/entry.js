if(!window.ActiveXObject){
    window.location.href = "http://news.kukumai.cn/mini/"+process.env.BUILD_MODE;
}
(function(window,document){
    var appModule = {}
    appModule.process = window.process;
    appModule.DomUtils = window.DomUtils;
    appModule.DataCenter = DataCenter.ctor(appModule);
    var mainControl = MiniMainControl.ctor(appModule);
    var rightControl = MiniRightControl.ctor(appModule);
    function Main(data){
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
        mainControl.init(data);
        rightControl.init(sides);
    }
    DataCenter.getMiniInfo(1,function(data){
        Main(data)
    })
    // Http.get("data/online/002/mini/mini_data_1.json",function(res){
    //     var data = JSON.parse(res)
    //     Main(data);
    // })
})(window,document);

