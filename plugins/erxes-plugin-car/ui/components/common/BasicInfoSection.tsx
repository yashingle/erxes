import {
  Alert, Sidebar, Button, colors, confirm, dimensions, DropdownToggle, Icon, mainStyles, ModalTrigger
} from 'erxes-ui-utils';
// import CarForm from '../../containers/CarForm';
import React from 'react';
import { Name } from '../../styles';

import { ICar } from '../../types';
import DetailInfo from './DetailInfo';

type Props = {
  car: ICar;
  remove: () => void;
};

class BasicInfoSection extends React.Component<Props> {
  // renderAction() {
  //   const { remove } = this.props;

  //   const onDelete = () =>
  //     confirm()
  //       .then(() => remove())
  //       .catch(error => {
  //         Alert.error(error.message);
  //       });

  //   return (
  //     <Action>
  //       <Dropdown>
  //         <Dropdown.Toggle as={DropdownToggle} id="dropdown-info">
  //           <Button btnStyle="simple" size="medium">
  //             {'Action'}
  //             <Icon icon="angle-down" />
  //           </Button>
  //         </Dropdown.Toggle>
  //         <Dropdown.Menu>
  //           <li>
  //             <a href="#delete" onClick={onDelete}>
  //               {'Delete'}
  //             </a>
  //           </li>
  //         </Dropdown.Menu>
  //       </Dropdown>
  //     </Action>
  //   );
  // }

  render() {
    const { Section } = Sidebar;
    const { car } = this.props;

    // const content = props => <CarForm {...props} car={car} />;

    return (
      <Sidebar.Section>
        <mainStyles.InfoWrapper>
          <Name>{car.plateNumber}</Name>
        </mainStyles.InfoWrapper>

        {/* {this.renderAction()} */}
        <Section>
          <DetailInfo car={car} />
        </Section>

      </Sidebar.Section>
    );
  }
}

export default BasicInfoSection;
