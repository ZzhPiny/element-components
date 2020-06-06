/* eslint-disable react/react-in-jsx-scope */
import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import elementUI from '@jd/element-ui';
import dynamicForm2 from './index';
import '@jd/element-ui/lib/theme-default/index.css';

import basicFormConfig from './form-config/basic';
import customFormConfig from './form-config/custom';
import validatorFormConfig from './form-config/validator';

Vue.use(elementUI);
Vue.use(dynamicForm2);

storiesOf('dynamic form 2', module)
    .add('basic', () => ({
        data() {
            return {
                sample: basicFormConfig.getSample(),
                payload: basicFormConfig.getPayload(),
            };
        },
        render() {
            return (
                <div>
                    <dynamic-form-2
                        sample={this.sample}
                        payload={this.payload}
                        label-width="100px"
                    />
                    <div>{JSON.stringify(this.payload)}</div>
                </div>
            );
        },
    }))
    .add('custom label', () => ({
        data() {
            return {
                sample: customFormConfig.getSample(),
                payload: customFormConfig.getPayload(),
            };
        },
        render() {
            return (
                <div>
                    <dynamic-form-2
                        sample={this.sample}
                        payload={this.payload}
                        label-width="150px"
                    />
                    <div>{JSON.stringify(this.payload)}</div>
                </div>
            );
        },
    }))
    .add('validator', () => ({
        data() {
            return {
                sample: validatorFormConfig.getSample(),
                payload: validatorFormConfig.getPayload(),
            };
        },
        render() {
            return (
                <div>
                    <dynamic-form-2
                        ref="form"
                        sample={this.sample}
                        payload={this.payload}
                        label-width="150px"
                    >
                        <jc-form-item slot="before">
                            <div>表单验证</div>
                        </jc-form-item>
                        <jc-form-item slot="after">
                            <jc-button type="primary">提交</jc-button>
                        </jc-form-item>
                    </dynamic-form-2>
                    <div>{JSON.stringify(this.payload)}</div>
                </div>
            );
        },
        methods: {
            submit() {
                this.$refs.form
                    .validator()
                    .then(() => {
                        this.$jcMessage.success('提交成功！');
                    })
                    .catch(() => {});
            },
        },
    }));
