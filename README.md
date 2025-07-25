# Anemo LockWizard

Anemo LockWizard 是一个能将自定义的文本显示在 Windows 锁屏界面上的程序，使用 WinJS 编写，支持如下操作系统：

- Windows 8.1
- Windows RT 8.1
- Windows Phone 8.1
- Windows 10
- Windows 11
- Windows 10 Mobile

~尚不支持 Andromeda 或 Windows 10X。~

# 安装方法

## ~从商店安装~

（不存在的）

## 本地侧载安装

### Windows 8.1 和 Windows RT 8.1

1. *第 2~13 步为开启侧载和获取开发者证书，如你的系统已经开启侧载，可直接跳过*

2. 下载[8.1lob_withbundleassoc.zip](https://www.bingtangxh.moe/woa32/8.1lob_withbundleassoc.zip)，将其解压缩。

3. 解压缩*8.1lob_withbundleassoc.zip*，然后你会看到形似 *\*_LOB_APPX* 的三个文件夹和一个叫*Win8一键安装appx_带捆绑包关联.reg*的文件。

4. 根据你的操作系统架构，选取对应的文件夹。

5. 先将*C:\Windows\Branding\Basebrd\basebrd.dll*备份，然后将压缩包解压出来的 basebrd.dll，替换*C:\Windows\Branding\Basebrd\basebrd.dll*。

<details>
  <summary>如果提示“你需要权限才能进行此操作”而你又不会编辑权限，请展开并照做</summary>

1. 将*C:\Windows\Branding\Basebrd\basebrd.dll*右键→属性，切换到“安全”选项卡，再单击下方的“高级(&V)”按钮。

2. 在弹出的“basebrd.dll的高级安全设置”窗口的顶部，你会看到“所有者： TrustedInstaller”，单击右边的“更改(&C)”。

3. 在弹出的“选择用户和组”对话框当中，单击底部的“高级(&A)...”按钮。

4. 单击“立即查找(&N)”，然后在底部的查找结果当中选择“Users”，然后单击“确定”。

5. 在回到“选择用户和组”对话框后，你会看到“输入要选择的对象名称(例如)(&E):”多出了一个带下划线的名称。继续单击“确定”。

6. 回到“basebrd.dll的高级安全设置”，再单击“确定”。（如果你的屏幕太小，点不到“确定”，就调出触摸键盘，按一下回车键）

7. 回到“basebrd.dll 属性”，单击“编辑(&E)”。

8. 在“basebrd.dll 权限”中，找到“组或用户名:”下的“Users”，然后勾选“完全控制”“允许”对应的复选框。

9. 单击“确定”，然后会出现“要继续吗？”对话框，单击“是(&Y)”。

10. 再单击“确定”，现在你会发现 basebrd.dll 已经可以替换覆盖了。

11. 如果你发现仍然有弹窗提示，那么请瞪大你的眼睛：刚才的弹窗是“你需要权限”，下方的按钮只有“重试”和“取消”，而此刻的弹窗应该是“你需要提供管理员权限”，下方你已经可以单击“继续”按钮了。

</details>

6. 注意，如果不是 Windows RT 8.1，那么不要整个删除 *tokens* 文件夹，而是将 *C:\Windows\System32\spp\tokens\skus* 内的一个文件夹（一般出厂预装的系统会是 *CoreCountrySpecific*）将其备份，然后从原地删除 ，再将 *EmbeddedIndustryE* 这个文件夹放进 *skus* 文件夹内。
如果是 Windows RT 8.1，那么将 *C:\Windows\System32\spp\tokens* 文件夹整个删除，将解压缩出来的 tokens 文件夹替换上去。


<details>
  <summary>编辑权限的时候要注意，如果你刚才才照着改的 basebard.dll 的权限，那么这次是文件夹，请展开查看</summary>

1. 更改所有者的时候，你会发现，原先的所有者并不是 *TrustedInstaller* ，而是 *SYSTEM* 。

2. 更改完了之后，会有一个“替换子容器和对象的所有者”，务必勾上。

3. 最后改完了权限之后，还需要点开一下“高级(&V)”，打开高级安全设置，然后单击“更改权限”，再勾上底部的“使用可从此对象继承的权限项目替换所有子对象的权限项目(&P)”。

4. 最后单击“确定”→会出现弹窗，单击“是”→还是弹窗，再单击“是”→高级安全设置关掉了，在属性窗口里单击“确定”

</details>

7. 然后右键*a.bat*，以管理员身份运行。会出现一个巨大的窗口，先关掉黑色的命令提示符窗口，再关闭这个巨大的窗口。

8. 重启电脑。

9. 再次开机后，务必连接到互联网。

10. 右键 *a.bat* ，以管理员身份运行（这是第二次）。还是会出现一个巨大的窗口，但是这次只关掉巨大的窗口，不要关闭黑色的命令提示符窗口。

11. 然后会依次出现“成功地安装了产品密钥”“密钥管理服务计算机名称成功地设置为”“成功地激活了产品”，都单击“确定”。

12. 然后双击导入*gpedit_Appx.reg*和*Win8一键安装appx_带捆绑包关联.reg*。

13. 再次重启。现在你的系统已经开启侧载了，可以自由安装 Appx 应用了，但是不一定有开发者许可证，也就是不一定可以进行开发、调试。

-  打开 PowerShell ，输入 Get-WindowsDeveloperLicense，回车查看是否有开发者许可证。
-  （如果你不是开发者，不需要进行开发调试应用，只想不走商店安装 Appx ，那么只开启侧载就可以，而开发者许可证即使没有，也没关系）
-  如果你确实需要开发者许可证，就比较麻烦了，先确保你导入了注册表文件，然后建议先管理员身份 slmgr.vbs -upk，然后重启，重新以管理员身份运行 a.bat 再试。

14. 前往[Release](https://github.com/bingtangxh/Anemo_TileWizard/releases/)下载最新版本的压缩包文件，并解压缩。

15. 双击解压出来的 .cer 文件，依次单击“安装证书”→“本地计算机”→“下一步”→“将所有的证书都放入下列存储”→“浏览”→“受信任的根证书颁发机构”→“下一步”→“完成”，然后应该会导入成功。

16. 打开*Dependencies*文件夹，双击安装*Microsoft.WinJS.2.0.appx*。
   
    - （如果你跳过了第 12 步的注册表文件导入，那么你需要使用 PowerShell 指令 *Add-AppxPackage Microsoft.WinJS.2.0.appx* 来安装）

19. 回到上一层文件夹，双击安装*Anemo_LockWizard.Windows_\*_AnyCPU.appx*。

20. 打开电脑设置，点击“锁屏界面”，然后在“选择显示详细状态的应用”这里选择我的*Anemo LockWizard*。

21. 现在你可以在开始屏幕中打开 Anemo LockWizard，然后设置你的自定义文本了，设置完成后，从底部滑动唤出底栏，然后点击“提交 Sbmt.”。

### Windows 10 和 Windows 11

1. 打开“设置”，然后搜索“面向开发人员”，再启用开发人员模式。

2. 前往[Release](https://github.com/bingtangxh/Anemo_TileWizard/releases/)下载最新版本的压缩包文件，并解压缩。

3. 双击解压出来的 .cer 文件，依次单击“安装证书”→“本地计算机”→“下一步”→“将所有的证书都放入下列存储”→“浏览”→“受信任的根证书颁发机构”→“下一步”→“完成”，然后应该会导入成功。

4. 打开*Dependencies*文件夹，双击安装*Microsoft.WinJS.2.0.appx*。

5. 回到上一层文件夹，双击安装*Anemo_LockWizard.Windows_\*_AnyCPU.appx*。

6. 再打开“设置”，点击“个性化”→“锁屏界面”，然后在“选择显示详细状态的应用”这里选择我的*Anemo LockWizard*。

7. 现在你可以在开始菜单中打开 Anemo LockWizard，然后设置你的自定义文本了，设置完成后，点击左上角，然后点击“应用命令”，然后点击“提交 Sbmt.”。

### Windows Phone 8.1

1. 你需要在电脑上安装 Visual Studio 2015 Community，并勾选安装组件 Windows Phone SDK 8.1。

2. 你还需要将你的手机解锁大容量模式和解锁开发人员。

3. 用电脑前往[Release](https://github.com/bingtangxh/Anemo_TileWizard/releases/)下载最新版本的压缩包文件，并解压缩。

4. 将手机正常开机，解除锁屏，连接到电脑，在电脑上打开开始菜单或开始屏幕，然后在 Windows Phone SDK 8.1 文件夹中找到 *Windows Phone Application Deployment 8.1*，打开它。

5. 在该程序的窗口中，浏览解压缩出来的*Anemo_LockWizard.WindowsPhone_\*_AnyCPU.appx*文件，然后单击“部署”。

6. 打开“设置”，点击“锁屏界面”，然后在“选择显示详细状态的应用”这里选择我的*Anemo LockWizard*。

7. 现在你可以在开始屏幕中打开 Anemo LockWizard，然后设置你的自定义文本了，设置完成后，点击底部的“提交 Sbmt.”。

### Windows 10 Mobile（有应用安装程序，需要 1607 或以上版本）

1. 先打开“设置”→“更新与安全”→“面向开发人员”，打开开发人员模式。

2. 下载[应用安装程序](https://www.bingtangxh.moe/woa32/appinstaller.appxbundle)，在文件资源管理器中将其安装，然后稍等一会。

3. 用电脑前往[Release](https://github.com/bingtangxh/Anemo_TileWizard/releases/)下载最新版本的压缩包文件，并解压缩。还需要在仓库中单独下载 .cer 证书文件。

4. 将 .cer 证书文件、应用的 Appx 文件本体*Anemo_LockWizard.WindowsPhone_\*_AnyCPU.appx*，还有*Dependencies*文件夹中的*Microsoft.Phone.WinJS.2.1.appx*都复制到手机上。

5. 在手机上打开文件资源管理器，浏览并打开 .cer 证书文件，然后导入证书。

6. 在手机上安装*Microsoft.Phone.WinJS.2.1.appx*，打开方式选择“应用安装程序”。

7. 在手机上安装我的软件 Appx 包本体*Anemo_LockWizard.WindowsPhone_\*_AnyCPU.appx*，打开方式还是选择“应用安装程序”。

8. 再打开“设置”，点击“个性化”→“锁屏界面”，然后在“选择显示详细状态的应用”这里选择我的*Anemo LockWizard*。

9. 现在你可以在开始屏幕中打开 Anemo LockWizard，然后设置你的自定义文本了，设置完成后，点击底部的“提交 Sbmt.”。

### Windows 10 Mobile（无应用安装程序）

1. 你需要在电脑上安装 Visual Studio 2015 Community，并勾选安装组件 Windows Phone SDK 8.1。

2. 在手机上打开“设置”→“更新与安全”→“面向开发人员”，打开开发人员模式。
  
3. 用电脑前往[Release](https://github.com/bingtangxh/Anemo_TileWizard/releases/)下载最新版本的压缩包文件，并解压缩。

4. 将手机正常开机，解除锁屏，连接到电脑，在电脑上打开开始菜单或开始屏幕，然后在 Windows Phone SDK 8.1 文件夹中找到 *Windows Phone Application Deployment 8.1*，打开它。

5. 在该程序的窗口中，浏览解压缩出来的*Anemo_LockWizard.WindowsPhone_\*_AnyCPU.appx*文件，然后单击“部署”。

6. 打开“设置”，点击“锁屏界面”，然后在“选择显示详细状态的应用”这里选择我的*Anemo LockWizard*。

7. 现在你可以在开始屏幕中打开 Anemo LockWizard，然后设置你的自定义文本了，设置完成后，点击底部的“提交 Sbmt.”。
