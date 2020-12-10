import client from 'apolloClient';
import { ButtonMutate as CommonButtonMutate, SmallLoader } from 'erxes-ui-utils';
import { __ } from 'modules/common/utils';
import React from 'react';

type Props = {
  mutation: string;
  variables: any;
  btnSize?: string;
  uppercase?: boolean;
  successMessage?: string;
  btnStyle?: string;
  icon?: string;
  callback?: (data?: any) => void;
  children?: React.ReactNode;
  refetchQueries?: any;
  isSubmitted?: boolean;
  type?: string;
  disabled?: boolean;
  disableLoading?: boolean;
  block?: boolean;
  confirmationUpdate?: boolean;
  beforeSubmit?: () => void;
  resetSubmit?: () => void;
};

class ButtonMutate extends React.Component<Props, { isLoading: boolean }> {
  static defaultProps = {
    btnSize: 'medium',
    icon: 'check-circle'
  };

  render() {
    return <CommonButtonMutate
      {...this.props}
      client={client}
      translator={__}
    />
  }
}

export { SmallLoader };
export default ButtonMutate;
