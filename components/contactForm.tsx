import Image from 'next/image';
import 'react-phone-number-input/style.css';
import { ChangeEvent, FC, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js/types';
import classes from './styles/contactForm.module.css';

type Props = {
  closeForm: (order: boolean) => void;
};

type ContactInfo = {
  email: string;
  resume: string;
  message: string;
  firstName: string;
  lastName: string;
  phone: E164Number | undefined;
};

const ContactForm: FC<Props> = ({ closeForm }) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: undefined, firstName: '', lastName: '', email: '', message: '', resume: ''
  });

  const inputHandler = ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
    const textValue = value;
    const key = name;

    setContactInfo({ ...contactInfo, [key]: textValue });
  };

  return (
    <div className={classes.contactForm}>
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
          <h1>Contact Form</h1>
          <h3 className={classes.nameLabel}>Name*</h3>
          <div className={classes.nameForms}>
            <section className={classes.fistNameForm}>
              <input
                required
                type="text"
                name="firstName"
                id="form-input"
                onChange={inputHandler}
                placeholder="First Name"
                className={classes.firstName}
                value={contactInfo.firstName}
              />
            </section>
            <section className={classes.lastNameForm}>
              <input
                required
                type="text"
                name="lastName"
                id="form-input"
                onChange={inputHandler}
                placeholder="Last Name"
                value={contactInfo.lastName}
                className={classes.lastName}
              />
            </section>
          </div>
          <div>
            <h3>Email Address*</h3>
            <input
              required
              type="text"
              name="email"
              onChange={inputHandler}
              value={contactInfo.email}
              className={classes.email}
            />
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
          <div className={classes.desiredDemo}>
            <h3>Message*</h3>
            <textarea
              id=""
              cols={60}
              rows={10}
              name="message"
              className={classes.message}
              value={contactInfo.message}
              onChange={(e) => setContactInfo({ ...contactInfo, message: e.target.value })}
            />
          </div>
          <input type="submit" value="Submit" className={classes.submitBtn} />
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
