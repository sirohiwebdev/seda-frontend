import React, { Fragment, useEffect, useCallback, useState } from 'react';
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
  level1: [''],
  level2: [''],
  level3: [''],
  level4: [''],
  state: ['n'],
  sub_slug: ['asbest-accu'],
  main_slug: ['afval'],
});
function getUnique(arr, comp) {
  // store the comparison  values in array
  const unique = arr
    .map(e => e[comp])

    // store the indexes of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the false indexes & return unique objects
    .filter(e => arr[e])
    .map(e => arr[e]);

  return unique;
}

const getCategoriesHeirarchy = (categories, hierarchy = 1, filter = undefined) => {
  let c = [];
  if (filter) {
    c = categories
      .filter(
        sub =>
          sub[`category_level_name${hierarchy}`] !== null &&
          sub[`category_level_name${hierarchy > 1 ? hierarchy - 1 : 1}`] === filter
      )
      .map(sub => {
        const { fk } = sub;
        const level = sub[`category_level_name${hierarchy}`];

        return {
          key: level,
          value: level,
          name: level,
        };
      });
  } else {
    c = categories
      .filter(sub => sub[`category_level_name${hierarchy}`] !== null)
      .map(sub => {
        const { fk } = sub;
        const level = sub[`category_level_name${hierarchy}`];
        return {
          key: level,
          value: level,
          name: level,
        };
      });
  }

  return c.length ? [{ name: '' }, ...getUnique(c, 'name')] : [];
};

const SelectForm = ({ subCategories, defaultTextsOptionList, onFetchDefaultTexts }) => {
  const [category1, setCategory1] = useState(null);
  const [category2, setCategory2] = useState(null);
  const [category3, setCategory3] = useState(null);
  const [category4, setCategory4] = useState(null);

  // const categoryList = subCategories ? getCategoriesHeirarchy() : [];
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
      handleChange({ id });
    });

    form.controls.level1.valueChanges.subscribe(level1 => {
      console.log(level1);
      setCategory1(level1);
    });
    form.controls.level2.valueChanges.subscribe(level2 => {
      setCategory2(level2);
    });
    form.controls.level3.valueChanges.subscribe(level3 => {
      setCategory3(level3);
    });
    form.controls.level4.valueChanges.subscribe(level4 => {
      setCategory4(level4);
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
              display="Subcategorie 1"
              name="level1"
              values={getCategoriesHeirarchy(subCategories, 1)}
              control={form.get('level1')}
              emptyOptionText="Kies"
              sort
            />
            {category1 && getCategoriesHeirarchy(subCategories, 2, category1).length && (
              <FieldControlWrapper
                render={SelectInput}
                display="Subcategorie 2"
                name="level2"
                values={getCategoriesHeirarchy(subCategories, 2, category1)}
                control={form.get('level2')}
                emptyOptionText="Kies"
                sort
              />
            )}

            {category2 && getCategoriesHeirarchy(subCategories, 3, category2).length && (
              <FieldControlWrapper
                render={SelectInput}
                display="Subcategorie 3"
                name="level3"
                values={getCategoriesHeirarchy(subCategories, 3, category2)}
                control={form.get('level3')}
                emptyOptionText="Kies"
                sort
              />
            )}
            {category3 && getCategoriesHeirarchy(subCategories, 4, category3).length && (
              <FieldControlWrapper
                render={SelectInput}
                display="Subcategorie 4"
                name="level4"
                values={getCategoriesHeirarchy(subCategories, 4, category3)}
                control={form.get('level4')}
                emptyOptionText="Kies"
                sort
              />
            )}

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
