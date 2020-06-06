const getPayload = () => {
    return {
        name: '',
        age: '',
        sex: 'male',
        hobby: [],
        education: '',
    };
};

const getSample = () => {
    return [
        {
            label() {
                return (
                    <span>
                        <span>带提示的Label</span>
                        <jc-tooltip>
                            <span slot="content">带提示的Label </span>
                            <i class="jc-icon-warning" />
                        </jc-tooltip>
                    </span>
                );
            },
            key: 'name',
            component: 'input',
        },
        {
            label: '年龄',
            key: 'age',
            component: 'input',
        },
        {
            label: '性别',
            key: 'sex',
            component: 'radio',
            props: {
                options: [
                    {
                        label: '男',
                        value: 'male',
                    },
                    {
                        label: '女',
                        value: 'female',
                    },
                ],
            },
        },
        {
            label: '爱好',
            key: 'hobby',
            component: 'checkbox',
            props: {
                options: [
                    {
                        label: '篮球',
                        value: 'basketball',
                    },
                    {
                        label: '足球',
                        value: 'soccer',
                    },
                ],
            },
        },
        {
            label: '学历',
            key: 'education',
            component: 'select',
            props: {
                options: [
                    {
                        label: '本科',
                        value: 'bachelor',
                    },
                    {
                        label: '研究生',
                        value: 'master',
                    },
                ],
            },
        },
    ];
};

export default {
    getPayload,
    getSample,
};
