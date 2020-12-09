import { FormControl } from 'erxes-ui-utils';
import React from 'react';
import { ICar } from '../../types';

type Props = {
  car: ICar;
  history: any;
  isChecked: boolean;
  toggleBulk: (car: ICar, isChecked?: boolean) => void;
};

function CarRow({ car, history, isChecked, toggleBulk }: Props) {
  const onTrClick = () => {
    history.push(`/erxes-plugin-car/details/${car._id}`);
  };

  return (
    <tr onClick={onTrClick}>
      <td>{car.plateNumber || '9999'}</td>
      <td>{car.vinNumber || '0000'}</td>
    </tr>
  );
}

export default CarRow;
