import { Meta, StoryFn } from '@storybook/react';
import CurrencyField from './CurrencyField';

export default {
  title: 'components/CurrencyField',
  component: CurrencyField,
  argTypes: {},
} as Meta<typeof CurrencyField>;

const Template: StoryFn<typeof CurrencyField> = (args) => <CurrencyField />;

export const Base = Template.bind({});

Base.args = {
  disabled: false,
};
