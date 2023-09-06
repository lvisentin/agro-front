import { Meta, StoryFn } from "@storybook/react";
import TermsAndConditionsModal from "./TermsAndConditionsModal";

export default {
  title: "components/TermsAndConditionsModal",
  component: TermsAndConditionsModal,
  argTypes: {},
} as Meta<typeof TermsAndConditionsModal>;

const Template: StoryFn<typeof TermsAndConditionsModal> = (args: any) => (
  <TermsAndConditionsModal {...args}/>
);

export const Base = Template.bind({});

Base.args = {
  className: 'modal opacity-100'
};
