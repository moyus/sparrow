#命名原则
Sparrow的CSS命名规则参考众多社区中现有的成果，经过筛选组合而成。其主要目的是为了增强代码的*可读性*、*维护性*、*健硕性*、*规范性*。使所有人书写*统一*的代码样式，并提高代码的健康度。

##目录
- Namespaces
- Layouts
	- l-layoutName
- Elements
- Components
	- ComponentName
	- ComponentName--modifierName
	- ComponentName__descendantName
	- ComponentName.{is, has}-stateOfComponent
	- ComponentName-wrapperName
- Utilities
	- u-utilityName-otherName

##命名空间
  - `l-`:布局命名空间。所有项目基本都会使用到类似栅格、水平/垂直对齐这样基本的布局方式，而且针对单个项目还有自己的通用页面局：比如两栏左右布局、导航栏、页脚。这些元素的共通性就是都是属于页面布局，只规定不同区域的大小尺寸，而不做更多的样式配色。这就是其所属的布局命名空间。
  - `is-, has-`:状态命名空间。此命名空间一般会与某个元素或组件同时使用，禁止出现全局css类，避免污染元素样式。其主要表征一个元素处于不同的状态，并在此状态下会有一些微小的样式改变。
  - `js-`:JavaScript动作命名空间。表征一个元素会有一些JavaScript动作脚本会应用在其上，而且脚本代码一般也是通过此css类来查询元素。
  - `u-`:辅助类命名空间。所有强制复写元素局部样式的辅助类都归属此命名空间。

##布局
```
<div class="l-row">
	<div class="l-col-3">…</div>
	<div class="l-col-3">…</div>
	…
</div>
```

##一般元素
一般元素是前端通用的层次结构相对简单的原件，类似按钮、表单输入框，及其相互间的组合。采用BEM命名方式

###HTML示例
```
<a class=“btn btn—primary”>点击下载</>
```

##组件
组件一般是*可复用*的且层次结构相对较多的HTML标签组合。采用BEM命名方式，各名称采用骆驼峰书写规则。组件首字母大写，修饰符/后代/容器均首字母小写。并且组件后代嵌套元素不超过3层。如果组件结果很复杂，可以拆分成更小的组件进行组合，务必要保证组件结构的清晰度。

###CSS结构
```
// Block
.Card {/*…*/}

// Elements
.Card__header{/*…*/}
…

// Modifers
.Card—borderd .Card__header {/*…*/}
```
###HTML结构
```
<div class="Card Card—borderd">
	<header class="Card__header">
		<h3 class="Card__title">…</h3>
		…
	</header>
	<div class="Card__body">
		…
	</div>
	<footer class="Card__footer">
		…
	</footer>
</div>
```

##辅助类
格式：`.u-utilityName-otherNames`
辅助类的名称均采用首字母小写的骆驼峰形式，词组之间用`-`分割，这样更容易区分属性与值。辅助类的主要作用是根据页面布局的具体要求，对元素或组件进行一些细节性的样式调整，这样能避免重复性的手写CSS样式去强制修改。

###HTML示例
```
<div class=“u-clearfix”>
	<div class=“u-pullLeft”>
		<a class=“btn u-bg-green”>Download</a>
	</div>
</div>
```

##参考文献
- BEM 101: [https://css-tricks.com/bem-101/](https://css-tricks.com/bem-101/)
- BEMIT: [http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/)
- SMACSS: [https://smacss.com/](https://smacss.com/)
- SUIT CSS naming conventions: [https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md)
- More Transparent UI Code with Namespaces: [http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)
- css{guide: lines;}: [http://cssguidelin.es/](http://cssguidelin.es/)
