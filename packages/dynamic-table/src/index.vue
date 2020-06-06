<template>
    <div class="dynamic-table-wrapper">
        <!-- row-key用于配合reserve-selection使用，回选翻页前的选中数据  -->
        <jc-table
            ref="table"
            v-bind="$attrs"
            v-on="$listeners"
            :data="data"
            :border="border"
            :stripe="stripe"
            :row-class-name="rowClassName"
            :empty-text="emptyText"
            :row-key="
                keepSelectedKey ? (row) => row[keepSelectedKey] || '' : ''
            "
            @select="onSelected"
            @select-all="onSelected"
            @sort-change="handleSortChange"
        >
            <!-- selection -->
            <jc-table-column
                v-if="enableSelection"
                type="selection"
                :selectable="selectable"
                :reserve-selection="keepSelectedKey ? true : false"
            />

            <!-- column -->
            <jc-table-column
                v-for="oColumn in aVisibleColummns"
                :key="`${oColumn.label}${oColumn.prop}`"
                :show-overflow-tooltip="
                    oColumn.showOverflowTooltip === false ? false : true
                "
                :render-header="(h) => renderHeader(h, oColumn)"
                v-bind="oColumn"
            >
                <template slot-scope="scope">
                    <table-column
                        :index="scope.$index"
                        :customColumn="oColumn"
                        :tableColumn="scope.column"
                        :row="scope.row"
                        :store="scope.store"
                    />
                </template>
            </jc-table-column>

            <!-- 自定义空数据提示slot -->
            <slot slot="empty" name="empty" />
        </jc-table>

        <!-- 自定义footer提示 -->
        <slot name="footerTips" />

        <!-- 自定义footer -->
        <slot name="footer" />

        <!-- 公共footer -->
        <table-footer
            v-if="!$slots.footer"
            v-show="!hideFooter"
            ref="tableFooter"
            :class="disabledFixed ? '' : 'fixed'"
            :isAllSelected="
                $refs.table && $refs.table.store.states.isAllSelected
            "
            :enableSelection="enableSelection"
            :enableFooterSelection="enableFooterSelection"
            :totalCount="total"
            :pager="pager"
            @paginationChange="onPaginationChange"
            @toggleAllSelection="toggleAllSelection"
        >
            <!-- 公共footer里，添加自定义actions -->
            <slot
                name="footerActions"
                slot="footerActions"
                v-bind:selectedList="selectedList"
            />
        </table-footer>
    </div>
</template>

<script>
import debounce from 'lodash.debounce';
import tableHeader from './components/table-header';
import tableColumn from './components/table-column';
import tableFooter from './components/table-footer';

