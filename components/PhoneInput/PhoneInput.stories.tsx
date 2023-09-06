import { Meta, StoryFn } from "@storybook/react";
import PhoneInput from "./PhoneInput";
import { PhoneInputProps } from "./PhoneInput.model";

export default {
  title: "components/PhoneInput",
  component: PhoneInput,
  argTypes: {},
} as Meta<typeof PhoneInput>;

const Template: StoryFn<typeof PhoneInput> = (args) => <PhoneInput {...args} />;

export const Base = Template.bind({});

Base.args = {
  mask: "(99) 99999\\-9999",
  maskChar: "",
  label: "Phone",
  placeholder: "Phone",
} as PhoneInputProps;
