import {
  FieldStyle,
  SidebarCounter,
  SidebarFlexRow,
  SidebarList
} from 'erxes-ui-utils';
import React from 'react';
import { ICar } from '../../types';

type Props = {
  car: ICar;
};

class DetailInfo extends React.Component<Props> {
  renderRow = (label, value) => {
    return (
      <li>
        <FieldStyle>{`${label}`}</FieldStyle>
        <SidebarCounter>{value || '-'}</SidebarCounter>
      </li>
    );
  };

  renderColor = (colorCode) => {
    return (
      <li>
        <FieldStyle>{`Color`}</FieldStyle>
        <SidebarCounter style={{ backgroundColor: colorCode, width: 30, height: 15 }} />
      </li>

    );
  }

  render() {
    const { car } = this.props;

    return (
      <SidebarList className="no-link">
        {this.renderRow('Plate number', car.plateNumber)}
        {this.renderRow('VIN number', car.vinNumber)}
        {this.renderRow('Category', car.category ? car.category.name : 'Unknown')}
        {this.renderColor(car.colorCode)}
        {this.renderRow('Vintage Year', car.vintageYear)}
        {this.renderRow('Import Year', car.importYear)}
        {this.renderRow('Body Type', car.bodyType)}
        {this.renderRow('Fuel Type', car.fuelType)}
        {this.renderRow('Gear Box', car.gearBox)}
        {this.renderRow(
          'Owner',
          car.owner && car.owner.details ? car.owner.details.fullName : '-'
        )}
        <SidebarFlexRow>
          {`Description`}:<span>{car.description || '-'}</span>
        </SidebarFlexRow>
      </SidebarList>
    );
  }
}

export default DetailInfo;
