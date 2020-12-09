import { Wrapper, Button, DataWithLoader, Icon, Tip, ModalTrigger, router, Sidebar } from 'erxes-ui-utils';
import { ActionButtons, SidebarListItem } from 'modules/settings/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { ICarCategory } from '../../types';


const { Section } = Wrapper.Sidebar;

interface IProps {
  history: any;
  queryParams: any;
  refetch: any;
  remove: (carCategoryId: string) => void;
  carCategories: ICarCategory[];
  carCategoriesCount: number;
  loading: boolean;
}

class List extends React.Component<IProps> {
  clearCategoryFilter = () => {
    router.setParams(this.props.history, { categoryId: null });
  };

  renderContent() {
    const { carCategories } = this.props;

    const result: React.ReactNode[] = [];

    for (const category of carCategories) {
      const order = category.order;

      const m = order.match(/[/]/gi);

      let space = '';

      if (m) {
        space = '\u00a0\u00a0'.repeat(m.length);
      }

      const name = category.isRoot ? (
        `${category.name} (${category.carCount})`
      ) : (
          <span>
            {category.name} ({category.carCount})
          </span>
        );

      result.push(
        <SidebarListItem
          key={category._id}
        >
          <Link to={`?categoryId=${category._id}`}>
            {space}
            {name}
          </Link>
          <ActionButtons>
          </ActionButtons>
        </SidebarListItem>
      );
    }

    return result;
  }

  renderCategoryHeader() {
    const trigger = (
      <Button
        btnStyle="success"
        uppercase={false}
        icon="plus-circle"
        block={true}
      >
        Add category
      </Button>
    );

    return (
      <>
        <Section.Title>
          {'Categories'}
          <Section.QuickButtons>
            {router.getParam(this.props.history, 'categoryId') && (
              <a href="#cancel" tabIndex={0} onClick={this.clearCategoryFilter}>
                <Tip text={'Clear filter'} placement="bottom">
                  <Icon icon="cancel-1" />
                </Tip>
              </a>
            )}
          </Section.QuickButtons>
        </Section.Title>
      </>
    );
  }

  renderCategoryList() {
    const { carCategoriesCount, loading } = this.props;

    return (
      <DataWithLoader
        data={this.renderContent()}
        loading={loading}
        count={carCategoriesCount}
        emptyText="There is no car category"
        emptyIcon="folder-2"
        size="small"
      />
    );
  }

  render() {
    return (
      <Sidebar>
        <Section
          maxHeight={188}
          collapsible={this.props.carCategoriesCount > 9}
        >
          {this.renderCategoryHeader()}
          {this.renderCategoryList()}
        </Section>
      </Sidebar>
    );
  }
}

export default List;
