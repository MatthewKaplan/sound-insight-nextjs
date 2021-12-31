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
  phone: E164Number | undefined;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  resume: string;
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
            src="https://res.cloudinary.com/sound-insight/image/upload/v1640923363/cross3_rsv9uh.png"
            alt="Cross icon which is used to exit the fourm"
            height={25}
            width={25}
            className={classes.closeForm}
            onClick={() => closeForm(false)}
          />
        </div>
        <form action="https://formspree.io/sales@sound-insight.com" method="POST">
          <h1>Contact Form</h1>
          <h3 className={classes.nameLabel}>Name*</h3>
          <div className={classes.nameForms}>
            <section className={classes.fistNameForm}>
              <input
                type="text"
                name="firstName"
                className={classes.firstName}
                id="form-input"
                required
                value={contactInfo.firstName}
                onChange={inputHandler}
                placeholder="First Name"
              />
            </section>
            <section className={classes.lastNameForm}>
              <input
                type="text"
                name="lastName"
                className={classes.lastName}
                id="form-input"
                required
                value={contactInfo.lastName}
                onChange={inputHandler}
                placeholder="Last Name"
              />
            </section>
          </div>
          <div>
            <h3>Email Address*</h3>
            <input
              type="text"
              name="email"
              className={classes.email}
              required
              value={contactInfo.email}
              onChange={inputHandler}
            />
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
          <div className={classes.desiredDemo}>
            <h3>Message*</h3>
            <textarea
              name="message"
              className={classes.message}
              id=""
              cols={60}
              rows={10}
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
