const generateFilter = async (models, params, commonQuerySelector) => {
  const filter: any = commonQuerySelector;

  if (params.categoryId) {
    filter.categoryId = params.categoryId;
  }

  if (params.searchValue) {
    filter.searchText = { $in: [new RegExp(`.*${params.searchValue}.*`, 'i')] }
  }

  if (params.ids) {
    filter._id = { $in: params.ids };
  }

  if (params.tag) {
    filter.tagIds = { $in: [params.tag] };
  }

  if (params.brand) {
    filter.brandIds = { $in: [params.brand] };
  }

  if (params.conformityMainTypeId && params.conformityMainType && params.conformityIsSaved) {
    filter._id = { $in: await models.Conformities.savedConformity({ mainType: params.conformityMainType, mainTypeId: params.conformityMainTypeId, relTypes: ['car'] }) }
  }
  if (params.conformityMainTypeId && params.conformityMainType && params.conformityIsRelated) {
    filter._id = { $in: await models.Conformities.relatedConformity({ mainType: params.conformityMainType, mainTypeId: params.conformityMainTypeId, relType: 'car' }) }
  }

  return filter;
}

const carQueries = [
  /**
   * Cars list
   */
  {
    name: 'cars',
    handler: async (_root, params, { commonQuerySelector, models, checkPermission, user }) => {
      await checkPermission('showCars', user);
      // return paginate(models.Cars.find(await generateFilter(models, params, commonQuerySelector)), {
      //   page: params.page,
      //   perPage: params.perPage
      // });

      return models.Cars.find(await generateFilter(models, params, commonQuerySelector));
    }
  },

  /**
   * Cars for only main list
   */
  {
    name: 'carsMain',
    handler: async (_root, params, { commonQuerySelector, models, checkPermission, user }) => {
      await checkPermission('showCars', user);
      const filter = await generateFilter(models, params, commonQuerySelector);

      // return {
      //   list: paginate(models.Cars.find(filter), {
      //     page: params.page,
      //     perPage: params.perPage
      //   }),
      //   totalCount: models.Cars.find(filter).count()
      // };
      return {
        list: models.Cars.find(filter),
        totalCount: models.Cars.find(filter).count()
      };
    }
  },

  /**
   * Get one car
   */
  {
    name: 'carDetail',
    handler: async (_root, { _id }, { models, checkPermission, user }) => {
      await checkPermission('showCars', user);
      return models.Cars.getCar(models, _id);
    }
  },

  {
    name: 'carCategories',
    handler: async (
      _root,
      { parentId, searchValue },
      { commonQuerySelector, models, checkPermission, user },
    ) => {
      await checkPermission('showCars', user);
      const filter: any = commonQuerySelector;

      if (parentId) {
        filter.parentId = parentId;
      }

      if (searchValue) {
        filter.name = new RegExp(`.*${searchValue}.*`, 'i');
      }

      return models.CarCategories.find(filter).sort({ order: 1 });
    }
  },

  {
    name: 'carCategoriesTotalCount',
    handler: async (_root, _param, { models, checkPermission, user }) => {
      await checkPermission('showCars', user);
      return models.CarCategories.find().countDocuments();
    }
  },

  {
    name: 'carCategoryDetail',
    handler: async (_root, { _id }, { models, checkPermission, user }) => {
      await checkPermission('showCars', user);
      return models.CarCategories.findOne({ _id });
    }
  },

]

export default carQueries;