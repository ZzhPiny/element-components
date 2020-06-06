<script>
import filterPanel from './filter-panel';

export default {
    components: {
        filterPanel,
    },
    props: {
        columnConfig: {
            type: Object,
            default: () => ({}),
        },
    },
    methods: {
        // update filter state
        handlerFilterClick({ value }) {
            const sProp = this.columnConfig.prop;
            const aFilters = this.columnConfig.columnFilters;
            const oBeforeTarget = aFilters.find((oItem) => oItem.active);
            const oTarget = aFilters.find((oItem) => oItem.value === value);

            // reset before selected status
            if (oBeforeTarget) {
                Object.assign(oBeforeTarget, {
                    active: false,
                });
            }

            // update selected status
            Object.assign(oTarget, {
                active: true,
            });

            this.$emit('filter', {
                [sProp]: value,
            });
        },
    },
    render() {
        return (
            <filter-panel
                label={this.columnConfig.label}
                filters={this.columnConfig.columnFilters}
                on-filter={this.handlerFilterClick}
            />
        );
    },
};
</script>
