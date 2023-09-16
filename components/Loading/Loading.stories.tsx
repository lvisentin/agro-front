import { Meta, StoryFn } from '@storybook/react';
import Loading from './Loading';

export default {
  title: 'components/Loading',
  component: Loading,
  argTypes: {},
} as Meta<typeof Loading>;

const Template: StoryFn<typeof Loading> = () => <Loading />;

export const Base = Template.bind({});

Base.args = {};
