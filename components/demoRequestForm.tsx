import Image from 'next/image';
import 'react-phone-number-input/style.css';
import { ChangeEvent, useState } from "react";
import PhoneInput from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js/types';
import classes from './styles/demoRequestForm.module.css'

type Props = {
  closeForm: (order: boolean) => void
}

type ContactInfo = {
  phone: E164Number | undefined, firstName: string, lastName: string, email: string, desiredDemo: string, dateRequested: string, timeRequested: string
}

const DemoRequestForm = ({ closeForm }: Props) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({ phone: undefined, firstName: '', lastName: '', email: '', desiredDemo: '', dateRequested: '', timeRequested: '' });

  const inputHandler = ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
    let textValue = value;
    let key = name;

    setContactInfo({ ...contactInfo, [key]: textValue })
  };

  return (
    <div className={classes.demoRequestForm}>
      <div className={classes.formInformation}>
        <div style={{ float: "right" }}>
          <Image
            src="https://i.imgur.com/FvyNCGT.png"
            alt="Cross icon which is used to exit the fourm"
            height={25}
            width={25}
            className={classes.closeForm}
            onClick={() => closeForm(false)} />
        </div>
        <form action={`https://formspree.io/sales@sound-insight.com`} method="POST">
          <h1>Request Demo</h1>
          <h3 className={classes.nameLabel}>Name*</h3>
          <div className={classes.nameForms}>
            <section className={classes.fistNameForm}>
              <input
                type="text"
                className={classes.firstName}
                id="form-input"
                value={contactInfo.firstName}
                name="firstName"
                onChange={inputHandler}
              />
              <br />
              <label className={classes.nameLabel}>First Name</label>
            </section>
            <section className={classes.lastNameForm}>
              <input
                type="text"
                className={classes.lastName}
                id="form-input"
                value={contactInfo.lastName}
                name="lastName"
                onChange={inputHandler}
              />{' '}
              <br />
              <label className={classes.nameLabel}>Last Name</label>
            </section>
          </div>
          <div className={classes.desiredDemo}>
            <h3>Desired Demo*</h3>
            <textarea
              name="desiredDemo"
              className={classes.desiredDemo}
              value={contactInfo.desiredDemo}
              onChange={(e) => setContactInfo({ ...contactInfo, desiredDemo: e.target.value })}
              id=""
              cols={60}
              rows={10}
              placeholder="Please let us know what equipment you would like to experience."
            />
          </div>
          <div className={classes.requestedDate}>
            <h3>Date Requested*</h3>
            <div className={classes.dateInput}>
              <input type="date" id="start" name="dateRequested" min="2019-09-01" max="2022-12-31" className={classes.dateRequested} value={contactInfo.dateRequested} onChange={inputHandler} width='100' required />
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
              placeholder="Enter phone number"
              name={contactInfo.phone?.toString()}
              value={contactInfo.phone}
              onChange={(phone) => setContactInfo({ ...contactInfo, phone })}
              className={classes.phone}
            />
          </div>
          <input type="submit" value="Submit" className={classes.submitBtn} />
        </form>
      </div>
    </div>
  )
}

export default DemoRequestForm;