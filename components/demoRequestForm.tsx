import Image from 'next/image';
import 'react-phone-number-input/style.css';
import { ChangeEvent, FC, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js/types';
import classes from './styles/demoRequestForm.module.css';

type Props = {
  closeForm: (order: boolean) => void;
};

type ContactInfo = {
  email: string;
  firstName: string;
  lastName: string;
  desiredDemo: string;
  dateRequested: string;
  timeRequested: string;
  phone: E164Number | undefined;
};

const DemoRequestForm: FC<Props> = ({ closeForm }) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: undefined, firstName: '', lastName: '', email: '', desiredDemo: '', dateRequested: '', timeRequested: ''
  });

  const inputHandler = ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
    const textValue = value;
    const key = name;

    setContactInfo({ ...contactInfo, [key]: textValue });
  };

  return (
    <div className={classes.demoRequestForm}>
      <div className={classes.formInformation}>
        <div style={{ float: 'right' }}>
          <Image
            width={25}
            height={25}
            className={classes.closeForm}
            onClick={() => closeForm(false)}
            alt="Cross icon which is used to exit the fourm"
            src="https://res.cloudinary.com/sound-insight/image/upload/v1640923363/cross3_rsv9uh.png"
          />
        </div>
        <form action="https://formspree.io/sales@sound-insight.com" method="POST">
          <h1>Request Demo</h1>
          <h3 className={classes.nameLabel}>Name*</h3>
          <div className={classes.nameForms}>
            <section className={classes.fistNameForm}>
              <input
                type="text"
                id="form-input"
                name="firstName"
                onChange={inputHandler}
                placeholder="First Name"
                className={classes.firstName}
                value={contactInfo.firstName}
              />
            </section>
            <section className={classes.lastNameForm}>
              <input
                type="text"
                id="form-input"
                name="lastName"
                onChange={inputHandler}
                placeholder="Last Name"
                className={classes.lastName}
                value={contactInfo.lastName}
              />
            </section>
          </div>
          <div className={classes.desiredDemo}>
            <h3>Desired Demo*</h3>
            <textarea
              id=""
              cols={60}
              rows={10}
              name="desiredDemo"
              className={classes.desiredDemo}
              value={contactInfo.desiredDemo}
              placeholder="Please let us know what equipment you would like to experience."
              onChange={(e) => setContactInfo({ ...contactInfo, desiredDemo: e.target.value })}
            />
          </div>
          <div className={classes.requestedDate}>
            <h3>Date Requested*</h3>
            <div className={classes.dateInput}>
              <input type="date" id="start" name="dateRequested" min="2019-09-01" max="2022-12-31" className={classes.dateRequested} value={contactInfo.dateRequested} onChange={inputHandler} width="100" required />
            </div>
          </div>
          <div className={classes.requestedTime}>
            <h3>Time*</h3>
            <select id="timeSelect" className={classes.timeRequested} name="timeRequested" value={contactInfo.timeRequested} onChange={(e) => setContactInfo({ ...contactInfo, timeRequested: e.target.value })}>
              <option value="" className={classes.placeholderText}>
                --Please choose a Time--
              </option>
              <optgroup label="Morning">
                <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
              </optgroup>
              <optgroup label="Afternoon">
                <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
                <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
                <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
              </optgroup>
            </select>
          </div>
          <div>
            <h3>Email Address*</h3>
            <input type="text" className={classes.email} required onChange={inputHandler} value={contactInfo.email} name="email" />
          </div>
          <div className={classes.phoneNumber}>
            <h3>Phone*</h3>
            <PhoneInput
              value={contactInfo.phone}
              className={classes.phone}
              placeholder="Enter phone number"
              name={contactInfo.phone?.toString()}
              onChange={(phone) => setContactInfo({ ...contactInfo, phone })}
            />
          </div>
          <input type="submit" value="Submit" className={classes.submitBtn} />
        </form>
      </div>
    </div>
  );
};

export default DemoRequestForm;
