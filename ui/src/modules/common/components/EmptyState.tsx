import { EmptyState as CommonEmptyState } from 'erxes-ui-utils';
import React from 'react';
import { __ } from '../utils';

type Props = {
  text: string;
  icon?: string;
  image?: string;
  size?: string;
  extra?: React.ReactNode;
  light?: boolean;
};

function EmptyState(props: Props) {
  return (
    <CommonEmptyState {...props} translator={__} />
  );
}

export default EmptyState;
