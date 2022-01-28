import { ProductPageData } from './productPageData';
import { HomePageData } from './homePage.type';
import { AboutPageData } from './aboutPage.type';
import { AudioPageData } from './audioPage.type';
import { AutomationPageData } from './automationPage.type';
import { ContactPageData } from './contactPage.type';
import { PhoneSystemPageData } from './phoneSystemPage.type';
import { SecurityPageData } from './securityPage.type';
import { ServicePageData } from './servicePage.typs';
import { VideoPageData } from './videoPage.type';
import { BrandPageData } from './brandPage.type';
import { CareersPageData } from './careersPage.type';
import { GalleryPageData } from './galleryPage.type';

export type CompletePageData = {
  home: HomePageData;
  about: AboutPageData;
  video: VideoPageData;
  audio: AudioPageData;
  brands: BrandPageData;
  contact: ContactPageData;
  careers: CareersPageData;
  gallery: GalleryPageData;
  products: ProductPageData;
  services: ServicePageData;
  security: SecurityPageData;
  automation: AutomationPageData;
  phoneSystems: PhoneSystemPageData;
};

export type PageData = AboutPageData |
AudioPageData |
AutomationPageData |
BrandPageData |
ContactPageData |
HomePageData |
PhoneSystemPageData |
ProductPageData |
SecurityPageData |
ServicePageData |
VideoPageData |
CareersPageData |
GalleryPageData;
