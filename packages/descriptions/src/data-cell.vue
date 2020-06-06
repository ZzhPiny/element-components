<script>
import safeGet from 'lodash.get';

export default {
    props: {
        column: {
            type: Object,
            default: () => ({}),
        },
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
    render(h) {
        return (
            <div class="data-cell">
                {this.renderContent(h)}
                {this.renderIcon(h)}
            </div>
        );
    },
    methods: {
        renderContent(h) {
            const {
                key,
                filter,
                tooltip,
                defaultValue = this.defaultValue,
                renderCell,
            } = this.column;
            const { show: showTooltip = true, content } = tooltip || {};

            // 获取当前key的原始值
            const sCurrValue = safeGet(this.data, key);
            // 对原始值进行过滤
            const sFilteredValue = filter
                ? filter(sCurrValue, this.data)
                : sCurrValue;
            // 对空值赋予默认值
            const sValue = [null, undefined, ''].includes(sFilteredValue)
                ? defaultValue
                : sFilteredValue;
            // tooltip展示内容
            const sTooltipContent =
                content instanceof Function
                    ? content(this.data)
                    : content || sValue;

            return (
                <div class="data-cell__content">
                    <tooltip-text
                        class={['tooltip-text', { disabled: !showTooltip }]}
                        content={`${sTooltipContent}`}
                    >
                        {renderCell ? renderCell(h, sValue, this.data) : sValue}
                    </tooltip-text>
                </div>
            );
        },
        /**
         * 渲染尾部图标
         */
        renderIcon() {
            const { type, onClick } = this.column.icon || {};
            return (
                <div class="data-cell__icon">
                    {type ? (
                        <i
                            class={type}
                            onClick={(event) => onClick(event, this.data)}
                        />
                    ) : null}
                </div>
            );
        },
    },
};
</script>

<style lang="less" scoped>
.data-cell {
    display: flex;
    align-items: baseline;

    .data-cell__content {
        max-width: calc(100% - 30px);

        .tooltip-text {
            width: 100%;
            display: block;

            &.disabled {
                white-space: normal;
                word-break: break-word;
            }
        }
    }

    .data-cell__icon {
        margin-left: 10px;
        color: #2aafff;
        & > i {
            cursor: pointer;
        }
    }
}
</style>
