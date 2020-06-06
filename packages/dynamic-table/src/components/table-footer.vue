<template>
    <div class="footer-wrapper">
        <span class="items">
            <jc-checkbox
                v-if="enableSelection && enableFooterSelection"
                v-model="isFooterSelectedAll"
                @change="$emit('toggleAllSelection')"
            />

            <!-- 公共footer里，添加自定义actions -->
            <slot name="footerActions" />
        </span>
        <jc-pagination
            :current-page="pager.number"
            :page-size="pager.size"
            :page-sizes="pager.sizes"
            :total="totalCount"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="
                (nVal) => {
                    // update page size
                    onChange({
                        size: nVal,
                    });
                }
            "
            @current-change="
                (nVal) => {
                    // update page number
                    onChange({
                        number: nVal,
                    });
                }
            "
        />
    </div>
</template>

<script>
export default {
    props: {
        isAllSelected: {
            type: Boolean,
            default: () => false,
        },
        enableSelection: {
            type: Boolean,
            default: () => false,
        },
        enableFooterSelection: {
            type: Boolean,
            default: () => true,
        },
        totalCount: {
            type: Number,
            default: () => 0,
        },
        pager: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            isFooterSelectedAll: false,
        };
    },
    watch: {
        isAllSelected: {
            immediate: true,
            handler() {
                // update
                this.isFooterSelectedAll = this.isAllSelected;
            },
        },
    },
    mounted() {
        // 初始化赋值
        this.isFooterSelectedAll = this.isAllSelected;
    },
    methods: {
        onChange(oPayload) {
            this.$emit('paginationChange', oPayload);
        },
    },
};
</script>

<style lang="less" scoped>
.footer-wrapper {
    //  colors
    background-color: #f3f7fb;
    border: 1px solid #dbe3e9;
    border-top: none;
    z-index: 2;
    // size
    padding: 0.8rem 1.6rem 0.8rem 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .jc-pagination {
        padding: 0;
    }
    // position
    &.fixed {
        border-top: 1px solid #dbe3e9;
        padding-left: 1.6rem;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
}
</style>
