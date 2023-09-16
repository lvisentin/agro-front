import { Meta, StoryFn } from '@storybook/react';
import PrimaryButton from './PrimaryButton';
import { PrimaryButtonProps } from './PrimaryButton.model';

export default {
  title: 'components/PrimaryButton',
  component: PrimaryButton,
  argTypes: {},
} as Meta<typeof PrimaryButton>;

const Template: StoryFn<typeof PrimaryButton> = (args) => (
  <PrimaryButton {...args} />
);

export const Base = Template.bind({});

Base.args = {
  disabled: false,
} as PrimaryButtonProps;
