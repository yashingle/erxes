import { Form as CommonForm } from 'erxes-ui-utils'
import { IFormProps } from 'modules/common/types';
import React from 'react';
import { __ } from '../../utils';

type Props = {
  renderContent: (props: IFormProps) => React.ReactNode;
  onSubmit?: (values: any) => any;
  autoComplete?: string;
};

class Form extends React.Component<Props, {}> {
  render() {
    return (
      <CommonForm
        {...this.props}
        translator={__}
      />
    );
  }
}

export default Form;
