import { Meta, StoryFn } from "@storybook/react";
import SelectField from "./SelectField";
import { SelectFieldProps } from "./SelectField.model";

export default {
  title: "components/SelectField",
  component: SelectField,
  argTypes: {},
} as Meta<typeof SelectField>;

const Template: StoryFn<typeof SelectField> = (args) => (
  <SelectField {...args} />
);

export const Base = Template.bind({});

Base.args = {
    disabled: false,
} as SelectFieldProps;
