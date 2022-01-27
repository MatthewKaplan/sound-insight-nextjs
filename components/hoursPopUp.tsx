import Image from 'next/image';
import { FC } from 'react';
import classes from './styles/hoursPopUp.module.css';

type Props = {
  closeHours: () => void;
};

const HoursPopUpComponent: FC<Props> = ({ closeHours }) => (
  <div className={classes.hoursPopUp}>
    <div>
      <Image
        width={30}
        height={30}
        onClick={closeHours}
        alt="Cross icon which is used to exit the hours page"
        src="https://res.cloudinary.com/sound-insight/image/upload/v1640923215/cross_c2uiro.png"
      />
    </div>
    <table>
      <tr>
        <th>Company</th>
        <th>Hours</th>
      </tr>
      <tr>
        <td>MON</td>
        <td>10am - 6pm</td>
      </tr>
      <tr>
        <td>TUE</td>
        <td>10am - 6pm</td>
      </tr>
      <tr>
        <td>WED</td>
        <td>10am - 6pm</td>
      </tr>
      <tr>
        <td>THU</td>
        <td>10am - 6pm</td>
      </tr>
      <tr>
        <td>FRI</td>
        <td>10am - 6pm</td>
      </tr>
      <tr>
        <td>SAT</td>
        <td>10am - 6pm</td>
      </tr>
      <tr>
        <td>SUN</td>
        <td>By Appt. Only</td>
      </tr>
    </table>
  </div>
);

export default HoursPopUpComponent;
