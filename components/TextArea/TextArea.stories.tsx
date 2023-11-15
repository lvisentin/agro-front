import { Meta, StoryFn } from '@storybook/react';
import TextArea from './TextArea';
import { TextAreaProps } from './TextArea.model';

export default {
  title: 'components/TextArea',
  component: TextArea,
  argTypes: {},
} as Meta<typeof TextArea>;

const Template: StoryFn<typeof TextArea> = (args) => <TextArea {...args} />;

export const Base = Template.bind({});

Base.args = {
  name: 'TextArea',
  label: 'TextArea',
  placeholder: 'TextArea',
} as TextAreaProps;
