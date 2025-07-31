//
// A JavaScript background task is specified in a .js file. The name of the file is used to
// launch the background task.
//
 
var backgroundTaskInstance = Windows.UI.WebUI.WebUIBackgroundTaskInstance.current;

(function () {
    importScripts("//Microsoft.WinJS.2.0/js/base.js");
    var cancel = false;
    "use strict";
    // This var is used to get information about the current instance of the background task.
    // This function will do the work of your background task.
   if (!cancel) {
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
    Windows.Storage.ApplicationData.current.localSettings.values["step"] = step + 1;
    if (step == 101) {
        Windows.Storage.ApplicationData.current.localSettings.values["step"] = 1;
    }
    if (isTodayThursday()) {
        updateBadge_bg("50");
    } else {
        updateBadge_bg("0");
    }
    if (Windows.Storage.ApplicationData.current.localSettings.values["isWallpaperSubmissionEnabled"] && false) {
        getBingWallpaper();
        setasLockScreenBackground();
    }
    console.log("后台任务执行完成，当前 step 为: " + step);

    // Record information in LocalSettings to communicate with the app.
    Windows.Storage.ApplicationData.current.localSettings.values["lastRun"] = new Date().toString();
    key = backgroundTaskInstance.task.taskId.toString();
    Windows.Storage.ApplicationData.current.localSettings.values[key] = "Succeeded";
    // A JavaScript background task must call close when it is done.
    close();
}
var currentWallpaperIndex = 0; // 当前显示的图片索引
var images = []; // 存储所有图片元素
var imageData = []; // 存储所有图片数据

function getBingWallpaper() {
    // 首先检查网络状态
    var connectionProfile = Windows.Networking.Connectivity.NetworkInformation.getInternetConnectionProfile();
    if (connectionProfile && connectionProfile.getNetworkConnectivityLevel() ===
        Windows.Networking.Connectivity.NetworkConnectivityLevel.internetAccess) {
        // 有网络连接，尝试获取Bing壁纸
        // var useEnglishDescription_CheckBox = document.getElementById("useEnglishDescription_CheckBox");
        var apiUrl;
        if (true) {
            apiUrl = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8&mkt=en-US'; // n=8 表示获取8张壁纸
        } else {
            apiUrl = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8&mkt=zh-CN'; // n=8 表示获取8张壁纸
        }
        apiUrl += '&_ts=' + Date.now();
        // 使用传统的Promise错误处理方式
        if (1) {
            return new WinJS.Promise(function (resolve, reject) {
                try {
                    var http = Windows.Web.Http;
                    var httpClient = new http.HttpClient();

                    // 创建请求对象
                    var request = new http.HttpRequestMessage(
                        http.HttpMethod.get,
                        new Windows.Foundation.Uri("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1")
                    );

                    // 添加头信息防止缓存
                    // request.headers.cacheControl.tryParseAdd("no-cache");
                    // request.headers.pragma.tryParseAdd("no-cache");
                    request.headers.ifModifiedSince = new Date("Thu, 01 Jan 1970 00:00:00 GMT");

                    // 发送请求
                    httpClient.sendRequestAsync(request).then(function (response) {
                        if (response.statusCode === 200) {
                            return response.content.readAsStringAsync();
                        } else {
                            reject(new Error("HTTP错误: " + response.statusCode));
                        }
                    }).then(function (responseString) {
                        try {
                            var data = JSON.parse(responseString);
                            if (data.images && data.images.length > 0) {
                                resolve(data.images);
                            } else {
                                reject(new Error("未找到图片数据"));
                            }
                        } catch (e) {
                            reject(new Error("JSON解析错误: " + e.message));
                        }
                    }).catch(function (error) {
                        reject(error);
                    });
                } catch (e) {
                    reject(e);
                }
            });
        } else {
            if (0) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", apiUrl, true);
                xhr.setRequestHeader("Cache-Control", "no-cache");
                xhr.setRequestHeader("Pragma", "no-cache");
                xhr.setRequestHeader("If-Modified-Since", "Thu, 01 Jan 1970 00:00:00 GMT");

                xhr.timeout = 5000;

                xhr.onreadystatechange = function () {
                    console.log("xhr.readyState = " + xhr.readyState);
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            try {
                                var data = JSON.parse(xhr.responseText);
                                if (data.images && data.images.length > 0) {
                                    imageData = data.images;
                                    // TODO: 后续逻辑
                                }
                            } catch (e) {
                                console.error("解析Bing数据失败:", e);
                            }
                        } else {
                            console.error("请求失败，状态码:", xhr.status);
                        }
                    }
                };
                xhr.onerror = function () {
                    console.log("请求出现错误");
                }
                xhr.ontimeout = function () {
                    console.log("请求超时");
                };

                xhr.send();
            }
            else {
                WinJS.xhr({
                    url: apiUrl,
                    timeout: 5000,
                    headers: {
                        "Cache-Control": "no-cache",
                        "Pragma": "no-cache",
                        "If-Modified-Since": "Thu, 01 Jan 1970 00:00:00 GMT",
                        //"Accept-Language": "en-US"
                    }
                }).then(
                    function (response) {
                        try {
                            var data = JSON.parse(response.responseText);
                            if (data.images && data.images.length > 0) {
                                imageData = data.images;
                                return;
                            }
                        } catch (e) {
                            console.error('解析Bing数据失败:', e);
                        }
                    },
                    function (error) { // 这是Promise的reject处理函数
                        console.error('获取Bing壁纸失败:', error);
                    }
                );
            }
        }
    } else {
        console.log('无网络连接，不更新，啥都不干');
    }
}

