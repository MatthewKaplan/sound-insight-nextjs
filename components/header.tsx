import { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import classes from './styles/header.module.css';
import { BUSINESS_PHONE, BUSINESS_PHONE_DISPLAY } from '../helper/structured-data';

const LOGO_SRC = 'https://res.cloudinary.com/sound-insight/image/upload/v1640911039/WIgvnFB_swl61h.jpg';
const DIRECTIONS_URL = 'https://maps.google.com?daddr=382+New+York+Avenue+Huntington+NY+11743';

const SERVICE_LINKS = [
  { href: '/services/audio', label: 'Home Audio' },
  { href: '/services/video', label: 'Home Cinema & Video' },
  { href: '/services/automation', label: 'Home Automation' },
  { href: '/services/security', label: 'Security' },
  { href: '/services/phone-systems', label: 'Business Phone Systems' }
];

const NAV_LINKS = [
  { href: '/products', label: 'Products' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

const HeaderComponent: FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);

  // Close everything on navigation.
  useEffect(() => {
    const close = () => {
      setMenuOpen(false);
      setServicesOpen(false);
    };
    router.events.on('routeChangeComplete', close);
    return () => router.events.off('routeChangeComplete', close);
  }, [router.events]);

  // Escape closes; clicks outside close the services dropdown.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const isCurrent = (href: string): 'page' | undefined => (router.pathname === href ? 'page' : undefined);
  const onServices = router.pathname.startsWith('/services');

  return (
    <header className={classes.header}>
      <div className={clsx('container', classes.inner)}>
        <Link href="/" className={classes.logoLink} aria-label="Sound Insight home">
          <Image
            priority
            src={LOGO_SRC}
            alt="Sound Insight"
            width={150}
            height={64}
            className={classes.logo}
          />
        </Link>

        <nav className={classes.nav} aria-label="Main">
          <ul className={classes.navList}>
            <li>
              <Link href="/" className={classes.link} aria-current={isCurrent('/')}>
                Home
              </Link>
            </li>
            <li className={classes.hasMenu} ref={servicesRef}>
              <button
                type="button"
                className={clsx(classes.link, classes.menuButton, onServices && classes.linkSection)}
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                onClick={() => setServicesOpen((open) => !open)}
              >
                Services
                <span aria-hidden="true" className={classes.caret} />
              </button>
              <ul id="services-menu" className={classes.menu} hidden={!servicesOpen}>
                <li>
                  <Link href="/services" className={classes.menuLink} aria-current={isCurrent('/services')}>
                    All services
                  </Link>
                </li>
                {SERVICE_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className={classes.menuLink} aria-current={isCurrent(href)}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={classes.link} aria-current={isCurrent(href)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={classes.actions}>
          <a href={`tel:${BUSINESS_PHONE}`} className={classes.phone}>
            {BUSINESS_PHONE_DISPLAY}
          </a>
          <Link href="/contact" className="btn btnPrimary">
            Book a visit
          </Link>
        </div>

        <button
          type="button"
          className={classes.hamburger}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={classes.hamburgerBox} aria-hidden="true">
            <span className={clsx(classes.hamburgerBar, menuOpen && classes.hamburgerBarOpen)} />
          </span>
          {menuOpen ? 'Close menu' : 'Menu'}
        </button>
      </div>

      <nav
        id="mobile-menu"
        className={classes.mobilePanel}
        aria-label="Main menu"
        hidden={!menuOpen}
      >
        <ul className={classes.mobileList}>
          <li><Link href="/" className={classes.mobileLink} aria-current={isCurrent('/')}>Home</Link></li>
          <li><Link href="/services" className={classes.mobileLink} aria-current={isCurrent('/services')}>Services</Link></li>
          {SERVICE_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={clsx(classes.mobileLink, classes.mobileSubLink)} aria-current={isCurrent(href)}>
                {label}
              </Link>
            </li>
          ))}
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={classes.mobileLink} aria-current={isCurrent(href)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={classes.mobilePanelFooter}>
          <Link href="/contact" className="btn btnPrimary">Book a showroom visit</Link>
          <a href={`tel:${BUSINESS_PHONE}`} className="btn btnSecondary">
            Call {BUSINESS_PHONE_DISPLAY}
          </a>
        </div>
      </nav>

      <div className={classes.actionBar}>
        <a href={`tel:${BUSINESS_PHONE}`} className={classes.actionBarItem}>Call</a>
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.actionBarItem}
        >
          Directions
        </a>
        <Link href="/contact" className={clsx(classes.actionBarItem, classes.actionBarPrimary)}>
          Book a visit
        </Link>
      </div>
    </header>
  );
};

export default HeaderComponent;
