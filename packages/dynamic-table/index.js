import DynamicTable from './src';

DynamicTable.install = (Vue) => {
    Vue.component(DynamicTable.name, DynamicTable);
};

export default DynamicTable;
