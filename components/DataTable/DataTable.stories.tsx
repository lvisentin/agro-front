import { Meta, StoryFn } from '@storybook/react';
import DataTable from './DataTable';
import { DataTableProps } from './DataTable.model';

export default {
  title: 'components/DataTable',
  component: DataTable,
  argTypes: {},
} as Meta<typeof DataTable>;

const Template: StoryFn<typeof DataTable> = (args) => <DataTable {...args} />;

export const Base = Template.bind({});

Base.args = {
  columns: [
    {
      field: 'id',
      name: 'Código',
    },
    {
      field: 'description',
      name: 'Descrição',
    },
    {
      field: 'value',
      name: 'Valor',
    },
  ],
  data: [
    {
      id: 1,
      name: 'Planta',
      value: 59.9,
    },
  ],
} as DataTableProps;
