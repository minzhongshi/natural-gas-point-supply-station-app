## empty 内容为空
> **组件名：leruge-empty

内容为空主要用于列表数据为空的时候提示。

### 安装方式

本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`。

### 基本用法

在 ``template`` 中使用组件

```html
<leruge-empty text="暂无数据" type="minus"></leruge-empty>
```


## API

### Badge Props

|属性名|类型|默认值|说明																																														|
|:-:|:-:|:-:|:-:|
|text|String|暂无数据|文字提示|
|type|String|minus|uni-icons图标|
|margin-top|Number|0|距离上一个元素距离|
|show|Boolean|true|是否显示|