#JavaScirpt组件使用方法

##Modal
模态窗口自带了4种修饰符类，分别代表4中不同的弹窗样式：
- Modal—default
- Modal—top
- Modal—bottom
- Modal—full

###HTML结构
```
<div id=“exampleModal” class=“Modal Modal—default”>
	<div class=“Modal__body”>
		<header class=“Modal__header”>
			<h4 class=“Modal__title”>弹窗标题</header>
		</header>
		<div class=“Modal__content”>
			自定义内容
			…
		</div>
		<footer class=“Modal__footer”>
			<a role=“button” class=“Modal__btn” data-dismiss=“modal”>取消</a>
			<a role=“button” class=“Modal__btn”>确认</a>
		</footer>
	</div>
</div>
```

若需要在页面里使用此组件，类似上面的HTML代码必须也一同写在同一个页面里，这样才能调用到对应的模态窗口。
直接在HTML按钮标签上配置弹窗参数，这样不用写一行代码，一样能点击按钮显示弹窗。标签属性上务必需要加上`data-toogle="modal"`属性及其目标窗口的ID属性`data-target="#exampleModal"`。
```
<button type=“button” data-target=“#exampleModal” data-toggle=“modal”>开启演示弹窗</button>
```

**调用代码**
若需要在代码中调用模态窗口，则如下示例:
```
$(‘#exampleModal’).modal({
  backdrop: true,
	show: false
});
```
###选项参数
| 参数     	| 类型    	| 默认值 	| 描述                           	|
|----------	|---------	|--------	|--------------------------------	|
| backdrop 	| boolean 	| true   	| 是否显示减淡背景元素           	|
| show     	| boolean 	| true   	| 初始化模态窗口后，是否自动显示 	|

###方法
| 方法名                 | 描述                               |
|------------------------|------------------------------------|
| .modal(‘toggle’)       | 自动翻转当前状态                   |
| .modal(‘show’)         | 显示模态窗口                       |
| .modal(‘hide’)         | 隐藏模态窗口                       |

##Notify
信息提示组件，类似iOS里的内容加载中弹出来的黑色方框提示信息。

###HTML结构
```
<div class=“Notify …”>
	<div class=“Notify__content”>
		// 下面是图标
		<i class=“Notify__icon …”></i>
		<div class=“Notify__text”>…</div>
	</div>
</div>
```

以上代码只是为了说明组件内容的默认代码结构，不需要写在页面里。代码调用的时候，会自动插入对应的HTML代码，并在隐藏后也会自动删除的。


###调用代码
```
var hint = notify({
	show: true,
	text: ‘载入中’,
	type: ‘loading’,
	size: ‘lg’,
	timer: 0,
	icon: ‘’
});

// 此处可以用代码来操控的
setTimeout(function () {
	hint.hide();
}, 5000);

```
###选项
| 参数  	| 类型    	| 默认值  	| 描述                                                                                   |
|-------	|---------	|---------	|--------------------------------------------------------------------------------------	 |
| show  	| boolean 	| true    	| 初始化后，是否自动显示                                                                 |
| text  	| string  	| Loading 	| 需要显示的文字信息                                                                     |
| type  	| string  	| null    	| 提示信息的类型，不同的类型会显示不同的图标。可选值：loading, danger, success, custom   |
| size  	| string  	| null    	| 提示信息的大小，可选值为空或者lg                                                       |
| timer 	| number  	| 2000    	| 定时自我隐藏销毁，单位是毫秒，默认2000。如果设置为0则一直显示，知道代码手动调用隐藏方法|
| icon  	| string  	| null    	| 只有当type属性设置为custom时候，此参数才有效，可以自定义图标HTML代码                   |

如果初始化信息提示的时候配置了`timer`为`0`，那么就可以通过以下方法控制返回的对象。
```
hint.hide()
```

###方法
| 方法名                 | 描述                               |
|------------------------|------------------------------------|
| .show()                | 显示信息提示                       |
| .hide()                | 隐藏并销毁信息提示                 |
| .toggle()              | 自动翻转当前显示状态               |

##SmartAlert
确认窗口组件是默认的alert的替代品，提供更友好的UI效果。
此组件采用modal的HTML结构与样式的，但代码是独立的一套，与modal的代码不冲突。

**调用代码**
```
//调用函数smartAlert可以用简写的sal代替，回调函数可以省略不写
var killAlert = smartAlert({
	show: false,
	title: ‘警告’,
	text: ‘你确认要删除此记录吗？’,
	showCancelBtn: true,
	cancelBtnText: ‘算球了’,
	confirmBtnText: ‘弄死’
}, function (isComfirm) {
	//…
});
//killAlert.show();
```

###选项
| 参数           	| 类型    	| 默认值 	| 描述                               	|
|----------------	|---------	|--------	|------------------------------------	|
| show           	| boolean 	| true   	| 初始化后，是否自动显示             	|
| title          	| string  	| null   	| 警告框标题                         	|
| text           	| string  	| null   	| 警告框文字信息                     	|
| showCancelBtn  	| boolean 	| false  	| 是否显示取消按钮                   	|
| cancelBtnText  	| string  	| 取消   	| 如果显示取消按钮，则取消按钮的文字 	|
| confirmBtnText 	| string  	| 确认   	| 确认按钮的文字                     	|

###方法
smartAlert会返回一个对象供额外操作。
```
killAlert.hide()
```
| 方法名                 | 描述                                |
|------------------------|------------------------------------|
| .show()                | 显示警告提示                          |
| .hide()                | 隐藏并销毁警告提示                      |
| .toggle()              | 自动翻转当前显示状态                    |

##Tab
标签面板切换组件，常用来在一个页面里有限的空间切换不同的内容显示。在这里用导航菜单来做切换效果演示。

###HTML结构
```
<ul class=“Nav Nav—tabs” data-group=“tab”>
	<li class=“Nav__item”>
		<a href=“#panel-1” class=“Nav__link is-active” data-toggle=“tab”>概要</a>
	</li>
	<li class=“Nav__item”>
		<a href=“#panel-2” class=“Nav__link” data-toggle=“tab”>参数</a>
	</li>
	<li class=“Nav__item”>
		<a href=“#panel-3” class=“Nav__link” data-toggle=“tab”>评论</a>
	</li>
</ul>

//以下是面板内容
<div class=“tab-content”>
	<div id=“panel-1” class=“tab-pane is-active” role=“tabpanel”>
	…
	</div>
	<div id=“panel-2” class=“tab-pane” role=“tabpanel”>
	…
	</div>
	<div id=“panel-3” class=“tab-pane” role=“tabpanel”>
	…
	</div>
</div>
```
此组件不需要额外JavaScript代码控制，全部用HTML标签属性自动控制。其中需要注意的是需要在切换菜单容器上加上`data-group="tab"`，并在切换容器里的按钮上加上`data-toggle="tab"`属性。面板内容也要保持`.tab-content`容器，`.tab-pane`面板元素的结构，并必须标注id。
