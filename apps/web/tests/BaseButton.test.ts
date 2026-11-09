import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '../src/components/BaseButton.vue';

describe('BaseButton', () => {
  it('renders the label and emits click', async () => {
    const wrapper = mount(BaseButton, { props: { label: 'Save' } });

    expect(wrapper.text()).toBe('Save');
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });
});
