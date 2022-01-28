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
                  priority
                  height="85"
                  width="200"
                  className={classes.logo}
                  alt="Full size Sound-Insight company logo"
                  src="https://res.cloudinary.com/sound-insight/image/upload/v1640911039/WIgvnFB_swl61h.jpg"
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
              <Link href="/gallery">
                <a className={currentPath === '/gallery' ? clsx(classes.link, classes.linkActive) : classes.link}>
                  GALLERY
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
              role="menu"
              tabIndex={0}
              onClick={() => toggleSidebar()}
              onKeyPress={() => toggleSidebar()}
              className={sidebarActive ? clsx(classes.iconActive, classes.icon) : classes.icon}
            >
              <div className={classes.hamburger} />
            </div>
            <Link href="/">
              <a className={clsx(classes.link, classes.logoLink)}>
                <Image
                  priority
                  width={50}
                  height={50}
                  className={classes.headerLogo}
                  alt="A smaller Sound-Insight company logo for mobile device"
                  src="https://res.cloudinary.com/sound-insight/image/upload/v1640911057/6E05ibb_y99vcn.png"
                />
              </a>
            </Link>
          </section>
          <section className={classes.sideNav}>
            <ul className={classes.sidebarMenu}>
              <Link href="/">
                <a
                  tabIndex={0}
                  role="menuitem"
                  className={classes.link}
                  onClick={() => toggleSidebar()}
                  onKeyPress={() => toggleSidebar()}
                >
                  HOME
                </a>
              </Link>
              <Link href="/services">
                <a
                  tabIndex={0}
                  role="menuitem"
                  className={classes.link}
                  onClick={() => toggleSidebar()}
                  onKeyPress={() => toggleSidebar()}
                >
                  SERVICES
                </a>
              </Link>
              <Link href="/products">
                <a
                  tabIndex={0}
                  role="menuitem"
                  className={classes.link}
                  onClick={() => toggleSidebar()}
                  onKeyPress={() => toggleSidebar()}
                >
                  PRODUCTS
                </a>
              </Link>
              <Link href="/gallery">
                <a
                  tabIndex={0}
                  role="menuitem"
                  className={classes.link}
                  onClick={() => toggleSidebar()}
                  onKeyPress={() => toggleSidebar()}
                >
                  GALLERY
                </a>
              </Link>
              <Link href="/about">
                <a
                  tabIndex={0}
                  role="menuitem"
                  className={classes.link}
                  onClick={() => toggleSidebar()}
                  onKeyPress={() => toggleSidebar()}
                >
                  ABOUT
                </a>
              </Link>
              <Link href="/contact">
                <a
                  tabIndex={0}
                  role="menuitem"
                  onClick={() => toggleSidebar()}
                  onKeyPress={() => toggleSidebar()}
                  className={clsx(classes.link, classes.contactLink)}
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
                <Image src="https://res.cloudinary.com/sound-insight/image/upload/v1640911039/SUphJ4h_lh9hqk.png" alt="Email Icon to reach Sound-Insight via email" width={25} height={40} />
                <span>EMAIL</span>
              </a>
            </div>
            <div className={classes.phone}>
              <a target="_blank" href="tel:6312714434" rel="noopener noreferrer" className={classes.menuOption}>
                <Image src="https://res.cloudinary.com/sound-insight/image/upload/v1640911057/eAxtt3I_dec3oc.png" alt="Telephone Icon to reach Sound-Insight via phone" width={25} height={40} />
                <span>CALL</span>
              </a>
            </div>
            <div
              tabIndex={0}
              role="menuitem"
              onClick={() => toggleMap()}
              onKeyPress={() => toggleMap()}
              className={clsx(classes.map, classes.menuOption)}
            >
              <Image src="https://res.cloudinary.com/sound-insight/image/upload/v1640911057/oj6o3TY_wzamok.png" alt="Map Icon to see where Sound-Insight is located" width={25} height={40} />
              <span>MAP</span>
            </div>
            <div
              tabIndex={0}
              role="menuitem"
              onClick={() => toggleHours()}
              onKeyPress={() => toggleHours()}
              className={clsx(classes.hours, classes.menuOption)}
            >
              <Image src="https://res.cloudinary.com/sound-insight/image/upload/v1640911039/rx2GiBJ_gxo9q2.png" alt="Clock Icon to view store hours" width={20} height={40} />
              <span>HOURS</span>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default HeaderComponent;
