import React, { FC } from 'react';
import classes from './styles/main.module.css';
import HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';

type Props = {
  children: any;
};

const MainContainer: FC<Props> = ({ children }) => (
  <div className={classes.mainContainer}>
    <HeaderComponent />
    {children}
    <FooterComponent />
  </div>
);

export default MainContainer;
