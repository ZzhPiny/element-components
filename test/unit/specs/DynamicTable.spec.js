import { shallowMount } from '@vue/test-utils';
import FilterPanel from '@/packages/dynamic-table/src/components/filter-panel.vue';

describe('<filter-panel />', () => {
    test('should render correct contents', () => {
        const wrapper = shallowMount(FilterPanel);
        expect(wrapper.vm.filterVisible).toBe(false);
    });
});
