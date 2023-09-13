import { Meta, StoryFn } from "@storybook/react";
import SecondaryButton from "./SecondaryButton";
import { SecondaryButtonProps } from "./SecondaryButton.model";

export default {
  title: "components/SecondaryButton",
  component: SecondaryButton,
  argTypes: {},
} as Meta<typeof SecondaryButton>;

const Template: StoryFn<typeof SecondaryButton> = (args) => (
  <SecondaryButton {...args} />
);

export const Base = Template.bind({});

Base.args = {
    disabled: false,
} as SecondaryButtonProps;
