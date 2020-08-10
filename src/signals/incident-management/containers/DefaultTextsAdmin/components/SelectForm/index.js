import React, { Fragment, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FormBuilder, FieldGroup } from 'react-reactive-form';

import { dataListType } from 'shared/types';
import { reCategory } from 'shared/services/resolveClassification';

import FieldControlWrapper from '../../../../components/FieldControlWrapper';
import SelectInput from '../../../../components/SelectInput';
import RadioInput from '../../../../components/RadioInput';
import HiddenInput from '../../../../components/HiddenInput';

const dummyCategories = [
  {
    name: 'Afval',
    id: '1',
    key: 'afval',
    value: 'Afval',
  },
  {
    name: 'Afval-2',
    id: '2',
    key: 'afval-2',
    value: 'Afval-2',
  },
];

const form = FormBuilder.group({
  id: [0],
  state: ['n'],
  sub_slug: ['asbest-accu'],
  main_slug: ['afval'],
});

const SelectForm = ({ subCategories, defaultTextsOptionList, onFetchDefaultTexts }) => {
  const categoryList = subCategories
    ? subCategories
        .filter(sub => sub.category_level_name1 !== null)
        .map(sub => {
          const { fk, category_level_name1, category_level_name2, category_level_name3, category_level_name4 } = sub;

          let value = '';

          if (category_level_name1) {
            value += category_level_name1;
          }
          if (category_level_name2) {
            value += '-' + category_level_name2;
          }
          if (category_level_name3) {
            value += '-' + category_level_name3;
          }
          if (category_level_name4) {
            value += '-' + category_level_name4;
          }

          return {
            id: fk,
            key: fk,
            value,
            name: value,
          };
        })
    : [];
  const handleChange = useCallback(
    changed => {
      const newValues = {
        ...form.value,
        ...changed,
      };

      console.log(newValues);

      onFetchDefaultTexts(newValues);
    },
    [onFetchDefaultTexts]
  );

  useEffect(() => {
    form.controls.id.valueChanges.subscribe(id => {
      // const found = subCategories.find(
      //   sub => sub._links && sub._links.self && sub._links.self.public && sub._links.self.public === category_url
      // );

      // /* istanbul ignore else */
      // if (found) {
      //   const [, main_slug, sub_slug] = found._links.self.public.match(reCategory);

      //   form.patchValue({
      //     sub_slug,
      //     main_slug,
      //   });

      //   handleChange({ id });
      // }

      handleChange({ id });
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
              display="Subcategorie"
              name="id"
              values={categoryList}
              control={form.get('id')}
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

            <FieldControlWrapper render={HiddenInput} name="sub_slug" control={form.get('sub_slug')} />
            <FieldControlWrapper render={HiddenInput} name="main_slug" control={form.get('main_slug')} />
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
