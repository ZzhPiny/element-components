<template>
    <div class="basic-input">
        <jc-input v-bind="$attrs" v-on="$listeners" />
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
};
</script>

<style lang="less" scoped>
.basic-input {
    display: inline-block;
    width: 20rem;
}
</style>
