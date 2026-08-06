import { FC, ReactNode } from 'react';
import HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';

type Props = {
  children: ReactNode;
};

const MainContainer: FC<Props> = ({ children }) => (
  <>
    <a href="#main" className="skipLink">Skip to main content</a>
    <HeaderComponent />
    <main id="main">{children}</main>
    <FooterComponent />
  </>
);

export default MainContainer;
