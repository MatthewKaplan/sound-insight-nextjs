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

export type CompletePageData = {
  about: AboutPageData,
  audio: AudioPageData,
  automation: AutomationPageData,
  brands: BrandPageData,
  contact: ContactPageData,
  home: HomePageData,
  phoneSystems: PhoneSystemPageData,
  products: ProductPageData,
  security: SecurityPageData,
  services: ServicePageData,
  video: VideoPageData
}