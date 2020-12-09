const carFields = `
  _id
  plateNumber
  categoryId
  category{
    code
    name
  }
  customers{
    _id
  }
  owner {
    email
  }
  getTags{
    _id
  }
`;

const listParamsDef = `
  $page: Int
  $perPage: Int
  $segment: String
  $categoryId: String
  $tag: String
  $ids: [String]
  $searchValue: String
  $brand: String
  $sortField: String
  $sortDirection: Int
`;

const listParamsValue = `
  page: $page
  perPage: $perPage
  segment: $segment
  categoryId: $categoryId
  tag: $tag
  ids: $ids
  searchValue: $searchValue
  brand: $brand
  sortField: $sortField
  sortDirection: $sortDirection
`;

export const cars = `
  query cars(${listParamsDef}) {
    cars(${listParamsValue}) {
      ${carFields}
    }
  }
`;

export const carsMain = `
  query carsMain(${listParamsDef}) {
    carsMain(${listParamsValue}) {
      list {
        ${carFields}
      }

      totalCount
    }
  }
`;

export const carCounts = `
  query carCounts(${listParamsDef}, $only: String) {
    carCounts(${listParamsValue}, only: $only)
  }
`;

const carCategories = `
  query carCategories {
    carCategories {
      _id
      name
      order
      code
      parentId
      description

      isRoot
      carCount
    }
  }
`;

const carCategoriesCount = `
  query carCategoriesTotalCount {
    carCategoriesTotalCount
  }
`;

const carCategoryDetail = `
  query carCategoryDetail($_id: String) {
    carCategoryDetail(_id: $_id) {
      _id
      name
      carCount
    }
  }
`;

export const carDetail = `
  query carDetail($_id: String!) {
    carDetail(_id: $_id) {
      ${carFields}
      customers {
        _id
        firstName
        lastName
        primaryEmail
        primaryPhone
      }
      companies {
        _id
        primaryName
        website
      }
    }
  }
`;

const tags = `
  query tags($type: String) {
    tags(type: $type) {
      _id
      name
      colorCode
    }
  }
`;

export const carsListConfig = `
  query {
    fieldsDefaultColumnsConfig(contentType: "car") {
      name
      label
      order
    }
  }
`;

const carsExport = `
  query carsExport(${listParamsDef}) {
    carsExport(${listParamsValue})
  }
`;

export default {
  cars,
  carsMain,
  carCounts,
  carDetail,
  tags,
  carsListConfig,
  carsExport,
  carCategories,
  carCategoriesCount,
  carCategoryDetail
};
