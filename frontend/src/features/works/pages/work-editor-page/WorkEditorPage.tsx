import React, { FC, memo } from 'react';

import classes from './WorkEditorPage.module.scss';
import { useWorkEditorState } from './useWorkEditorState';

const WorkEditorPageComponent: FC = () => {
 const { work, isSaving, isLoading, setWork, onWorkSave } = useWorkEditorState();

 return (
   <div className={`${classes['work-editor']}`}>

   </div>
 );
};

export const WorkEditorPage = memo(WorkEditorPageComponent);
