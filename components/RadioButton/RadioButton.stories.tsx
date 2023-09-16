import { Meta, StoryFn } from '@storybook/react';
import RadioButton from './RadioButton';
import { RadioButtonProps } from './RadioButton.model';

export default {
  title: 'components/RadioButton',
  component: RadioButton,
  argTypes: {},
} as Meta<typeof RadioButton>;

const Template: StoryFn<typeof RadioButton> = (args) => (
  <RadioButton {...args} />
);

export const Base = Template.bind({});

Base.args = {
  name: 'Radio',
  label: 'Radio',
} as RadioButtonProps;
