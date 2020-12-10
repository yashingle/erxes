import { BoardSelect as CommonBoarSelect } from 'erxes-ui-utils';
import { PipelinesQueryResponse } from 'erxes-ui-utils/lib/boards/types';
import { __ } from 'modules/common/utils';
import React from 'react';
import { BoardsQueryResponse, IStage, StagesQueryResponse } from '../types';

type Props = {
  type: string;
  stageId?: string;
  boardId: string;
  pipelineId: string;
  callback?: () => void;
  onChangeStage?: (stageId: string) => void;
  onChangePipeline: (pipelineId: string, stages: IStage[]) => void;
  onChangeBoard: (boardId: string) => void;
  autoSelectStage?: boolean;
};

type FinalProps = {
  boardsQuery: BoardsQueryResponse;
  pipelinesQuery: PipelinesQueryResponse;
  stagesQuery: StagesQueryResponse;
} & Props;


class BoardSelect extends React.Component<FinalProps> {
  render() {
    return <CommonBoarSelect {...this.props} translator={__}/>
  }
}
export default BoardSelect;
