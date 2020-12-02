import Button from 'modules/common/components/Button';
import {
  ControlLabel,
  FormControl,
  FormGroup
} from 'modules/common/components/form';
import Form from 'modules/common/components/form/Form';
import Info from 'modules/common/components/Info';
import { Tabs, TabTitle } from 'modules/common/components/tabs';
import EditorCK from 'modules/common/containers/EditorCK';
import { ModalFooter } from 'modules/common/styles/main';
import { IButtonMutateProps, IFormProps } from 'modules/common/types';
import { __ } from 'modules/common/utils';
import React from 'react';
import styled from 'styled-components';
import { IBrand } from '../../brands/types';

const ContentWrapper = styled.div`
  margin-top: 20px;
`;

type Props = {
  brand: IBrand;
  defaultTemplate: string;
  closeModal: () => void;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
};

type State = {
  template: string;
  currentTab: string;
};

class Config extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { template, type } = props.brand.emailConfig;

    this.state = {
      template: template || props.defaultTemplate,
      currentTab: type || 'simple'
    };
  }

  onTabClick = currentTab => {
    this.setState({ currentTab });
  };

  onEditorChange = e => {
    this.setState({ template: e.editor.getData() });
  };

  generateDoc = (values: { fromEmail: string }) => {
    const { currentTab, template } = this.state;

    return {
      _id: this.props.brand._id,
      emailConfig: {
        type: currentTab,
        template,
        fromEmail: values.fromEmail
      }
    };
  };

  templateControl() {
    const { currentTab } = this.state;

    if (currentTab === 'custom') {
      return (
        <ContentWrapper>
          <EditorCK
            content={this.state.template}
            onChange={this.onEditorChange}
            autoGrow={true}
            name={`email_config_${this.props.brand._id}`}
          />
        </ContentWrapper>
      );
    }

    return (
      <ContentWrapper>
        <Info>
          {__('Your email will be sent with Erxes email template') + '.'}
        </Info>
      </ContentWrapper>
    );
  }

  renderContent = (formProps: IFormProps) => {
    const { renderButton, closeModal, brand } = this.props;
    const { currentTab } = this.state;
    const { values, isSubmitted } = formProps;

    const simpleOnClick = () => this.onTabClick('simple');
    const customOnClick = () => this.onTabClick('custom');

    return (
      <>
        <FormGroup>
          <ControlLabel>From email</ControlLabel>
          <FormControl
            {...formProps}
            name="fromEmail"
            defaultValue={brand.emailConfig.fromEmail}
          />
        </FormGroup>
        <Tabs full={true}>
          <TabTitle
            className={currentTab === 'simple' ? 'active' : ''}
            onClick={simpleOnClick}
          >
            {__('Simple')}
          </TabTitle>
          <TabTitle
            className={currentTab === 'custom' ? 'active' : ''}
            onClick={customOnClick}
          >
            {__('Custom')}
          </TabTitle>
        </Tabs>
        {this.templateControl()}

        <ModalFooter>
          <Button btnStyle="simple" onClick={closeModal} icon="cancel-1">
            Cancel
          </Button>

          {renderButton({
            name: 'email appearance',
            values: this.generateDoc(values),
            isSubmitted,
            callback: closeModal
          })}
        </ModalFooter>
      </>
    );
  };

  render() {
    return <Form renderContent={this.renderContent} />;
  }
}

export default Config;
