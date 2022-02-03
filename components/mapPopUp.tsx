import { FC } from 'react';
import Image from 'next/image';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

type Props = {
  setMapPopUp: (arg: boolean) => void;
  mapPopUp: boolean;
};

const MapPopUpComponent: FC<Props> = ({ setMapPopUp, mapPopUp }) => {
  const closeIcon = (
    <Image src="https://res.cloudinary.com/dgmtf6brh/image/upload/v1643348168/cancel_d6u1cy.png" alt="Close Icon" width={50} height={50} />
  );

  return (
    <Modal open={mapPopUp} onClose={() => setMapPopUp(false)} center closeIcon={closeIcon}>
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
    </Modal>
  );
};

export default MapPopUpComponent;
