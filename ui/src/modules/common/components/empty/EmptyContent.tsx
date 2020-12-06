import { EmptyContent as CommonEmptyContent } from 'erxes-ui-utils';
import { __ } from 'modules/common/utils';
import React from 'react';

type IProps = {
  content: any;
  vertical?: boolean;
  maxItemWidth?: string;
};

function EmptyContent(props: IProps) {
  return <CommonEmptyContent {...props} translator={__}/> ;
}

export default EmptyContent;
