import { Meta, StoryFn } from "@storybook/react";
import InfoCard from "./InfoCard";
import { InfoCardProps } from "./InfoCard.model";

export default {
  title: "components/InfoCard",
  component: InfoCard,
  argTypes: {},
} as Meta<typeof InfoCard>;

const Template: StoryFn<typeof InfoCard> = (args) => (
  <InfoCard {...args} />
);

export const Base = Template.bind({});

Base.args = {
    title: 'InfoCard',
} as InfoCardProps;
