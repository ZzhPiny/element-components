<template>
    <div class="descriptions">
        <jc-form>
            <jc-row
                v-bind="{
                    gutter: 20,
                    ...$attrs,
                }"
            >
                <template v-for="oItem in columns">
                    <jc-col
                        :key="oItem.key"
                        v-bind="{
                            span: 8,
                            ...oItem.columnProps,
                        }"
                        v-show="!getHiddenStatus(oItem)"
                    >
                        <jc-form-item
                            :label="oItem.label"
                            v-bind="oItem.labelProps"
                        >
                            <data-cell
                                :column="oItem"
                                :data="data"
                                :default-value="defaultValue"
                            />
                        </jc-form-item>
                    </jc-col>
                </template>
            </jc-row>
        </jc-form>
    </div>
</template>

<script>
import dataCell from './data-cell';

export default {
    inheritAttrs: false,
    name: 'descriptions',
    components: {
        dataCell,
    },
    props: {
        /**
         * column: [{
         *  label: 名称
         *  key: 对应数据的属性
         *  defaultValue: 当前属性默认值
         *  labelProps: 继承jc-form-item属性
         *  columnProps: 继承jc-col属性
         *  filter: 过滤函数
         *  hidden: 是否隐藏
         *  icon: {
         *      type: 尾部图标
         *      onClick: 点击事件回调函数
         *  }
         *  tooltip: {
         *      show: 是否展示tooltip
         *      content: tooltip内容
         *  }
         *  renderCell: 自定义渲染
         * }]
         */
        columns: {
            type: Array,
            default: () => [],
        },
        /**
         * 原始数据
         */
        data: {
            type: Object,
            default: () => ({}),
        },
        /**
         * 默认值
         */
        defaultValue: {
            type: String,
            default: () => '',
        },
    },
    methods: {
        /**
         * 获取显示状态
         */
        getHiddenStatus(oColumn) {
            if (oColumn.hidden instanceof Function) {
                return oColumn.hidden(this.data);
            }

            return oColumn.hidden;
        },
    },
};
</script>
