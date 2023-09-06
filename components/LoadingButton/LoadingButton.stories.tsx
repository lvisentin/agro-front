import { Meta, StoryFn } from "@storybook/react";
import LoadingButton, { LoadingButtonProps } from "./LoadingButton";

export default {
  title: "components/LoadingButton",
  component: LoadingButton,
  argTypes: {},
} as Meta<typeof LoadingButton>;

const Template: StoryFn<typeof LoadingButton> = (args) => (
  <LoadingButton {...args} />
);

export const Base = Template.bind({});

Base.args = {
    loading: false,
    children: <span>Loading Button</span>
} as LoadingButtonProps;
