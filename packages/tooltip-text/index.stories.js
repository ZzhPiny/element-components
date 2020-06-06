/* eslint-disable react/react-in-jsx-scope */
import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import elementUI from '@jd/element-ui';
import tooltipText from './index';

Vue.use(elementUI);
Vue.use(tooltipText);

storiesOf('tooltip-text', module)
    .addDecorator(() => ({
        // Decorated with `story` component
        template: '<div :style="style"><story/></div>',
        data() {
            return {
                style: {
                    margin: '10px',
                    width: '500px',
                },
            };
        },
    }))
    .add('basic', () => ({
        template: `
            <jc-form
                label-width="100px"
            >
                <jc-form-item
                    label="显示宽度"
                >
                    <jc-slider v-model="width" :max="500"></jc-slider>
                </jc-form-item>
                <jc-form-item
                    label="显示内容"
                >
                    <jc-input v-model="content" />
                </jc-form-item>
                <jc-form-item
                    label="自适应Tooltip"
                >
                    <tooltip-text :style="{ width: width + 'px' }" :content="content" />
                </jc-form-item>
            </jc-form>
        `,
        data() {
            return {
                width: 100,
                content: '这是自适应展示tooltip, 可通过调节宽度和内容进行测试',
            };
        },
    }))
    .add('slot', () => ({
        template: `
            <jc-form
                label-width="100px"
            >
                <jc-form-item
                    label="显示宽度"
                >
                    <jc-slider v-model="width" :max="500"></jc-slider>
                </jc-form-item>
                <jc-form-item
                    label="显示内容"
                >
                    <jc-input v-model="content" />
                </jc-form-item>
                <jc-form-item
                    label="自适应Tooltip"
                >
                    <tooltip-text :style="{ width: width + 'px' }" :content="content">
                        <a href="javscript:;">{{content}}</a>
                    </tooltip-text>
                </jc-form-item>
            </jc-form>
        `,
        data() {
            return {
                width: 100,
                content: '这是自适应展示tooltip, 可通过调节宽度和内容进行测试',
            };
        },
    }));
