// 有关“空白”模板的简介，请参阅以下文档:
// http://go.microsoft.com/fwlink/?LinkID=392286



(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: 此应用程序刚刚启动。在此处初始化
                //您的应用程序。
                document.getElementById("idku").addEventListener("click", function () {
                    var message = "请看着我 0721 吧！";
                    Windows.UI.Popups.MessageDialog(message).showAsync();
                });

                //document.getElementById("textBox1").addEventListener("input", function (event) {
                //    var inputText1 = event.target.value;
                //});
                document.getElementById("Apply1").addEventListener("click", function () {
                    // 获取文本框的内容
                    var inputText1 = document.getElementById("textBox1").value;
                });


            } else {
                // TODO: 此应用程序已挂起，然后终止。
                // 若要创造顺畅的用户体验，请在此处还原应用程序状态，使应用似乎永不停止运行。
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: 即将挂起此应用程序。在此处保存
        //需要在挂起中保留的任何状态。您可以使用
        // WinJS.Application.sessionState 对象，该对象将在
        //挂起中自动保存和恢复。如果您需要在
        //挂起应用程序之前完成异步操作，请调用
        // args.setPromise()。
    };

    app.start();
})();


