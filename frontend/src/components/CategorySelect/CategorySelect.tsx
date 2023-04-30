import React, { FC, useState } from 'react';

import { typedMemo } from 'src/core/utils/typed-memo';
import { Category } from 'src/core/models/category';
import { Typography } from 'antd';

import classes from './CategorySelect.module.scss';

const { Text } = Typography;

type Props = Readonly<{

  /** Массив категорий навыков. */
  categories: readonly Category[];

  /** Ф-ция изменения выбранных категорий. */
  onChange: (selectedIds: number[]) => void;
}>;

// Компонент Панель выбора категорий навыков (фильтр по категориям)
const CategorySelectComponent: FC<Props> = props => {
  // Категории
  const [categories, setCategories] = useState(props.categories);

  // Ф-ция выбора/развыбора категории
  const onToggle = (categoryId: number) => {
    const newCategories = [...categories];
    const toggleCategoryIndex = newCategories.findIndex(category => category.id === categoryId);

    if (toggleCategoryIndex > -1) {
      newCategories[toggleCategoryIndex].checked = !newCategories[toggleCategoryIndex].checked;
    }

    setCategories(newCategories);
    props.onChange(newCategories.filter(category => category.checked).map(category => category.id));
  };

  return (<div className={classes.category_select}>
    {categories.map((category, i) =>
      <div className={`${classes.category_select__item} ${category.checked ? classes.checked : ''}`}
        key={i}
        onClick={() => onToggle(category.id)}
        style={{ backgroundColor: category.checked ? category.backgroundColor : undefined }}>
        <Text className={classes.category_select__item_name}
          style={{ color: category.checked ? category.fontColor : undefined }}>
          {category.name}
        </Text>
      </div>)}
  </div>);
};

// Компонент Панель выбора категорий навыков (фильтро по категориям)
export const CategorySelect = typedMemo(CategorySelectComponent);
