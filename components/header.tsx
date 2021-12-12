import classes from './styles/header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from "react";
import clsx from 'clsx';
import MapPopUpComponent from './mapPopUp';
import HoursPopUpComponent from './hoursPopUp';

const HeaderComponent = () => {
  const [popUp, setPopUp] = useState<boolean>(false);
  const [mapPopUp, setMapPopUp] = useState<boolean>(false);
  const [hoursPopUp, setHoursPopUp] = useState<boolean>(false);
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const toggleHours = () => {
    setHoursPopUp(!hoursPopUp);
    setPopUp(!popUp);
  };

  const toggleMap = () => {
    setMapPopUp(!mapPopUp)
    setPopUp(!popUp);
  };

  return (
    <>
      <header className={classes.navigationPanel}>
        <div className={classes.container}>
          <nav className={classes.mainNav}>
            <Link href="/">
              <a className={classes.imgAnchor}>
                <Image src="https://i.imgur.com/WIgvnFB.jpg" height="85" width="200" className={classes.logo} />
              </a>
            </Link>
            <ul className={classes.mainNavOptions}>
              <Link href="/">
                <a className={classes.link}>
                  HOME
                </a>
              </Link>
              <Link href="/services">
                <a className={classes.link}>
                  SERVICES
                </a>
              </Link>
              <Link href="/products">
                <a className={classes.link}>
                  PRODUCTS
                </a>
              </Link>
              <Link href="/brands">
                <a className={classes.link}>
                  BRANDS
                </a>
              </Link>
              <Link href="/about">
                <a className={classes.link}>
                  ABOUT
                </a>
              </Link>
              <Link href="/contact">
                <a className={clsx(classes.link, classes.contactLink)}>
                  CONTACT
                </a>
              </Link>
            </ul>
          </nav>
        </div>
      </header>
      <div className={classes.sidebarNavigation}>
        <div className={sidebarActive ? clsx(classes.sidebarActive, classes.sidebar) : classes.sidebar}>
          <section className={classes.navHeader}>
            <div className={sidebarActive ? clsx(classes.iconActive, classes.icon) : classes.icon} onClick={() => toggleSidebar()}>
              <div className={classes.hamburger} />
            </div>
            <Link href="/">
              <a className={clsx(classes.link, classes.logoLink)}>
                <Image src="https://i.imgur.com/6E05ibb.png" height={50} width={50} className={classes.headerLogo} />
              </a>
            </Link>
          </section>
          <section className={classes.sideNav}>
            <ul className={classes.sidebarMenu}>
              <Link href="/">
                <a className={classes.link} onClick={() => toggleSidebar()}>
                  HOME
                </a>
              </Link>
              <Link href="/services">
                <a className={classes.link} onClick={() => toggleSidebar()}>
                  SERVICES
                </a>
              </Link>
              <Link href="/products">
                <a className={classes.link} onClick={() => toggleSidebar()}>
                  PRODUCTS
                </a>
              </Link>
              <Link href="/brands">
                <a className={classes.link} onClick={() => toggleSidebar()}>
                  BRANDS
                </a>
              </Link>
              <Link href="/about">
                <a className={classes.link} onClick={() => toggleSidebar()}>
                  ABOUT
                </a>
              </Link>
              <Link href="/contact">
                <a className={clsx(classes.link, classes.contactLink)} onClick={() => toggleSidebar()}>
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
                <img src="https://i.imgur.com/SUphJ4h.png" alt="Email Icon" className={classes.contactIcon} />
                <span>EMAIL</span>
              </a>
            </div>
            <div className={classes.phone}>
              <a target="_blank" href="tel:6312714434" rel="noopener noreferrer" className={classes.menuOption}>
                <img src="https://i.imgur.com/eAxtt3I.png" alt="Telephone Icon" className={classes.contactIcon} />
                <span>CALL</span>
              </a>
            </div>
            <div className={clsx(classes.map, classes.menuOption)} onClick={() => toggleMap()}>
              <img src="https://i.imgur.com/oj6o3TY.png" alt="Map Icon" className={classes.contactIcon} />
              <span>MAP</span>
            </div>
            <div className={clsx(classes.hours, classes.menuOption)} onClick={() => toggleHours()}>
              <img src="https://i.imgur.com/rx2GiBJ.png" alt="Clock Icon" className={classes.contactIcon} />
              <span>HOURS</span>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default HeaderComponent;