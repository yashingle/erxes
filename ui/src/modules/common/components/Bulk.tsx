import { Bulk } from 'erxes-ui-utils';

export interface IBulkContentProps {
  isAllSelected: boolean;
  bulk: any[];
  emptyBulk: () => void;
  toggleBulk: (target: any, toAdd: boolean) => void;
  toggleAll: (targets: any[], containerId: string) => void;
}

export default Bulk
