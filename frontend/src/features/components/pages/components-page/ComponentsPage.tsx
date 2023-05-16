import React, { FC, memo } from 'react';
import {AuthModal} from "../../../../components/AuthModal";

const ComponentsPageComponents: FC = () => <AuthModal isOpen={true} setIsOpen={()=>{}}/>;

export const ComponentsPage = memo(ComponentsPageComponents);
