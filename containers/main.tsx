import useSWR from 'swr'
import React from 'react';
import classes from './styles/main.module.css';
import HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import { CompletePageData } from '../types/completePageData.type';

type Props = {
  children: any
}

const MainContainer = ({ children }: Props) => {
  return (
    <div className={classes.mainContainer}>
      <HeaderComponent />
      {children}
      <FooterComponent />
    </div>
  )
}

export default MainContainer;