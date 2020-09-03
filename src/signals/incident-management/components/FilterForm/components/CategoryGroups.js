import React, { memo } from 'react';
import PropTypes from 'prop-types';

import * as types from 'shared/types';
import Label from 'components/Label';
import CheckboxList from '../../CheckboxList';

const CategoryGroups = ({ categories, filterSlugs, onChange, onToggle }) => (
  <CheckboxList
    defaultValue={filterSlugs}
    groupId="Category"
    groupName="main-category"
    groupValue="all"
    hasToggle
    key="main-category"
    name="main_category_slug"
    onChange={onChange}
    onToggle={onToggle}
    options={categories}
    title={<Label as="span">Categorie</Label>}
  />
);

CategoryGroups.defaultProps = {
  filterSlugs: [],
};

CategoryGroups.propTypes = {
  categories: PropTypes.array,
  filterSlugs: types.dataListType,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
};

export default memo(CategoryGroups);
