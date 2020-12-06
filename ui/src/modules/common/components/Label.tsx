import { Label as CommonLabel } from 'erxes-ui-utils';
import React from 'react';
import { __ } from '../utils';

type Props = {
  lblStyle?: string;
  lblColor?: string;
  children: React.ReactNode | string;
  className?: string;
  shake?: boolean;
  ignoreTrans?: boolean;
};

class Label extends React.Component<Props> {
  render() {
    const { ignoreTrans } = this.props;
    return <CommonLabel {...this.props} translator={!ignoreTrans ? __ : undefined} />;
  }
}

export default Label;
