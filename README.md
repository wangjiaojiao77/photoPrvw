# photoPrvw
JS实现照片预览功能

借助插件：Swiper

主要代码：
```
mySwiper = new Swiper('.swiper-container', {
		observer: true, //启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
		observeParents: true //将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。
});
```
