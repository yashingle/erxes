import { BoardSelect as CommonBoardSelect } from 'erxes-ui-utils';
import * as compose from 'lodash.flowright';
import React from 'react';
import { withProps, __ } from '../../common/utils';
import {
  BoardsQueryResponse,
  IStage,
  PipelinesQueryResponse,
  StagesQueryResponse
} from '../types';

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

class BoardSelectContainer extends React.Component<FinalProps> {
  render() {
    return <CommonBoardSelect {...this.props} translator={__} />;
  }
}

export default withProps<Props>(
  compose(
  )(BoardSelectContainer)
);
