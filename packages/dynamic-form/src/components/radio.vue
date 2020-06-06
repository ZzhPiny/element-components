<template>
    <jc-radio-group v-bind="$attrs" v-on="$listeners">
        <component
            :is="type === 'button' ? 'jc-radio-button' : 'jc-radio'"
            v-for="oItem in options"
            :key="oItem.value"
            v-bind="oItem"
            :label="oItem.value"
            >{{ oItem.label }}</component
        >
    </jc-radio-group>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        options: {
            type: Array,
            default: () => [],
        },
        type: {
            type: String,
            default: () => '',
        },
    },
};
</script>