function setasLockScreenBackground() {
    try{
        var imageUrl = 'https://www.bing.com' + imageData[0].url;
    } catch (error) {
        return;
    }
            if (Windows.Storage.ApplicationData.current.localSettings.values["isDescriptionCopyEnabledWhileSwitchingWallpaper"] === true) {
                setDescription_bg();
            }
            downloadImageToLocal(imageUrl)
                .then(function (file) {
                    return Windows.System.UserProfile.LockScreen.setImageFileAsync(file);
                })
                .then(function () {
                    console.log('锁屏背景设置成功！');
                });
        }

function downloadImageToLocal_2(imageUrl) {
    return new WinJS.Promise(function (complete, error) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", imageUrl, true);
            xhr.responseType = "blob";

            xhr.onload = function () {
                if (xhr.status === 200) {
                    var blob = xhr.response;

                    Windows.Storage.ApplicationData.current.temporaryFolder
                        .createFileAsync("lockScreenImage.jpg", Windows.Storage.CreationCollisionOption.replaceExisting)
                        .then(function (file) {
                            return file.openAsync(Windows.Storage.FileAccessMode.readWrite).then(function (stream) {
                                var inputStream = blob.msDetachStream();
                                return Windows.Storage.Streams.RandomAccessStream
                                    .copyAsync(inputStream, stream)
                                    .then(function () {
                                        return stream.flushAsync();
                                    })
                                    .then(function () {
                                        stream.close();
                                        complete(file); // 成功返回 StorageFile
                                    });
                            });
                        }, error);
                } else {
                    error(new Error("下载失败，状态码：" + xhr.status));
                }
            };

            xhr.onerror = function () {
                error(new Error("下载过程中发生错误"));
            };

            xhr.ontimeout = function () {
                error(new Error("下载超时"));
            };

            xhr.timeout = 10000; // 可选设置超时时间
            xhr.send();
        } catch (e) {
            error(e);
        }
    });
}

function downloadImageToLocal(imageUrl) {
    return WinJS.xhr({ url: imageUrl, responseType: 'blob' })
        .then(function (response) {
            // 将 Blob 转换为文件
            var blob = response.response;
            return Windows.Storage.ApplicationData.current.temporaryFolder.createFileAsync('lockScreenImage.jpg', Windows.Storage.CreationCollisionOption.replaceExisting)
                .then(function (file) {
                    return file.openAsync(Windows.Storage.FileAccessMode.readWrite)
                        .then(function (stream) {
                            var inputStream = blob.msDetachStream();
                            return Windows.Storage.Streams.RandomAccessStream.copyAsync(inputStream, stream)
                                .then(function () {
                                    return stream.flushAsync();
                                })
                                .then(function () {
                                    stream.close();
                                    return file;
                                });
                        });
                });
        });
}

function isTodayThursday() {
    return new Date().getDay() === 4; // 4代表星期四
}

function updateBadge_bg(val) {
    var badgeTemplate = Windows.UI.Notifications.BadgeUpdateManager.getTemplateContent(
        Windows.UI.Notifications.BadgeTemplateType.badgeNumber
    );
    var badgeElement = badgeTemplate.selectSingleNode("/badge");
    badgeElement.setAttribute("value", val);
    var badgeNotification = new Windows.UI.Notifications.BadgeNotification(badgeTemplate);
    Windows.UI.Notifications.BadgeUpdateManager
        .createBadgeUpdaterForApplication()
        .update(badgeNotification);
}

