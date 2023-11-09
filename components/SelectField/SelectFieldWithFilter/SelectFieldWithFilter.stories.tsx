import { Meta, StoryFn } from '@storybook/react';
import SelectFieldWithFilter from './SelectFieldWithFilter';
import { SelectFieldWithFilterProps } from './SelectFieldWithFilter.model';

export default {
  title: 'components/SelectFieldWithFilter',
  component: SelectFieldWithFilter,
  argTypes: {},
} as Meta<typeof SelectFieldWithFilter>;

const Template: StoryFn<typeof SelectFieldWithFilter> = (args) => (
  <SelectFieldWithFilter {...args} />
);

export const Base = Template.bind({});

Base.args = {
  disabled: false,
} as SelectFieldWithFilterProps;
