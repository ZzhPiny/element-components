// table
import dynamicTable from './packages/dynamic-table';

// form
import dynamicForm from './packages/dynamic-form';

// tooltip text
import tooltipText from './packages/tooltip-text';

// 多行多列展示钻进
import descriptions from './packages/descriptions';

class Components {
    constructor(data) {
        this.data = data;
    }

    install(Vue) {
        this.data.forEach((component) => {
            Vue.use(component);
        });
    }
}

export default new Components([
    dynamicTable,
    dynamicForm,
    tooltipText,
    descriptions,
]);
