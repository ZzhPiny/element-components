<template>
    <div>
        <component
            ref="formItemComponent"
            :is="component"
            :value="value"
            :payload="payload"
            :index="index"
            :sample="sample"
            v-bind="extraProps"
            v-on="listeners"
            @input="handleFormInput"
            @form-change="handleFormChange"
            @form-blur="handleFormBlur"
        />

        <div class="describe" v-if="describe" v-html="describe" />
    </div>
</template>

<script>
import emitter from '@jd/element-ui/src/mixins/emitter';
import basicComponents from './components';

export default {
    mixins: [emitter],
    props: {
        payload: {
            type: Object,
            default: () => ({}),
        },
        value: {
            type: [Number, String, Boolean, Array, Object],
        },
        sample: {
            type: Array,
            default: () => [],
        },
        index: {
            type: Number,
            requied: true,
        },
    },
    computed: {
        formItemConfig() {
            return this.sample[this.index];
        },
        // 组件名称
        component() {
            const itemComponent = this.formItemConfig.component;
            const component =
                itemComponent instanceof Function
                    ? itemComponent(this.payload)
                    : itemComponent;

            if (typeof component === 'string') {
                return basicComponents[component] || component;
            }

            return component;
        },
        // 组件额外参数
        extraProps() {
            const itemProps = this.formItemConfig.props;
            if (itemProps instanceof Function) {
                return itemProps(this.payload);
            }

            return itemProps;
        },
        // 组件事件监听函数
        listeners() {
            const oListeners = this.formItemConfig.on;
            if (!oListeners) {
                return oListeners;
            }

            return Object.entries(oListeners).reduce(
                (oListeners, [event, callback]) => {
                    // 重写回调函数 添加Payload参数
                    return Object.assign(oListeners, {
                        [event]: (...args) => {
                            callback(this.payload, ...args);
                        },
                    });
                },
                {},
            );
        },
        // 当前描述
        describe() {
            const itemDescribe = this.formItemConfig.describe;
            if (itemDescribe instanceof Function) {
                return itemDescribe(this.payload);
            }

            return itemDescribe;
        },
    },
    methods: {
        /**
         * 组件默认事件处理函数
         */
        handleFormInput(data) {
            this.$emit('input', data);
        },
        /**
         * 自定义组件 change事件处理函数
         */
        handleFormChange(data) {
            this.$emit('input', data);

            // 触发表单的change事件 进行校验
            this.dispatch('JcFormItem', 'el.form.change', data);
        },
        /**
         * 自定义组件 blur事件处理函数
         */
        handleFormBlur(data) {
            this.$emit('input', data);

            // 触发表单的blur事件 进行校验
            this.dispatch('JcFormItem', 'el.form.blur', data);
        },
    },
};
</script>

<style lang="less" scoped>
.describe {
    color: #757575;
    font-size: 12px;
    line-height: 16px;
    padding-top: 2px;
    // margin-bottom: -20px;
    position: static;
    top: 100%;
    left: 0;
}

.is-error .describe {
    display: none;
}
</style>