function setDescription_bg() {
    Windows.Storage.ApplicationData.current.localSettings.values["currentTileText0"] = imageData[0].title || '';
    Windows.Storage.ApplicationData.current.localSettings.values["currentTileText1"] = imageData[0].copyright || '';
    setTile_bg(
        Windows.Storage.ApplicationData.current.localSettings.values["selectedStyle"],
        Windows.Storage.ApplicationData.current.localSettings.values["currentTileText0"],
        Windows.Storage.ApplicationData.current.localSettings.values["currentTileText1"],
        Windows.Storage.ApplicationData.current.localSettings.values["currentTileText2"],
        Windows.Storage.ApplicationData.current.localSettings.values["currentTileText3"],
        Windows.Storage.ApplicationData.current.localSettings.values["currentTileText4"]
        );
    console.log('磁贴数据设置成功！');
}

function setTile_bg(type, str0, str1, str2, str3, str4) {
    // 磁贴文本
    var tileTemplate = Windows.UI.Notifications.TileUpdateManager.getTemplateContent(
        Windows.UI.Notifications.TileTemplateType.tileWide310x150Text01
    );
    var tileTemplate1LineLarge = Windows.UI.Notifications.TileUpdateManager.getTemplateContent(
        Windows.UI.Notifications.TileTemplateType.tileWide310x150Text03
    );
    var tileTemplate1Line = Windows.UI.Notifications.TileUpdateManager.getTemplateContent(
        Windows.UI.Notifications.TileTemplateType.tileWide310x150Text04
    );
    var tileTemplate5Lines = Windows.UI.Notifications.TileUpdateManager.getTemplateContent(
            Windows.UI.Notifications.TileTemplateType.tileWide310x150Text05
        );
    var tileTemplate2Lines = Windows.UI.Notifications.TileUpdateManager.getTemplateContent(
            Windows.UI.Notifications.TileTemplateType.tileWide310x150Text09
        );

    var tileTextAttributes = tileTemplate.getElementsByTagName("text");
    tileTextAttributes[0].appendChild(tileTemplate.createTextNode(str0));
    tileTextAttributes[1].appendChild(tileTemplate.createTextNode(str1));
    tileTextAttributes[2].appendChild(tileTemplate.createTextNode(str2));
    tileTextAttributes[3].appendChild(tileTemplate.createTextNode(str3));
    tileTextAttributes[4].appendChild(tileTemplate.createTextNode(str4));

    var tileTextAttributes5Lines = tileTemplate5Lines.getElementsByTagName("text");
    tileTextAttributes5Lines[0].appendChild(tileTemplate5Lines.createTextNode(str0));
    tileTextAttributes5Lines[1].appendChild(tileTemplate5Lines.createTextNode(str1));
    tileTextAttributes5Lines[2].appendChild(tileTemplate5Lines.createTextNode(str2));
    tileTextAttributes5Lines[3].appendChild(tileTemplate5Lines.createTextNode(str3));
    tileTextAttributes5Lines[4].appendChild(tileTemplate5Lines.createTextNode(str4));

    var tileTextAttributes2Lines = tileTemplate2Lines.getElementsByTagName("text");
    tileTextAttributes2Lines[0].appendChild(tileTemplate2Lines.createTextNode(str0));
    tileTextAttributes2Lines[1].appendChild(tileTemplate2Lines.createTextNode(str1));

    var tileTextAttributes1LineLarge = tileTemplate1LineLarge.getElementsByTagName("text");
    tileTextAttributes1LineLarge[0].appendChild(tileTemplate1LineLarge.createTextNode(str0));

    var tileTextAttributes1Line = tileTemplate1Line.getElementsByTagName("text");
    tileTextAttributes1Line[0].appendChild(tileTemplate1Line.createTextNode(str0));


    // 创建磁贴通知并更新
    if (type === 1) {
        var tileNotification = new Windows.UI.Notifications.TileNotification(tileTemplate);
        Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);
    } else if (type === 5) {
        var tileNotification = new Windows.UI.Notifications.TileNotification(tileTemplate5Lines);
        Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);
    } else if (type === 9) {
        var tileNotification = new Windows.UI.Notifications.TileNotification(tileTemplate2Lines);
        Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);
    } else if (type === 3) {
        var tileNotification = new Windows.UI.Notifications.TileNotification(tileTemplate1LineLarge);
        Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);
    } else if (type === 4) {
        var tileNotification = new Windows.UI.Notifications.TileNotification(tileTemplate1Line);
        Windows.UI.Notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);
    }
}