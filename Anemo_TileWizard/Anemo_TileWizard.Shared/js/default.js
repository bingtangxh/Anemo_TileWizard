﻿// 有关“空白”模板的简介，请参阅以下文档:
// http://go.microsoft.com/fwlink/?LinkID=392286


var currentWallpaperIndex = 0; // 当前显示的图片索引
var images = []; // 存储所有图片元素
var imageData = []; // 存储所有图片数据

(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    
    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {

                // TODO: 此应用程序刚刚启动。在此处初始化
                //您的应用程序。
                // popup('您正在打开的是本程序的未完成版本，可能存在缺陷。\n如果你下载的来源仅有此版本，请留意有没有正式的版本发布。\nYou are now going to use a Pre-Release version. May contain mistakes.\nPlease pay attention to if the release version exists.');

            } else {
                // TODO: 此应用程序已挂起，然后终止。
                // 若要创造顺畅的用户体验，请在此处还原应用程序状态，使应用似乎永不停止运行。
            }

            // popup(localStorage.getItem("isWallpaperSubmissionEnabled") + ' ' + localStorage.getItem("isDescriptionCopyEnabledWhileSwitchingWallpaper"));

            getTile();

            if (isTodayThursday()) {
                updateBadge("50");
            } else {
                updateBadge("0");
            }

            //app.onsettings = function (e) {
            //    e.detail.applicationcommands = {
            //        "options": { href: "/options.html", title: "选项 Options" }
            //    };
            //    WinJS.UI.SettingsFlyout.populateSettings(e);
            //};

            var isWallpaperSubmissionEnabled_CheckBox = document.getElementById("isWallpaperSubmissionEnabled_CheckBox");
            var isDescriptionCopyEnabledWhileSwitchingWallpaper_CheckBox = document.getElementById("isDescriptionCopyEnabledWhileSwitchingWallpaper_CheckBox");
            var useEnglishDescription_CheckBox = document.getElementById("useEnglishDescription_CheckBox");

            isWallpaperSubmissionEnabled_CheckBox.checked = localStorage.getItem("isWallpaperSubmissionEnabled") === 'true';
            isDescriptionCopyEnabledWhileSwitchingWallpaper_CheckBox.checked = localStorage.getItem("isDescriptionCopyEnabledWhileSwitchingWallpaper") === 'true';
            useEnglishDescription_CheckBox.checked = localStorage.getItem("useEnglishDescription") === 'true';

            isWallpaperSubmissionEnabled_CheckBox.addEventListener("change", function (e) {
                localStorage.setItem("isWallpaperSubmissionEnabled", isWallpaperSubmissionEnabled_CheckBox.checked);
            });
            isDescriptionCopyEnabledWhileSwitchingWallpaper_CheckBox.addEventListener("change", function (e) {
                localStorage.setItem("isDescriptionCopyEnabledWhileSwitchingWallpaper", isDescriptionCopyEnabledWhileSwitchingWallpaper_CheckBox.checked);
            });
            useEnglishDescription_CheckBox.addEventListener("change", function (e) {
                localStorage.setItem("useEnglishDescription", useEnglishDescription_CheckBox.checked);
            });
            //document.getElementById("radioButton").addEventListener("click", function () {
            //});

            getBingWallpaper();

            saveandRestoreSelectedStyle();

            //if (isPhoneMode === false&&false) {
            //    document.getElementById("bar-to-show-appbar").addEventListener("click", function () {
            //        var appBar = document.getElementById("appBar").winControl;
            //        appBar.show();
            //    });
            //}

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

        localStorage.setItem("isWallpaperSubmissionEnabled", isWallpaperSubmissionEnabled_CheckBox.checked);
        localStorage.setItem("isDescriptionCopyEnabledWhileSwitchingWallpaper", isDescriptionCopyEnabledWhileSwitchingWallpaper_CheckBox.checked);
        localStorage.setItem("useEnglishDescription", useEnglishDescription_CheckBox.checked);



    };

    app.start();
})();

function popup(message) {
    Windows.UI.Popups.MessageDialog(message).showAsync();
}

