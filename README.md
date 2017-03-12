Sparrow是一款针对移动web app开发的前端轻量级框架。

##安装
运行以下命令进行编译程序，将会自动生成`app`目录(参考演示)。Sparrow编译的所需静态资源均在`app/assets`目录下。
```
npm run build
```

如果你想开启本地即时编译及预览开发环境，运行以下命令即可当文件发生变化时自动编译更新演示。
```
npm run dev
```

##演示
[https://moyus.github.io/sparrow](https://moyus.github.io/sparrow)

##UI库
- 布局
	- 栅格
- 常规元素
  - 按钮
  - 表单
  - 进度条
  - 图标
  - 正文排版
  - 辅助类
- 组件
	- 布告框
	- 操作信息
	- 卡片
	- 列表
	- 导航
	- 导航条
	- 菜单栏
	- 进度条
	- 评论列表
	- 选项卡切换 - (js)
	- 模态窗口 - (js)
	- 确认窗口 - (js)
	- 消息提示 - (js)

##文档
- [命名规范](https://github.com/moyus/sparrow/blob/master/doc/naming-conventions.md)
- [JavaScript组件使用文档](https://github.com/moyus/sparrow/blob/master/doc/javascript.md)

##第三方依赖库
- [Zepto](http://zeptojs.com)
  Sparrow内置的js相关组件依赖于Zepto库进行执行，而且需要其中的fx, fx_methods, data模块。因为Zepto官方默认脚本文件并不自带这些模块，而且ie模块并无必要，所以针对本框架我们自行编译了一份自定义的Zepto库，所以请在项目中引入我们已编译好的自定义版本Zepto文件。
- [FastClick](https://github.com/ftlabs/fastclick)
  移动端页面默认会有300ms点击延迟，这非常影响体检，而且也无法触发元素的active状态。为此需要引入FastClick第三方库来解决这个问题。本框架并未自带此库，需要用户自行下载并引入使用。
