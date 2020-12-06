import { Calendar as CommonCalendar } from 'erxes-ui-utils';
import React from 'react';
import { IDateColumn } from '../types';
import { __ } from '../utils';

type Props = {
  renderContent: (
    renderMonths: () => React.ReactNode[],
    renderMiddleContent: () => React.ReactNode
  ) => React.ReactNode;
  renderColumn: (date: IDateColumn) => React.ReactNode;
};

class Calendar extends React.Component<Props> {
  render() {
    return <CommonCalendar {...this.props} translator={__} />
  }
}

export default Calendar;