// 更新徽章
function updateBadge(str) {
    var badgeTemplate = Windows.UI.Notifications.BadgeUpdateManager.getTemplateContent(
        Windows.UI.Notifications.BadgeTemplateType.badgeNumber
    );
    var badgeElement = badgeTemplate.selectSingleNode("/badge");
    badgeElement.setAttribute("value", str);
    var badgeNotification = new Windows.UI.Notifications.BadgeNotification(badgeTemplate);
    Windows.UI.Notifications.BadgeUpdateManager.createBadgeUpdaterForApplication().update(badgeNotification);
}

// 更新磁贴文本
function setTile(type, str0, str1, str2, str3, str4) {
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
    
    saveTile(str0, str1, str2, str3, str4);
}

function saveTile(str0, str1, str2, str3, str4) {
    // 将磁贴内容存储到 localStorage
    localStorage.setItem("currentTileText0", str0);
    localStorage.setItem("currentTileText1", str1);
    localStorage.setItem("currentTileText2", str2);
    localStorage.setItem("currentTileText3", str3);
    localStorage.setItem("currentTileText4", str4);
}

function getTile() {
    document.getElementById("tileDetail0").value = localStorage.getItem("currentTileText0") || '';
    document.getElementById("tileDetail1").value = localStorage.getItem("currentTileText1") || '';
    document.getElementById("tileDetail2").value = localStorage.getItem("currentTileText2") || '';
    document.getElementById("tileDetail3").value = localStorage.getItem("currentTileText3") || '';
    document.getElementById("tileDetail4").value = localStorage.getItem("currentTileText4") || '';
}

function updateTile(type) {
    
    var detailString0 = document.getElementById("tileDetail0").value;
    var detailString1 = document.getElementById("tileDetail1").value;
    var detailString2 = document.getElementById("tileDetail2").value;
    var detailString3 = document.getElementById("tileDetail3").value;
    var detailString4 = document.getElementById("tileDetail4").value;

    setTile(type, detailString0, detailString1, detailString2, detailString3, detailString4);

    popup("设置好了，现在锁屏看看效果吧！\n温馨提示：请先在“设置”中设置本程序为显示详细状态的应用，还需要允许本程序后台运行。\nUpdate tile done. You need also allow me running background and show details on lock screen.");   
}

function eraseInputBox() {
    document.getElementById("tileDetail0").value = "";
    document.getElementById("tileDetail1").value = "";
    document.getElementById("tileDetail2").value = "";
    document.getElementById("tileDetail3").value = "";
    document.getElementById("tileDetail4").value = "";
}

function about() {
    popup('Anemo TileWizard\n' +
'Copyright © 2025 BingtangXH\nSpecial Thanks to Zhilu \& Gxap\n' + 
'Porting to 移植到 6.2 AppModel x & 必应壁纸相关 Bing Wallpaper related are by Li_zip\n' +
'Call out appBar 唤出底栏 is by Angra\n' +
'Welcome 欢迎访问我的秘密基地 BingtangXH.moe')
    // 因为手机端用不了 Flyout ，只好弄成网页提醒了
}

function isTodayThursday() {
    return new Date().getDay() === 4; // 4代表星期四
}

