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
                popup('您正在打开的是本程序的未完成版本，可能存在缺陷。\n如果你下载的来源仅有此版本，请留意有没有正式的版本发布。\nYou are now going to use a Pre-Release version. May contain mistakes.\nPlease pay attention to if the release version exists.');
                getTile();


                if (isTodayThursday()) {
                    updateBadge("50");
                } else {
                    updateBadge("0");
                }

                getBingWallpaper();

                WinJS.Application.onmainwindowactivated = function (e) {
                    if (e.detail.kind === Windows.ApplicationModel.Activation.ActivationKind.launch) {
                        var appBar = document.getElementById("appBar").winControl;
                        // appBar.sticky = true;
                    }
                    
                };

                document.getElementById("come_out").addEventListener("click", function () {
                    var appBar = document.getElementById("appBar").winControl;
                    appBar.show();
                });

                //document.addEventListener("DOMContentLoaded", function () {
                //  var appBar = document.getElementById("appBar").winControl;

                //});

                document.getElementById("radioButton").addEventListener("click", function () {
                    var radioFlyout = document.getElementById("radioFlyout").winControl;
                    var savedValue = localStorage.getItem("selectedStyle"); // WinJS.Application.localSettings.values["selectedOption"];
                    if (savedValue) {
                        document.querySelector('input[value="' + savedValue + '"]').checked = true;
                    } else {
                        document.querySelector('input[value="1"]').checked = true;
                    }
                    radioFlyout.show(this);
                });

                WinJS.Utilities.query('input[name="group1"]').listen('change', function (e) {
                    var selectedStyle = document.querySelector('input[name="group1"]:checked').value;
                    localStorage.setItem("selectedStyle", selectedStyle);
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

function updateTile() {
    const radios = document.getElementsByName('style');
    let selectedValue;

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            selectedValue = radios[i].value;
            break;
        }
    }
    var type = Number(selectedValue);
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
    popup('Anemo TileWizard\nCopyright © 2025 BingtangXH\nSpecial Thanks to Zhilu \& Gxap\nPorting to 移植到 6.2 AppModel x is by Li_zip\nWelcome 欢迎访问我的秘密基地 BingtangXH.moe')
}

function isTodayThursday() {

    return new Date().getDay() === 4; // 4代表星期四

}

var currentIndex = 0; // 当前显示的图片索引
var images = []; // 存储所有图片元素
var imagesData = []; // 存储所有图片数据

// 获取当天所有Bing壁纸的函数
function getBingWallpaper() {
    var apiUrl = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=8&mkt=zh-CN'; // n=8 表示获取8张壁纸

    // 显示进度条
    var progressRing = document.querySelector('.progress-ring').winControl;
    //progressRing.start();

    // 发起API请求
    WinJS.xhr({ url: apiUrl })
        .then(function (response) {
            var data = JSON.parse(response.responseText);
            imagesData = data.images; // 获取所有壁纸数据
            var slideshowContainer = document.getElementById('slideshow-container');

            // 清空加载提示
            slideshowContainer.innerHTML = '';

            // 遍历所有壁纸并创建图片元素
            for (var i = 0; i < imagesData.length; i++) {
                var imageUrl = 'https://www.bing.com' + imagesData[i].url;
                var imageElement = document.createElement('img');
                imageElement.src = imageUrl;
                imageElement.alt = imagesData[i].copyright;
                slideshowContainer.appendChild(imageElement);
                images.push(imageElement); // 将图片元素存入数组
            }

            // 显示第一张图片
            if (images.length > 0) {
                images[currentIndex].classList.add('active');
            }

            // 启用切换按钮和保存按钮
            document.getElementById('prev-button').disabled = false;
            document.getElementById('next-button').disabled = false;
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

// 切换图片的函数
function showImage(index) {
    if (index < 0 || index >= images.length) return; // 边界检查

    // 隐藏当前图片
    images[currentIndex].classList.remove('active');

    // 更新索引并显示新图片
    currentIndex = index;
    images[currentIndex].classList.add('active');
}

// 保存图片的函数
function saveImage() {
    if (imagesData.length === 0) return;

    // 获取当前图片的URL
    var imageUrl = 'https://www.bing.com' + imagesData[currentIndex].url;

    // 创建一个隐藏的<a>标签用于触发下载
    var link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'bing-wallpaper-' + currentIndex + '.jpg'; // 设置下载文件名
    document.body.appendChild(link);
    link.click(); // 触发下载
    document.body.removeChild(link); // 移除<a>标签
}

// 设置为锁屏背景的函数
function setLockScreenBackground() {
    if (imagesData.length === 0) return;

    // 获取当前图片的URL
    var imageUrl = 'https://www.bing.com' + imagesData[currentIndex].url;

    // 下载图片到本地
    downloadImageToLocal(imageUrl)
        .then(function (file) {
            // 设置为锁屏背景
            return Windows.System.UserProfile.LockScreen.setImageFileAsync(file);
        })
        .then(function () {
            console.log('锁屏背景设置成功！');
        })
    /*.catch(function (error) {
        console.error('设置锁屏背景失败:', error);
    })*/;
}

// 设置动态磁贴的函数
function setTileNotification() {
    if (imagesData.length === 0) return;

    // 获取磁贴管理器
    var tileManager = Windows.UI.Notifications.TileUpdateManager;
    var tileTemplate = tileManager.getTemplateContent(Windows.UI.Notifications.TileTemplateType.tileWideImage);

    // 设置磁贴内容
    var imageElements = tileTemplate.getElementsByTagName("image");
    imageElements[0].setAttribute("src", 'https://www.bing.com' + imagesData[currentIndex].url);

    // 创建磁贴通知
    var tileNotification = new Windows.UI.Notifications.TileNotification(tileTemplate);

    // 更新磁贴
    tileManager.createTileUpdaterForApplication().update(tileNotification);

    // 循环更新磁贴
    /*var interval = 5000; // 5秒切换一次
    setInterval(function () {
        currentIndex = (currentIndex + 1) % imagesData.length;
        imageElements[0].setAttribute("src", 'https://www.bing.com' + imagesData[currentIndex].url);
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

function prev_wp() {
    var newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = images.length - 1; // 循环到最后一张
    showImage(newIndex);
}

function next_wp() {
    var newIndex = currentIndex + 1;
    if (newIndex >= images.length) newIndex = 0; // 循环到第一张
    showImage(newIndex);
}
