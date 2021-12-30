import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import MapPopUpComponent from './mapPopUp';
import HoursPopUpComponent from './hoursPopUp';
import classes from './styles/header.module.css';

const HeaderComponent: FC = () => {
  const [popUp, setPopUp] = useState<boolean>(false);
  const [mapPopUp, setMapPopUp] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [hoursPopUp, setHoursPopUp] = useState<boolean>(false);
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  });

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const toggleHours = () => {
    setHoursPopUp(!hoursPopUp);
    setPopUp(!popUp);
  };

  const toggleMap = () => {
    setMapPopUp(!mapPopUp);
    setPopUp(!popUp);
  };

  return (
    <>
      <header className={classes.navigationPanel}>
        <div className={classes.container}>
          <nav className={classes.mainNav}>
            <Link href="/">
              <a className={classes.imgAnchor}>
                <Image
                  src="https://i.imgur.com/WIgvnFB.jpg"
                  height="85"
                  width="200"
                  className={classes.logo}
                  alt="Full size Sound-Insight company logo"
                  priority
                />
              </a>
            </Link>
            <ul className={classes.mainNavOptions}>
              <Link href="/">
                <a className={currentPath === '/' ? clsx(classes.link, classes.linkActive) : classes.link}>
                  HOME
                </a>
              </Link>
              <Link href="/services">
                <a className={currentPath === '/services' ? clsx(classes.link, classes.linkActive) : classes.link}>
                  SERVICES
                </a>
              </Link>
              <Link href="/products">
                <a className={currentPath === '/products' ? clsx(classes.link, classes.linkActive) : classes.link}>
                  PRODUCTS
                </a>
              </Link>
              <Link href="/brands">
                <a className={currentPath === '/brands' ? clsx(classes.link, classes.linkActive) : classes.link}>
                  BRANDS
                </a>
              </Link>
              <Link href="/about">
                <a className={currentPath === '/about' ? clsx(classes.link, classes.linkActive) : classes.link}>
                  ABOUT
                </a>
              </Link>
              <Link href="/contact">
                <a className={currentPath === '/contact' ? clsx(classes.link, classes.contactLinkActive, classes.contactLink) : clsx(classes.link, classes.contactLink)}>
                  CONTACT
                </a>
              </Link>
            </ul>
          </nav>
        </div>
      </header>
      <div className={classes.sidebarNavigation}>
        <div
          className={sidebarActive ? clsx(classes.sidebarActive, classes.sidebar) : classes.sidebar}
        >
          <section className={classes.navHeader}>
            <div
              className={sidebarActive ? clsx(classes.iconActive, classes.icon) : classes.icon}
              onClick={() => toggleSidebar()}
              onKeyPress={() => toggleSidebar()}
              role="menu"
              tabIndex={0}
            >
              <div className={classes.hamburger} />
            </div>
            <Link href="/">
              <a className={clsx(classes.link, classes.logoLink)}>
                <Image
                  src="https://i.imgur.com/6E05ibb.png"
                  height={50}
                  width={50}
                  className={classes.headerLogo}
                  alt="A smaller Sound-Insight company logo for mobile device"
                  priority
                />
              </a>
            </Link>
          </section>
          <section className={classes.sideNav}>
            <ul className={classes.sidebarMenu}>
              <Link href="/">
                <a
                  className={classes.link}
                  onClick={() => toggleSidebar()}
                  onKeyPress={() => toggleSidebar()}
                  role="menuitem"
                  tabIndex={0}
                >
                  HOME
                </a>
              </Link>
              <Link href="/services">
                <a
                  className={classes.link}
                  onClick={() => toggleSidebar()}
                  onKeyPress={() => toggleSidebar()}
                  role="menuitem"
                  tabIndex={0}
                >
                  SERVICES
                </a>
              </Link>
              <Link href="/products">
                <a
                  className={classes.link}
                  onClick={() => toggleSidebar()}
                  onKeyPress={() => toggleSidebar()}
                  role="menuitem"
                  tabIndex={0}
                >
                  PRODUCTS
                </a>
              </Link>
              <Link href="/brands">
                <a
                  className={classes.link}
                  onClick={() => toggleSidebar()}
                  onKeyPress={() => toggleSidebar()}
                  role="menuitem"
                  tabIndex={0}
                >
                  BRANDS
                </a>
              </Link>
              <Link href="/about">
                <a
                  className={classes.link}
                  onClick={() => toggleSidebar()}
                  onKeyPress={() => toggleSidebar()}
                  role="menuitem"
                  tabIndex={0}
                >
                  ABOUT
                </a>
              </Link>
              <Link href="/contact">
                <a
                  className={clsx(classes.link, classes.contactLink)}
                  onClick={() => toggleSidebar()}
                  onKeyPress={() => toggleSidebar()}
                  role="menuitem"
                  tabIndex={0}
                >
                  CONTACT
                </a>
              </Link>
            </ul>
          </section>
        </div>
      </div>
      {hoursPopUp && <HoursPopUpComponent closeHours={toggleHours} />}
      {mapPopUp && <MapPopUpComponent closeMap={toggleMap} />}
      {popUp === false && (
        <div className={classes.contactMenu}>
          <section className={classes.contactMenuOptions}>
            <div className={classes.email}>
              <a href="mailto:sales@sound-insight.com" className={classes.menuOption}>
                <Image src="https://i.imgur.com/SUphJ4h.png" alt="Email Icon to reach Sound-Insight via email" width={25} height={35} />
                <span>EMAIL</span>
              </a>
            </div>
            <div className={classes.phone}>
              <a target="_blank" href="tel:6312714434" rel="noopener noreferrer" className={classes.menuOption}>
                <Image src="https://i.imgur.com/eAxtt3I.png" alt="Telephone Icon to reach Sound-Insight via phone" width={25} height={35} />
                <span>CALL</span>
              </a>
            </div>
            <div
              className={clsx(classes.map, classes.menuOption)}
              onClick={() => toggleMap()}
              onKeyPress={() => toggleMap()}
              role="menuitem"
              tabIndex={0}
            >
              <Image src="https://i.imgur.com/oj6o3TY.png" alt="Map Icon to see where Sound-Insight is located" width={25} height={35} />
              <span>MAP</span>
            </div>
            <div
              className={clsx(classes.hours, classes.menuOption)}
              onClick={() => toggleHours()}
              onKeyPress={() => toggleHours()}
              role="menuitem"
              tabIndex={0}
            >
              <Image src="https://i.imgur.com/rx2GiBJ.png" alt="Clock Icon to view store hours" width={20} height={40} />
              <span>HOURS</span>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default HeaderComponent;
