# dynamic-table

## Props

<!-- @vuese:dynamic-table:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|data|table所需数据|`Array`|`false`||
|total|footer用总条数|`Number`|`false`|0|
|columns|<p>label：名称</p><p>prop：数据的key</p><p>width：宽度</p><p>actions：自定义操作 </p><p>columnFilters：列过滤选项</p><p>renderCell：自定义cell渲染</p><p>tooltip: { getContent(){}, element-tooltip相关配置 }</p>...|`Array`|`false`||
|disabledFixed|footer是否固定|`Boolean`|`false`|false|
|hideFooter|footer是否显示|`Boolean`|`false`|false|
|stripe|是否为斑马纹 table|`Boolean`|`false`|true|
|border|是否带有纵向边框|`Boolean`|`false`|false|
|rowClassName|行的 className 的回调方法|`Function`|`false`|-|
|enableSelection|是否展示选择框|`Boolean`|`false`|false|
|selectable|仅对 type=selection 的列有效，类型为 FunctionFunction 的返回值用来决定这一行的 CheckBox 是否可以勾选|`Function`|`false`|-|
|enableExpand|是否支持展开|`Boolean`|`false`|false|
|enableFooterSelection|是否展示footer里的选择框|`Boolean`|`false`|true|
|emptyText|自定义空数据文本|`String`|`false`|-|
|keepSelectedKey|选择行唯一标识仅对 type=selection 的列有效用于切换分页后保留之前选择的数据|`String`|`false`|''|
|pagerConfig|自定义分页<p>number</p><p>size</p><p>sizes</p>|`Object`|`false`|[object Object]|
|enableCustomizeTable|是否为自定义table|`Boolean`|`false`|false|

<!-- @vuese:dynamic-table:props:end -->


## Events

<!-- @vuese:dynamic-table:events:start -->
|Event Name|Description|Parameters|
|---|---|---|
|selected|当被选中| 返回所有选中结果|
|sort|当排序条件发生变化| 返回排序条件|
|delete|表格底部删除按钮被点击| 返回当前选中的数据|
|filter|当过滤条件发生变化| 返回过滤条件|
|refresh|页码等条件发生变化| 返回当前页码的筛选条件|

<!-- @vuese:dynamic-table:events:end -->


## Slots

<!-- @vuese:dynamic-table:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|empty|自定义空数据提示slot|-|
|footerTips|自定义footer提示|-|
|footer|自定义footer|-|
|footerActions|公共footer里，添加自定义actions|-|

<!-- @vuese:dynamic-table:slots:end -->


