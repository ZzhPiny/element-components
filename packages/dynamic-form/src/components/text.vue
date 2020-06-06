<script>
export default {
    inheritAttrs: false,
    props: {
        value: {
            type: [Number, String, Boolean, Array, Object],
        },
        payload: {
            type: Object,
            default: () => ({}),
        },
        filter: {
            type: Function,
        },
        renderText: {
            type: Function,
        },
    },
    render(h) {
        if (this.renderText) {
            return this.renderText(h, this.value, this.payload);
        }

        return (
            <span class="form-item-text">
                {this.filter
                    ? this.filter(this.value, this.payload)
                    : this.value}
            </span>
        );
    },
};
</script>

<style lang="less" scoped>
.form-item-text {
    word-wrap: break-word;
}
</style>
