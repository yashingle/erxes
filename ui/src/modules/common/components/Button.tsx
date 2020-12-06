import { Button as CommonButton } from 'erxes-ui-utils';
import { __ } from 'modules/common/utils';
import React from 'react';

type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  type?: string;
  btnStyle?: string;
  size?: string;
  disabled?: boolean;
  ignoreTrans?: boolean;
  block?: boolean;
  icon?: string;
  style?: any;
  id?: string;
  uppercase?: boolean;
  target?: string;
  group?: boolean;
};

export default class Button extends React.Component<ButtonProps> {
  static Group = CommonButton.Group;
  static defaultProps = CommonButton.defaultProps;

  render() {
    return (
      <CommonButton
        {...this.props}
        translator={!this.props.ignoreTrans ? __ : undefined}
      />
    );
  }
}
