<script>
export default {
    props: {
        index: {
            type: Number,
            default: () => 0,
        },
        customColumn: {
            type: Object,
            default: () => ({}),
        },
        tableColumn: {
            type: Object,
            default: () => ({}),
        },
        row: {
            type: Object,
            default: () => ({}),
        },
        store: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            moreVisible: false,
            expand: false,
        };
    },
    methods: {
        renderActionsCell(oCustomColumn, oRow, $index) {
            const aActionList = oCustomColumn.actions.map((oAction) => {
                if (
                    oAction.show &&
                    !oAction.show(oCustomColumn, oRow, $index)
                ) {
                    return null;
                }

                if (!oAction.children) {
                    return this.renderButton(
                        oAction,
                        oCustomColumn,
                        oRow,
                        $index,
                    );
                }

                return this.renderPopoverButton(
                    oAction,
                    oCustomColumn,
                    oRow,
                    $index,
                );
            });

            return <span>{aActionList}</span>;
        },
        renderButton(oAction, oCustomColumn, oRow, $index) {
            // 获取tooltip相关数据
            const oTooltip = oAction.tooltip || {};
            // content及其他props
            const { getContent, ...props } = oTooltip;
            const sTooltipContent = getContent
                ? getContent(oCustomColumn, oRow, $index)
                : '';
            // 是否disabled
            const isDisabled =
                oAction.disabled &&
                oAction.disabled(oCustomColumn, oRow, $index);
            // disabled的button支持tooltip需要外面包裹一层
            return (
                <jc-tooltip
                    // {props: {}}
                    {...{ props }}
                    content={sTooltipContent}
                    disabled={!sTooltipContent}
                >
                    <span>
                        <jc-button
                            type="text"
                            key={oAction.label}
                            clstag={oAction.clstag}
                            disabled={isDisabled}
                            on-click={() =>
                                oAction.callback(oCustomColumn, oRow, $index)
                            }
                        >
                            {oAction.label || oRow[oCustomColumn.prop]}
                        </jc-button>
                    </span>
                </jc-tooltip>
            );
        },
        renderPopoverButton(oAction, oCustomColumn, oRow, $index) {
            return (
                <jc-popover
                    ref="actionPopover"
                    placement="bottom"
                    trigger="hover"
                    popper-class="jc-table-popover-action"
                    on-show={() => (this.moreVisible = true)}
                    on-hide={() => (this.moreVisible = false)}
                >
                    <ul class="action-list">
                        {oAction.children.map((oMoreAction) => {
                            // 不显示按钮
                            if (oMoreAction.show && !oMoreAction.show(oRow)) {
                                return null;
                            }
                            // 获取tooltip相关数据
                            const oTooltip = oMoreAction.tooltip || {};
                            // content及其他props
                            const { getContent, ...props } = oTooltip;
                            const sTooltipContent = getContent
                                ? getContent(oRow)
                                : '';
                            // 是否disabled
                            const isDisabled =
                                oMoreAction.disabled &&
                                oMoreAction.disabled(
                                    oMoreAction,
                                    oCustomColumn,
                                    oRow,
                                    $index,
                                );
                            return (
                                <jc-tooltip
                                    className="item"
                                    effect="dark"
                                    // {props: {}}
                                    {...{ props }}
                                    content={sTooltipContent}
                                    disabled={!sTooltipContent}
                                >
                                    <li
                                        class={{
                                            'jc-select-dropdown__item': true,
                                            'is-disabled': isDisabled,
                                        }}
                                        clstag={oMoreAction.clstag}
                                        on-click={() =>
                                            !isDisabled &&
                                            this.handleDropDownClick(
                                                oMoreAction,
                                                oCustomColumn,
                                                oRow,
                                                $index,
                                            )
                                        }
                                    >
                                        {oMoreAction.label}
                                    </li>
                                </jc-tooltip>
                            );
                        })}
                    </ul>
                    <jc-button slot="reference" type="text" key={oAction.label}>
                        {oAction.label}
                        <i
                            class={{
                                'action-icon': true,
                                'jc-icon-arrow-up': this.moreVisible,
                                'jc-icon-arrow-down': !this.moreVisible,
                            }}
                        />
                    </jc-button>
                </jc-popover>
            );
        },
        handleDropDownClick(oAction, oCustomColumn, oRow, $index) {
            this.$refs.actionPopover.doClose();
            oAction.callback(oCustomColumn, oRow, $index);
        },
        renderFilterCell(oCustomColumn, oRow) {
            // 获取 filter
            const filter = oCustomColumn.filter;

            return (
                <span>
                    {this.$filters[filter.name](
                        oRow[oCustomColumn.prop],
                        filter.arguments,
                    )}
                </span>
            );
        },
        renderExpand(oCustomColumn, oRow, $index) {
            if (
                oCustomColumn.show &&
                !oCustomColumn.show(oCustomColumn, oRow, $index)
            ) {
                return null;
            }
            const { open = '', close = '' } = oCustomColumn.expandLabel;
            return (
                <jc-button
                    type="text"
                    size="small"
                    disabled={
                        oCustomColumn.disabled &&
                        oCustomColumn.disabled(oCustomColumn, oRow, $index)
                    }
                    on-click={() => {
                        this.expand = !this.expand;
                        this.$parent.handleExpandClick(oRow);
                    }}
                >
                    {!this.expand ? open : close}
                    <i
                        class={{
                            'action-icon': true,
                            'jc-icon-arrow-up': this.expand,
                            'jc-icon-arrow-down': !this.expand,
                        }}
                    />
                </jc-button>
            );
        },
    },
    render(h) {
        // 不同类型对应不同渲染结果
        // 展开行
        if (this.customColumn.expand) {
            return this.renderExpand(this.customColumn, this.row, this.index);
        }
        // 操作类
        if (this.customColumn.actions) {
            return this.renderActionsCell(
                this.customColumn,
                this.row,
                this.index,
            );
        }
        // 自定义
        if (this.customColumn.renderCell) {
            return this.customColumn.renderCell(h, {
                customColumn: this.customColumn,
                row: this.row,
                $index: this.index,
            });
        }
        if (this.customColumn.filter) {
            return this.renderFilterCell(this.customColumn, this.row);
        }
        // 默认
        return <span>{this.row[this.customColumn.prop]}</span>;
    },
};
</script>

<style lang="less">
.action-popover {
    min-width: 5rem;
    max-width: 10rem;

    .action-list {
        margin: 0 -10px 0 -10px;
    }
}

.action-icon {
    margin-left: 5px;
}
</style>