// 获取当天所有Bing壁纸的函数
function getBingWallpaper() {
    // 首先检查网络状态
    var connectionProfile = Windows.Networking.Connectivity.NetworkInformation.getInternetConnectionProfile();

    if (connectionProfile && connectionProfile.getNetworkConnectivityLevel() ===
        Windows.Networking.Connectivity.NetworkConnectivityLevel.internetAccess) {
        // 有网络连接，尝试获取Bing壁纸
        var useEnglishDescription_CheckBox = document.getElementById("useEnglishDescription_CheckBox");
        var apiUrl;
        if (useEnglishDescription_CheckBox.checked) {
            apiUrl = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8&mkt=en-US'; // n=8 表示获取8张壁纸
        } else {
            apiUrl = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8&mkt=zh-CN'; // n=8 表示获取8张壁纸
        }
        // 使用传统的Promise错误处理方式
        WinJS.xhr({ url: apiUrl, timeout: 5000 }).then(
            function (response) {
                try {
                    var data = JSON.parse(response.responseText);
                    if (data.images && data.images.length > 0) {
                        imageData = data.images;
                        // popup(data.images[1].url + '\n' + apiUrl);
                        useLocalImage = false;
                        changeBackground(currentWallpaperIndex);
                        if (localStorage.getItem("isDescriptionCopyEnabledWhileSwitchingWallpaper") === 'true') {
                            copyDescription();
                        }
                        document.getElementById('prev-button').disabled = false;
                        document.getElementById('next-button').disabled = false;
                        if (isPhoneMode === false) {
                            document.getElementById('openinBrowser_Button').disabled = false;
                        }
                        return;
                    }
                } catch (e) {
                    console.error('解析Bing数据失败:', e);
                    useLocalImage = true;
                    useLocalBackground();
                    popup('解析数据失败，已经调用默认的背景，无法设置为锁屏壁纸，也不能复制描述。\nAnalyzing data from Bing failed.');
                }
            },
            function (error) { // 这是Promise的reject处理函数
                console.error('获取Bing壁纸失败:', error);
                popup('获取数据失败，已经调用默认的背景，无法设置为锁屏壁纸，也不能复制描述。\nGetting data from Bing failed.');
                useLocalImage = true;
                useLocalBackground();
            }
        );
        
    } else {
        // 无网络连接，直接使用本地图片
        popup('没有互联网连接，已经调用默认的背景，无法设置为锁屏壁纸，也不能复制描述。\nSeems like there is no Internet connection, obtaining wallpaper failed.');
        console.log('无网络连接，使用本地图片');
        useLocalImage = true;
        useLocalBackground();
    }
}

function getBingWallpaper_old() {
    var useEnglishDescription_CheckBox = document.getElementById("useEnglishDescription_CheckBox");
    var apiUrl;
    if (useEnglishDescription_CheckBox.checked) {
        apiUrl = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8&mkt=en-US'; // n=8 表示获取8张壁纸
    } else {
        apiUrl = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8&mkt=zh-CN'; // n=8 表示获取8张壁纸
    }
    // 显示进度条
    var progressRing = document.querySelector('.progress-ring').winControl;
    //progressRing.start();

    // 发起API请求
    WinJS.xhr({ url: apiUrl })
        .then(function (response) {
            var data = JSON.parse(response.responseText);
            imageData = data.images; // 获取所有壁纸数据
            

            // 遍历所有壁纸并创建图片元素
            for (var i = 0; i < imageData.length; i++) {
                var imageUrl = 'https://www.bing.com' + imageData[i].url;
                var imageElement = document.createElement('img');
                imageElement.src = imageUrl;
                imageElement.alt = imageData[i].copyright;
                images.push(imageElement); // 将图片元素存入数组
            }

            // 显示第一张图片
            if (images.length > 0) {
                images[currentWallpaperIndex].classList.add('active');
            }

            // 启用切换按钮和保存按钮
            /*document.getElementById('save-button').disabled = false;
            document.getElementById('set-lock-screen-button').disabled = false;
            //document.getElementById('set-tile-button').disabled = false;*/
        })
    /*.catch(function (error) {
        console.error('获取Bing壁纸失败:', error);
        document.getElementById('slideshow-container').innerHTML = '<p>无法加载Bing壁纸，请稍后再试。</p>';
    })
    .done(function () {
        // 隐藏进度条
        progressRing.stop();
    })*/;
}

// 这个函数在获取失败时被调用
function useLocalBackground() {
    document.getElementById('background-container').style.backgroundImage =
        'url("images/PNG5231.png")';
    document.getElementById('prev-button').disabled = true;
    document.getElementById('next-button').disabled = true;
    if (isPhoneMode === false) {
        document.getElementById('openinBrowser_Button').disabled = true;
        document.getElementById('wallpaper-info').style.display = 'block';
        document.getElementById('wallpaper-copyright').textContent = '无网络连接\n No Internet Connection.';
        document.getElementById('current-wallpaper-index').textContent = '0/0';
    }

}

