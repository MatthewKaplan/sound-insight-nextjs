import Image from 'next/image';
import { FC } from 'react';
import classes from './styles/hoursPopUp.module.css';

type Props = {
  closeHours: () => void;
};

const HoursPopUpComponent: FC<Props> = ({ closeHours }) => (
  <div className={classes.hoursPopUp}>
    <div className={classes.formInformation}>
      <div style={{ float: 'right', marginTop: '20', marginRight: '20' }}>
        <Image
          src="https://res.cloudinary.com/sound-insight/image/upload/v1640923215/cross_c2uiro.png"
          alt="Cross icon which is used to exit the hours page"
          height={30}
          width={30}
          onClick={closeHours}
        />
      </div>
      <table>
        <tr>
          <td className={classes.date}>MON</td>
          <td className={classes.time}>10am - 6pm</td>
        </tr>
        <tr>
          <td className={classes.date}>TUE</td>
          <td className={classes.time}>10am - 6pm</td>
        </tr>
        <tr>
          <td className={classes.date}>WED</td>
          <td className={classes.time}>10am - 6pm</td>
        </tr>
        <tr>
          <td className={classes.date}>THU</td>
          <td className={classes.time}>10am - 6pm</td>
        </tr>
        <tr>
          <td className={classes.date}>FRI</td>
          <td className={classes.time}>10am - 6pm</td>
        </tr>

        <tr>
          <td className={classes.date}>SAT</td>
          <td className={classes.time}>10am - 6pm</td>
        </tr>
        <tr>
          <td className={classes.date}>SUN</td>
          <td className={classes.date}>By Appt. Only</td>
        </tr>
      </table>
    </div>
  </div>
);

export default HoursPopUpComponent;
