import { Wrapper, Button, DataWithLoader, Icon, Tip, ModalTrigger, router, Sidebar, mainStyles } from 'erxes-ui-utils';
import { ActionButtons, SidebarListItem } from 'modules/settings/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { ICarCategory } from '../../types';
import CategoryForm from '../../containers/category/Form'


const { Section } = Wrapper.Sidebar;
const { TopHeader } = mainStyles

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
  renderFormTrigger(trigger: React.ReactNode, category?: ICarCategory) {
    const content = props => (
      <CategoryForm
        {...props}
        category={category}
        categories={this.props.carCategories}
      />
    );

    return (
      <ModalTrigger title="Add category" trigger={trigger} content={content} />
    );
  }

  clearCategoryFilter = () => {
    router.setParams(this.props.history, { categoryId: null });
  };

  isActive = (id: string) => {
    const { queryParams } = this.props;
    const currentGroup = queryParams.categoryId || '';

    return currentGroup === id;
  };

  renderEditAction(category: ICarCategory) {
    const trigger = (
      <Button btnStyle="link">
        <Tip text={'Edit'} placement="bottom">
          <Icon icon="edit" />
        </Tip>
      </Button>
    );

    return this.renderFormTrigger(trigger, category);
  }

  renderRemoveAction(category: ICarCategory) {
    const { remove } = this.props;

    return (
      <Button btnStyle="link" onClick={remove.bind(null, category._id)}>
        <Tip text={'Remove'} placement="bottom">
          <Icon icon="cancel-1" />
        </Tip>
      </Button>
    );
  }

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
            {this.renderEditAction(category)}
            {this.renderRemoveAction(category)}
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
        <TopHeader>{this.renderFormTrigger(trigger)}</TopHeader>
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
