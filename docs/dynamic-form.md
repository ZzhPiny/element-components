# dynamic-form

## Props

<!-- @vuese:dynamic-form-2:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|sample|表单配置<p>label: 名称</p><p>key: 数据的key</p><p>required: 是否必填</p><p>component: 组件名称或自定义组件</p><p>props: 组件参数</p><p>describe: 描述</p><p>onChange: 数据修改监听事件</p><p>on: {change(), blur(), ...} 自定义监听事件</p><p>rule: 校验规则</p><p>hidden: 是否隐藏</p><p>hidden: 是否隐藏</p><p>labelWidth: 宽度</p><p>showMessage: 是否展示错误信息</p>|`Array`|`false`||
|payload|表单数据|`Object`|`false`|-|

<!-- @vuese:dynamic-form-2:props:end -->


## Events

<!-- @vuese:dynamic-form-2:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|change|当数据发生修改| 返回修改后的数据|

<!-- @vuese:dynamic-form-2:events:end -->


## Slots

<!-- @vuese:dynamic-form-2:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|before|表单前 自定义展示|-|
|after|表单后 自定义展示|-|

<!-- @vuese:dynamic-form-2:slots:end -->