// 切换背景图片
function changeBackground(index) {
    if (imageData.length > 0 && index >= 0 && index < imageData.length) {
        var imageUrl = 'https://www.bing.com' + imageData[index].url;
        document.getElementById('background-container').style.backgroundImage =
            'url("' + imageUrl + '")';
        if (isPhoneMode === false) {
            document.getElementById('current-wallpaper-index').textContent = (imageData.length - index) + '/' + imageData.length;
            showWallpaperInfo(index);
        }
    } else {
        popup('imageData.length 为 0 或 index 已经超出边界');
        return;
    }
}

// 切换图片的函数 （似乎用不到）
function showImage(index) {
    if (index < 0 || index >= images.length) {
        popup('index 已经超出边界');
        return;
    }

    // 隐藏当前图片
    images[currentWallpaperIndex].classList.remove('active');

    // 更新索引并显示新图片
    currentWallpaperIndex = index;
    images[currentWallpaperIndex].classList.add('active');
}

// 设置动态磁贴的函数 （似乎用不到）
function setTileNotification() {
    if (imageData.length === 0) {
        popup('imageData.length 为 0');
    }

    // 获取磁贴管理器
    var tileManager = Windows.UI.Notifications.TileUpdateManager;
    var tileTemplate = tileManager.getTemplateContent(Windows.UI.Notifications.TileTemplateType.tileWideImage);

    // 设置磁贴内容
    var imageElements = tileTemplate.getElementsByTagName("image");
    imageElements[0].setAttribute("src", 'https://www.bing.com' + imageData[currentWallpaperIndex].url);

    // 创建磁贴通知
    var tileNotification = new Windows.UI.Notifications.TileNotification(tileTemplate);

    // 更新磁贴
    tileManager.createTileUpdaterForApplication().update(tileNotification);

    // 循环更新磁贴
    /*var interval = 5000; // 5秒切换一次
    setInterval(function () {
        currentWallpaperIndex = (currentWallpaperIndex + 1) % imageData.length;
        imageElements[0].setAttribute("src", 'https://www.bing.com' + imageData[currentWallpaperIndex].url);
        tileManager.createTileUpdaterForApplication().update(tileNotification);
    }, interval);*/
}

// 下载图片到本地的函数
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

// 明天的壁纸
function nextWallpaper() {
    currentWallpaperIndex = (currentWallpaperIndex - 1 + imageData.length) % imageData.length;
    changeBackground(currentWallpaperIndex);
    var isDescriptionCopyEnabledWhileSwitchingWallpaper_CheckBox = document.getElementById("isDescriptionCopyEnabledWhileSwitchingWallpaper_CheckBox");
    if (isDescriptionCopyEnabledWhileSwitchingWallpaper_CheckBox.checked) {
        //document.getElementById("tileDetail0").value = imageData[currentWallpaperIndex].title || '';
        //document.getElementById("tileDetail1").value = imageData[currentWallpaperIndex].copyright || '';
        copyDescription();
    }
}

// 昨天的壁纸
function prevWallpaper() {
    currentWallpaperIndex = (currentWallpaperIndex + 1) % imageData.length;
    changeBackground(currentWallpaperIndex);
    var isDescriptionCopyEnabledWhileSwitchingWallpaper_CheckBox = document.getElementById("isDescriptionCopyEnabledWhileSwitchingWallpaper_CheckBox");
    if (isDescriptionCopyEnabledWhileSwitchingWallpaper_CheckBox.checked) {
        //document.getElementById("tileDetail0").value = imageData[currentWallpaperIndex].title || '';
        //document.getElementById("tileDetail1").value = imageData[currentWallpaperIndex].copyright || '';
        copyDescription();
    }
}

function copyDescription() {
    if (imageData.length === 0) {
        // popup('imageData.length 为 0');
        return;
    }
    document.getElementById("tileDetail0").value = imageData[currentWallpaperIndex].title || '';
    document.getElementById("tileDetail1").value = imageData[currentWallpaperIndex].copyright || '';
}

