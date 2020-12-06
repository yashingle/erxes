import { TextInfo as CommonTextInfo } from 'erxes-ui-utils';
import { __ } from 'modules/common/utils';
import React from 'react';

type Props = {
  children: React.ReactNode | string;
  ignoreTrans?: boolean;
  textStyle?: string;
  hugeness?: string;
};

class TextInfo extends React.PureComponent<Props> {
  render() {
    const { ignoreTrans } = this.props;

    return (
      <CommonTextInfo {...this.props} translator={!ignoreTrans ? __ : undefined}/>
    );
  }
}

export default TextInfo;
