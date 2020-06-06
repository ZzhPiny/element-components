<template>
    <jc-form
        class="dynamic-form"
        ref="form"
        :model="payload"
        :rules="rules"
        v-bind="$attrs"
    >
        <!-- 表单前 自定义展示 -->
        <slot name="before" />

        <template v-for="(oItem, nIndex) in sample">
            <jc-form-item
                v-if="showFormItem(oItem, payload)"
                :key="oItem.key"
                :prop="oItem.key"
                :label-width="oItem.labelWidth"
                :required="oItem.required"
                :show-message="oItem.showMessage"
            >
                <form-item-label
                    slot="label"
                    v-if="oItem.label"
                    :label="oItem.label"
                    :payload="payload"
                />

                <form-item-element
                    ref="formItemElement"
                    :data-ref="oItem.key"
                    :index="nIndex"
                    :value="payload[oItem.key]"
                    :payload="payload"
                    :sample="sample"
                    @input="handleChange(oItem, $event)"
                />
            </jc-form-item>
        </template>

        <!-- 表单后 自定义展示 -->
        <slot name="after" />
    </jc-form>
</template>

<script>
import formItemLabel from './form-item-label';
import formItemElement from './form-item-element';

export default {
    name: 'dynamic-form',
    inheritAttrs: false,
    components: {
        formItemLabel,
        formItemElement,
    },
    props: {
        /**
         * 表单配置
         * <p>label: 名称</p>
         * <p>key: 数据的key</p>
         * <p>required: 是否必填</p>
         * <p>component: 组件名称或自定义组件</p>
         * <p>props: 组件参数</p>
         * <p>describe: 描述</p>
         * <p>onChange: 数据修改监听事件</p>
         * <p>on: {change(), blur(), ...} 自定义监听事件</p>
         * <p>rule: 校验规则</p>
         * <p>hidden: 是否隐藏</p>
         * <p>hidden: 是否隐藏</p>
         * <p>labelWidth: 宽度</p>
         * <p>showMessage: 是否展示错误信息</p>
         */
        sample: {
            type: Array,
            default: () => [],
        },
        /**
         * 表单数据
         */
        payload: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        rules() {
            return this.sample.reduce((oRules, oItem, nIndex) => {
                // 当前表单项不存在校验
                if (!oItem.rule) {
                    return oRules;
                }

                const getCurrentRule = () => {
                    // 自定义组件验证
                    if (oItem.rule === 'custom') {
                        return [
                            {
                                validator: (rule, value, callback) => {
                                    // 自定义组件
                                    const customFormItem = this.$refs
                                        .formItemElement[nIndex].$refs
                                        .formItemComponent;
                                    // 若不存在验证方法 则直接通过
                                    if (!customFormItem.validator) {
                                        return callback();
                                    }
                                    customFormItem.validator({
                                        form: this.$refs.form,
                                        payload: this.payload,
                                        rule,
                                        value,
                                        callback,
                                    });
                                },
                            },
                        ];
                    }

                    return oItem.rule.map((oRuleItem) => {
                        // 当前校验规则 非自定义校验
                        if (!oRuleItem.validator) {
                            return oRuleItem;
                        }

                        return {
                            ...oRuleItem,
                            validator: (rule, value, callback) => {
                                oRuleItem.validator({
                                    form: this.$refs.form,
                                    payload: this.payload,
                                    rule,
                                    value,
                                    callback,
                                });
                            },
                        };
                    });
                };

                return Object.assign(oRules, {
                    [oItem.key]: getCurrentRule(),
                });
            }, {});
        },
    },
    data() {
        return {
            formData: {},
        };
    },
    methods: {
        /**
         * 对整个表单进行校验的方法
         */
        validator() {
            return new Promise((resolve, reject) => {
                this.$refs.form.validate((isValid, error) => {
                    if (isValid) {
                        resolve();
                    } else {
                        reject(error);
                    }
                });
            });
        },
        /**
         * 对部分表单字段进行校验的方法
         */
        validateField(keys, callback) {
            this.$refs.form.validateField(keys, callback);
        },
        /**
         * 移除表单项的校验结果。
         * 传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
         */
        clearValidate(props) {
            this.$refs.form.clearValidate(props);
        },
        /**
         * 修改数据
         */
        handleChange(oItem, value) {
            const setDataAndEmit = (oPayload) => {
                // 更新表单数据 并触发change事件
                Object.assign(this.payload, oPayload);

                // 当数据发生修改
                // @arg 返回修改后的数据
                this.$emit('change', oPayload);
            };

            // 是否存在自定义change函数
            if (oItem.onChange) {
                oItem.onChange({
                    form: this.$refs.form,
                    payload: this.payload,
                    value,
                    callback: setDataAndEmit,
                });
            } else {
                setDataAndEmit({
                    ...this.payload,
                    [oItem.key]: value,
                });
            }
        },
        /**
         * 是否展示表单项
         */
        showFormItem(oItem, oPayload) {
            if (oItem.hidden === undefined) {
                return true;
            }

            if (oItem.hidden instanceof Function) {
                return !oItem.hidden(oPayload);
            }

            return !oItem.hidden;
        },
    },
};
</script>

<style lang="less" scoped>
.dynamic-form {
    .jc-form-item.is-error {
        margin-bottom: 24px;
    }
}
</style>
