import { CommonChooser as Chooser } from 'erxes-ui-utils';
import { __ } from 'modules/common/utils';
import { ICompany } from 'modules/companies/types';
import { ICustomer } from 'modules/customers/types';
import React from 'react';

export type CommonProps = {
  data: any;
  search: (value: string, reload?: boolean) => void;
  datas: any[];
  title: string;
  renderName: (data: any) => void;
  renderForm: (props: { closeModal: () => void }) => any;
  perPage: number;
  clearState: () => void;
  limit?: number;
  newItem?: string | ICompany | ICustomer;
  resetAssociatedItem?: () => void;
  closeModal: () => void;
  onSelect: (datas: any[]) => void;
};

type Props = {
  renderFilter?: () => any;
} & CommonProps;

class CommonChooser extends React.Component<Props> {
  render() {
    return (
    <Chooser { ...this.props} translator={__}/>
    );
  }
}

export default CommonChooser;
