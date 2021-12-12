import classes from './styles/hoursPopUp.module.css'

type Props = {
  closeHours: () => void
}

const HoursPopUpComponent = ({ closeHours }: Props) => {
  return (
    <div className={classes.hoursPopUp}>
        <div className={classes.formInformation}>
        <img src="https://i.imgur.com/nA0azY8.png" alt="" className={classes.closePopup} onClick={closeHours} />
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
  )
}

export default HoursPopUpComponent;