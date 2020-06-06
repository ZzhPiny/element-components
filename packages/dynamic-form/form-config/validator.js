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
            label: '名称',
            key: 'name',
            component: 'input',
            required: true,
            rule: [
                {
                    required: true,
                    message: '请输入名称',
                },
            ],
        },
        {
            label: '年龄',
            key: 'age',
            component: 'input',
            rule: [
                {
                    validator({ value, callback }) {
                        const nValue = +value;
                        if (`${nValue}` !== value) {
                            return callback(new Error('请正确输入年龄'));
                        }
                        return callback();
                    },
                },
            ],
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
