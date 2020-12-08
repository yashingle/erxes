import { ModalTrigger as CommonModalTrigger } from 'erxes-ui-utils';
import { IRouterProps } from 'erxes-ui-utils/lib/components/types';
import { __ } from 'modules/common/utils';
import React from 'react';
import { withRouter } from 'react-router-dom';

type Props = {
  title: string;
  trigger?: React.ReactNode;
  autoOpenKey?: string;
  content: ({ closeModal }: { closeModal: () => void }) => void;
  size?: 'sm' | 'lg' | 'xl';
  ignoreTrans?: boolean;
  dialogClassName?: string;
  backDrop?: 'static' | boolean;
  enforceFocus?: boolean;
  hideHeader?: boolean;
  isOpen?: boolean;
  history: any;
  paddingContent?: 'less-padding';
  centered?: boolean;
  onExit?: () => void;
  isAnimate?: boolean;
} & IRouterProps;

class ModalTrigger extends React.Component<Props> {
  render() {
    return <CommonModalTrigger {...this.props} translator={!this.props.ignoreTrans ? __ : undefined} />
  }
}

export default withRouter(ModalTrigger);
