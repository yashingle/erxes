import { ItemChooser as Chooser } from 'erxes-ui-utils';
import { CommonProps } from 'modules/common/components/Chooser';
import { __ } from 'modules/common/utils';
import React from 'react';

type Props = {
  boardId?: string;
  pipelineId?: string;
  stageId?: string;
  filterStageId?: (
    stageId?: string,
    boardId?: string,
    pipelineId?: string
  ) => void;
} & CommonProps;

class ItemChooser extends React.Component<Props> {
  render() {
    return <Chooser {...this.props} translator={__} />;
  }
}

export default ItemChooser;
