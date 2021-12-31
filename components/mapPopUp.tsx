import Image from 'next/image';
import { FC } from 'react';
import classes from './styles/mapPopUp.module.css';

type Props = {
  closeMap: () => void;
};

const MapPopUpComponent: FC<Props> = ({ closeMap }) => (
  <div className={classes.mapPopup}>
    <div className={classes.float}>
      <Image
        src="https://res.cloudinary.com/sound-insight/image/upload/v1640923266/cross2_deofik.png"
        alt="Cross icon which is used to exit the map page"
        height={80}
        width={80}
        onClick={closeMap}
      />
    </div>
    <section className={classes.map}>
      <div className={classes.mapouter}>
        <div className={classes.gmapCanvas}>
          <iframe
            title="Google map"
            width="350"
            height="800"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=382%20New%20York%20Ave%20Huntington%2C%20NY%2011743&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
          />
          Google Maps Generator by
          {' '}
          <a href="https://www.embedgooglemap.net">embedgooglemap.net</a>
        </div>
      </div>
    </section>
  </div>
);

export default MapPopUpComponent;
