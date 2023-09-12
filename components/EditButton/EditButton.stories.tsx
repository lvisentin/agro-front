import { Meta, StoryFn } from "@storybook/react";
import EditButton from "./EditButton";
import { EditButtonProps } from "./EditButton.model";

export default {
  title: "components/EditButton",
  component: EditButton,
  argTypes: {},
} as Meta<typeof EditButton>;

const Template: StoryFn<typeof EditButton> = (args) => (
  <EditButton {...args} />
);

export const Base = Template.bind({});

Base.args = {
    disabled: false,
} as EditButtonProps;
