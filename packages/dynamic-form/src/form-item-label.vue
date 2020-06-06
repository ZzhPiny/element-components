<script>
export default {
    props: {
        label: {
            type: [String, Function],
            default: () => '',
        },
        payload: {
            type: Object,
            default: () => ({}),
        },
    },
    render(h) {
        if (this.label instanceof Function) {
            return this.label(h, this.payload);
        }

        return <span>{this.label}</span>;
    },
};
</script>
