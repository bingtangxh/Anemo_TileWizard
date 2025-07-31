//
// A JavaScript background task is specified in a .js file. The name of the file is used to
// launch the background task.
//

var cancel = false;

(function () {
    "use strict";
    // This var is used to get information about the current instance of the background task.
    var backgroundTaskInstance = Windows.UI.WebUI.WebUIBackgroundTaskInstance.current;
    // This function will do the work of your background task.
    function doWork() {
        var key = null,
        settings = Windows.Storage.ApplicationData.current.localSettings;
        // Write JavaScript code here to do work in the background.

        var currentTileText0 = Windows.Storage.ApplicationData.current.localSettings.values["currentTileText0"] || '';
        var currentTileText1 = Windows.Storage.ApplicationData.current.localSettings.values["currentTileText1"] || '';
        var currentTileText2 = Windows.Storage.ApplicationData.current.localSettings.values["currentTileText2"] || '';
        var currentTileText3 = Windows.Storage.ApplicationData.current.localSettings.values["currentTileText3"] || '';
        var currentTileText4 = Windows.Storage.ApplicationData.current.localSettings.values["currentTileText4"] || '';
        var settings = Windows.Storage.ApplicationData.current.localSettings;
        var step = Windows.Storage.ApplicationData.current.localSettings.values["step"];
        if (typeof step !== "number") {
            step = 1;
        }
        var badgeTemplate = Windows.UI.Notifications.BadgeUpdateManager.getTemplateContent(
            Windows.UI.Notifications.BadgeTemplateType.badgeNumber
        );
        var badgeElement = badgeTemplate.selectSingleNode("/badge");
        badgeElement.setAttribute("value", step);
        var badgeNotification = new Windows.UI.Notifications.BadgeNotification(badgeTemplate);
        Windows.UI.Notifications.BadgeUpdateManager
            .createBadgeUpdaterForApplication()
            .update(badgeNotification);
        Windows.Storage.ApplicationData.current.localSettings.values["step"] = step + 1;
        console.log("后台任务执行完成，当前 step 为: " + step);

        // Record information in LocalSettings to communicate with the app.
        Windows.Storage.ApplicationData.current.localSettings.values["lastRun"] = new Date().toString();
        key = backgroundTaskInstance.task.taskId.toString();
        Windows.Storage.ApplicationData.current.localSettings.values[key] = "Succeeded";
        // A JavaScript background task must call close when it is done.
        close();
    }
    if (!canceled) {
        doWork();
    } else {
        // Record information in LocalSettings to communicate with the app.
        key = backgroundTaskInstance.task.taskId.toString();
        settings.values[key] = "Canceled";
        // A JavaScript background task must call close when it is done.
        close();
    }
})();

// Associate a cancellation handler with the background task.
backgroundTaskInstance.addEventListener("canceled", onCanceled);
function onCanceled(cancelSender, cancelReason) {
    cancel = true;
}




//function runBackGroundTask_old() {
//    // 检测是否后台任务上下文
//    try {
//        if (typeof Windows.UI.WebUI.WebUIBackgroundTaskInstance !== "undefined") {
//            var taskInstance = Windows.UI.WebUI.WebUIBackgroundTaskInstance.current;
//            WinJS.Namespace.define("TileBackgroundTask", {
//                run: function (taskInstance) {
//                    var deferral = taskInstance.getDeferral();
//                    // Windows.Storage.ApplicationData.current.localSettings.values["lastRun"] = new Date().toString();
//                    taskInstance.oncanceled = function (cancelEventArgs) {
//                        console.log("后台任务被取消: " + cancelEventArgs);
//                        deferral.complete();
//                    };

//                    // 更新疯狂星期四
//                    if (isTodayThursday()) {
//                        updateBadge("50");
//                    } else {
//                        updateBadge("0");
//                    }

//                    var currentTileText0 = Windows.Storage.ApplicationData.current.localSettings.values["currentTileText0"] || '';
//                    var currentTileText1 = Windows.Storage.ApplicationData.current.localSettings.values["currentTileText1"] || '';
//                    var currentTileText2 = Windows.Storage.ApplicationData.current.localSettings.values["currentTileText2"] || '';
//                    var currentTileText3 = Windows.Storage.ApplicationData.current.localSettings.values["currentTileText3"] || '';
//                    var currentTileText4 = Windows.Storage.ApplicationData.current.localSettings.values["currentTileText4"] || '';

//                    if (Windows.Storage.ApplicationData.current.localSettings.values["isWallpaperSubmissionEnabled"] === 'true') {
//                        getBingWallpaper();
//                        if (imageData.length === 0) {
//                            return;
//                        }
//                        var imageUrl = 'https://www.bing.com' + imageData[0].url;
//                        downloadImageToLocal(imageUrl)
//                            .then(function (file) {
//                                // 设置为锁屏背景
//                                return Windows.System.UserProfile.LockScreen.setImageFileAsync(file);
//                                // 这行代码对于电脑有用，手机上没用
//                            })
//                            .then(function () {
//                                console.log('锁屏背景设置成功！');
//                            })
//                        /*.catch(function (error) {
//                            console.error('设置锁屏背景失败:', error);
//                        })*/;

//                        currentTileText0 = imageData[0].title || '';
//                        currentTileText1 = imageData[0].copyright || '';
//                    }
//                    var settings = Windows.Storage.ApplicationData.current.localSettings;
//                    var tileFlag = Windows.Storage.ApplicationData.current.localSettings.values["tileFlag"] || 0;

//                    if ((Windows.Storage.ApplicationData.current.localSettings.values["tileFlag"] || 0) === 0) {
//                        setTile(Number(savedValue), currentTileText0, currentTileText1, currentTileText2, currentTileText3, currentTileText4);
//                        Windows.Storage.ApplicationData.current.localSettings.values["tileFlag"] = 1;
//                    } else {
//                        Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication().clear();
//                        Windows.Storage.ApplicationData.current.localSettings.values["tileFlag"] = 0;
//                    }
//                    // 不继续执行 UI 逻辑
//                    deferral.complete();
//                    close();
//                    return;
//                }
//            });
//        }
//    } catch (error) {
//        // 啥都不干
//    }
//}
