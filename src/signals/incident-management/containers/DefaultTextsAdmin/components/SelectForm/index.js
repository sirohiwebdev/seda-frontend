import React, { Fragment, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FieldGroup, FormBuilder } from 'react-reactive-form';

import { dataListType } from 'shared/types';

import FieldControlWrapper from '../../../../components/FieldControlWrapper';
import SelectInput from '../../../../components/SelectInput';
import RadioInput from '../../../../components/RadioInput';

const form = FormBuilder.group({
  id: [0],
  category: ['Afval/Afvalbakken/Afvalbak/Aanplak'],
  state: ['o'],
});

const SelectForm = ({ subCategories, defaultTextsOptionList, onFetchDefaultTexts }) => {
  const categories = useMemo(
    () =>
      subCategories.map(category => {
        const {
          filter_label,
          category_level_name1,
          category_level_name2,
          category_level_name3,
          category_level_name4,
        } = category;

        let value = '';
        if (category_level_name1) {
          value = value.concat(category_level_name1);
        }
        if (category_level_name2) {
          value = value.concat('/').concat(category_level_name2);
        }
        if (category_level_name3) {
          value = value.concat('/').concat(category_level_name3);
        }
        if (category_level_name4) {
          value = value.concat('/').concat(category_level_name4);
        }

        return { name: filter_label, value: filter_label, key: value };
      }),
    [subCategories]
  );
  // const categoryList = subCategories ? getCategoriesHierarchy() : [];
  const handleChange = useCallback(
    changed => {
      const newValues = {
        ...form.value,
        ...changed,
      };
      onFetchDefaultTexts(newValues);
    },
    [onFetchDefaultTexts]
  );

  useEffect(() => {
    form.controls.id.valueChanges.subscribe(id => {
      handleChange({ id });
    });

    form.controls.category.valueChanges.subscribe(category => {
      handleChange({ category });
    });

    form.controls.state.valueChanges.subscribe(state => {
      handleChange({ state });
    });

    form.updateValueAndValidity();
    handleChange({});

    return () => {
      form.controls.id.valueChanges.unsubscribe();
      form.controls.state.valueChanges.unsubscribe();
    };
  }, [handleChange, subCategories]);

  useEffect(() => {
    // subs = subCategories;
    form.updateValueAndValidity();
  }, [subCategories]);

  return (
    <Fragment>
      <FieldGroup
        control={form}
        render={() => (
          <form data-testid="selectFormForm" className="select-form__form">
            <FieldControlWrapper
              render={SelectInput}
              display="Categorie"
              name="category"
              defaultValue={categories[0].key}
              values={categories}
              control={form.get('category')}
              emptyOptionText="Kies"
              sort
            />

            <FieldControlWrapper
              display="Status"
              render={RadioInput}
              name="state"
              values={defaultTextsOptionList}
              control={form.get('state')}
            />
          </form>
        )}
      />
    </Fragment>
  );
};

SelectForm.propTypes = {
  subCategories: dataListType.isRequired,
  defaultTextsOptionList: dataListType.isRequired,

  onFetchDefaultTexts: PropTypes.func.isRequired,
};

export default SelectForm;
