<template>
    <div>
        <jc-checkbox-group v-bind="$attrs" v-on="$listeners">
            <component
                :is="type === 'button' ? 'jc-checkbox-button' : 'jc-checkbox'"
                v-for="oItem in options"
                :key="oItem.value"
                v-bind="oItem"
                :label="oItem.value"
                >{{ oItem.label }}</component
            >
        </jc-checkbox-group>
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
        type: {
            type: String,
            default: () => '',
        },
    },
};
</script>
