import { Meta, StoryFn } from '@storybook/react';
import DeleteButton from './DeleteButton';
import { DeleteButtonProps } from './DeleteButton.model';

export default {
  title: 'components/DeleteButton',
  component: DeleteButton,
  argTypes: {},
} as Meta<typeof DeleteButton>;

const Template: StoryFn<typeof DeleteButton> = (args) => (
  <DeleteButton {...args} />
);

export const Base = Template.bind({});

Base.args = {
  disabled: false,
} as DeleteButtonProps;
