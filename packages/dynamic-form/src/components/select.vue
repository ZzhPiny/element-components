<template>
    <div class="basic-select">
        <jc-select v-bind="$attrs" v-on="$listeners">
            <template v-for="oItem in options">
                <jc-option
                    v-if="!oItem.hidden"
                    :key="oItem.value"
                    :label="oItem.label"
                    :value="oItem.value"
                    :disabled="oItem.disabled"
                />
            </template>
        </jc-select>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        options: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style lang="less" scoped>
.basic-select {
    display: inline-block;
    width: 20rem;
}
</style>
