<template>
    <jc-popover
        ref="filterPopover"
        placement="bottom"
        trigger="hover"
        popper-class="table-filter-popper"
        @show="filterVisible = true"
        @hide="filterVisible = false"
    >
        <ul class="table-filter-container">
            <li
                v-for="item in filters"
                :key="item.value"
                class="jc-select-dropdown__item"
                :class="{ selected: item.active }"
                @click="handleFilterClick(item)"
            >
                {{ item.label }}
            </li>
        </ul>
        <span
            slot="reference"
            :class="{ 'table-header-cell hightlight': currentActiveFilter }"
        >
            {{ label }}
            <i
                :class="
                    filterVisible ? 'jc-icon-arrow-up' : 'jc-icon-arrow-down'
                "
            />
        </span>
    </jc-popover>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: () => '',
        },
        filters: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        currentActiveFilter() {
            const oActiveFilter = this.filters.find(
                (oFilter) => oFilter.active,
            );
            return (
                oActiveFilter &&
                oActiveFilter.value !== '' &&
                oActiveFilter.value !== undefined
            );
        },
    },
    data() {
        return {
            filterVisible: false,
        };
    },
    methods: {
        handleFilterClick(oData) {
            this.$refs.filterPopover.doClose();
            this.$emit('filter', oData);
        },
    },
};
</script>

<style lang="less">
.table-filter-popper {
    min-width: 5rem;
    max-width: 10rem;

    .table-filter-container {
        background-color: #fff;
        box-sizing: border-box;
        list-style: none;
        margin: -5px -10px;
        padding: 0;

        .jc-select-dropdown__item {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: break-all;
        }
    }
}
.table-header-cell.hightlight {
    color: #20a0ff;
}
</style>
