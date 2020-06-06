<template>
    <jc-tooltip
        placement="top"
        ref="tooltip"
        :disabled="tooltipDisabled"
        :content="content"
    >
        <div class="tooltip-text" ref="content" @mouseenter="handleMouseEnter">
            <slot v-if="$slots.default"></slot>
            <span v-else>{{ content }}</span>
        </div>
    </jc-tooltip>
</template>

<script>
export default {
    name: 'tooltip-text',
    props: {
        /**
         * 文本数据
         */
        content: {
            type: String,
            default: () => '',
        },
    },
    data() {
        return {
            tooltipDisabled: true,
        };
    },
    methods: {
        handleMouseEnter() {
            const domRect = (() => {
                // 创建Range
                const domRange = document.createRange();

                // 设置Range的起点和终点
                domRange.setStart(this.$refs.content, 0);
                domRange.setEnd(
                    this.$refs.content,
                    this.$refs.content.childNodes.length,
                );

                // 根据Range生成dom rect
                return domRange.getBoundingClientRect();
            })();

            // 转化为整数判断Rect和当前节点的宽度 是否展示Tooltip
            this.tooltipDisabled =
                Math.floor(domRect.width) <=
                Math.floor(this.$refs.content.offsetWidth);
        },
    },
};
</script>

<style lang="less" scoped>
.tooltip-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
