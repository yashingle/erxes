import { ControlLabel as CommonControlLabel } from 'erxes-ui-utils'
import { __ } from 'modules/common/utils';
import React from 'react';

type Props = {
  children: React.ReactNode | string;
  ignoreTrans?: boolean;
  htmlFor?: string;
  required?: boolean;
  uppercase?: boolean;
};

function ControlLabel(props: Props) {
  const { children, ignoreTrans } = props;

  let content = children;

  if (!ignoreTrans && typeof children === 'string') {
    content = __(children);
  }

  return (
    <CommonControlLabel {...props}>
      {content}
    </CommonControlLabel>
  );
}

export default ControlLabel;