export default {
    name: 'dynamic-table',
    inheritAttrs: false,
    components: {
        tableHeader,
        tableColumn,
        tableFooter,
    },
    props: {
        /**
         * table所需数据
         */
        data: {
            type: Array,
            default: () => [],
        },
        /**
         * footer用总条数
         */
        total: {
            type: Number,
            default: 0,
        },
        /**
         * <p>label：名称</p>
         * <p>prop：数据的key</p>
         * <p>width：宽度</p>
         * <p>actions：自定义操作 </p>
         * <p>columnFilters：列过滤选项</p>
         * <p>renderCell：自定义cell渲染</p>
         * <p>tooltip: { getContent(){}, element-tooltip相关配置 }</p>
         * ...
         */
        columns: {
            type: Array,
            default: () => [],
        },
        /**
         * footer是否固定
         */
        disabledFixed: {
            type: Boolean,
            default: false,
        },
        /**
         * footer是否显示
         */
        hideFooter: {
            type: Boolean,
            default: false,
        },
        /**
         * 是否为斑马纹 table
         */
        stripe: {
            type: Boolean,
            default: true,
        },
        /**
         * 是否带有纵向边框
         */
        border: {
            type: Boolean,
            default: false,
        },
        /**
         * 行的 className 的回调方法
         */
        rowClassName: {
            type: Function,
        },
        /**
         * 是否展示选择框
         */
        enableSelection: {
            type: Boolean,
            default: false,
        },
        /**
         * 仅对 type=selection 的列有效，类型为 Function
         * Function 的返回值用来决定这一行的 CheckBox 是否可以勾选
         */
        selectable: {
            type: Function,
        },
        /**
         * 是否支持展开
         */
        enableExpand: {
            type: Boolean,
            default: false,
        },
        /**
         * 是否展示footer里的选择框
         */
        enableFooterSelection: {
            type: Boolean,
            default: true,
        },
        /**
         * 自定义空数据文本
         */
        emptyText: String,
        /**
         * 选择行唯一标识
         * 仅对 type=selection 的列有效
         * 用于切换分页后保留之前选择的数据
         */
        keepSelectedKey: {
            type: String,
            default: '',
        },
        /**
         * 自定义分页
         * <p>number</p>
         * <p>size</p>
         * <p>sizes</p>
         */
        pagerConfig: {
            type: Object,
            default: () => {
                // 简写，vuese会报错
                const oDefault = {
                    number: 1,
                    size: 10,
                    sizes: [10, 20, 50],
                };

                return oDefault;
            },
        },
        /**
         * 是否为自定义table
         */
        enableCustomizeTable: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            pager: {},
            filterData: {},
            selectedList: [],
            sort: {
                prop: '',
                order: '',
            },
        };
    },
    computed: {
        aVisibleColummns() {
            return this.enableCustomizeTable
                ? this.columns.filter((oData) => !oData.hidden)
                : this.columns;
        },
    },
    watch: {
        data() {
            // 当表格数据更改时，重置当前选中数据
            this.resetSelected();
        },
    },
    methods: {
        // emit selected event
        onSelected(aTmp) {
            this.selectedList = aTmp;

            // 当被选中
            // @arg 返回所有选中结果
            this.$emit('selected', this.selectedList);
        },
        resetSelected() {
            // 如需要保持之前选择项，则不清空已有数据
            if (this.keepSelectedKey) {
                return;
            }

            // 数据reset
            this.selectedList = [];

            // 清除选中状态
            this.$refs.table && this.$refs.table.clearSelection();

            // parent
            this.$emit('selected', this.selectedList);
        },
        handleSortChange({ prop, order }) {
            Object.assign(this.sort, {
                prop,
                order,
            });

            // 当排序条件发生变化
            // @arg 返回排序条件
            this.$emit('sort', this.sort);

            // 重置选中相关状态
            this.resetSelected();
        },
        debouncePaginationChange: debounce((self) => {
            self.$emit('refresh', self.pager);

            // 重置选中相关状态
            self.resetSelected();
        }),
        // 更新分页页码
        onPaginationChange(oPayload) {
            // 更新pagination
            Object.assign(this.pager, oPayload);

            // 当size发生变】化时，number、size事件会有一定几率重叠，使用debounce减少refresh事件的emit
            this.debouncePaginationChange(this);
        },
        // 表格底部按钮click
        handleDelete() {
            // 表格底部删除按钮被点击
            // @arg 返回当前选中的数据
            this.$emit('delete', this.selectedList);
        },
        // 表格底部全选按钮
        toggleAllSelection() {
            this.$refs.table.store.commit('toggleAllSelection');
        },
        handleFilterChange(oFilterState) {
            Object.assign(this.filterData, oFilterState);

            // 当过滤条件发生变化
            // @arg 返回过滤条件
            this.$emit('filter', this.filterData);
        },
        // render header dom
        renderHeader(h, oColumn) {
            // 自定义列标题渲染
            if (oColumn.renderHeader) {
                return oColumn.renderHeader(h, this.data);
            }

            // 不存在列过滤
            if (!oColumn.columnFilters) {
                return oColumn.label;
            }

            // 自定义列过滤
            return h(tableHeader, {
                props: {
                    columnConfig: oColumn,
                },
                on: {
                    filter: this.handleFilterChange,
                },
            });
        },
        // 用于多选表格，切换某一行的选中状态
        toggleRowSelection(row, selected) {
            this.$refs.table.toggleRowSelection(row, selected);
        },
    },
    mounted() {
        /**
         * 初始化时
         * 更新pagination所需的数据
         * 返回pagination相关的数据
         */
        Object.assign(this.pager, this.pagerConfig);
        // 页码等条件发生变化
        // @arg 返回当前页码的筛选条件
        this.$emit('refresh', this.pager);

        // 如果支持enableExpand，修改原始的renderExpanded的方法，通过slot的方式进行content的渲染
        if (this.enableExpand) {
            this.$refs.table.renderExpanded = (h, data) => {
                return this.$scopedSlots.default
                    ? this.$scopedSlots.default(data)
                    : this.$slots.default;
            };
        }
    },
};
</script>

<style lang="less" scoped>
// 防止footer在fixed的状态下上下抖动
.dynamic-table-wrapper {
    position: inherit !important;
}
</style>
