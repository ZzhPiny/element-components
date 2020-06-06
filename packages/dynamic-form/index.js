import DynamicForm from './src';

DynamicForm.install = (Vue) => {
    Vue.component(DynamicForm.name, DynamicForm);
};

export default DynamicForm;
