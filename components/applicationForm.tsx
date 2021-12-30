import Image from 'next/image';
import 'react-phone-number-input/style.css';
import { ChangeEvent, FC, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js/types';
import classes from './styles/applicationForm.module.css';

type ApplicationInfo = {
  phone: E164Number | undefined;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  resume: string;
};

type Props = {
  closeForm: (order: boolean) => void;
};

const ApplicationForm: FC<Props> = ({ closeForm }) => {
  const [applicationInfo, setApplicationInfo] = useState<ApplicationInfo>({
    phone: undefined, firstName: '', lastName: '', email: '', message: '', resume: ''
  });

  const inputHandler = ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
    const textValue = value;
    const key = name;

    setApplicationInfo({ ...applicationInfo, [key]: textValue });
  };

  return (
    <div className={classes.contactForm}>
      <div className={classes.formInformation}>
        <div className={classes.float}>
          <Image
            src="https://i.imgur.com/FvyNCGT.png"
            alt="Cross icon which is used to exit the fourm"
            height={25}
            width={25}
            className={classes.closeForm}
            onClick={() => closeForm(false)}
          />
        </div>
        <form action="https://formspree.io/sales@sound-insight.com" method="POST">
          <h1>Application</h1>
          <h3 className={classes.nameLabel}>Name*</h3>
          <div className={classes.nameForms}>
            <section className={classes.fistNameForm}>
              <input
                type="text"
                name="firstName"
                className={classes.firstName}
                id="form-input"
                required
                value={applicationInfo.firstName}
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
                value={applicationInfo.lastName}
                onChange={inputHandler}
                placeholder="Last Name"
              />
            </section>
          </div>
          <div>
            <h3>Resume*</h3>
            <input
              type="file"
              name="resume"
              className={classes.resume}
              required
              value={applicationInfo.resume}
              onChange={inputHandler}
            />
          </div>
          <div>
            <h3>Email Address*</h3>
            <input
              type="text"
              name="email"
              className={classes.email}
              required
              value={applicationInfo.email}
              onChange={inputHandler}
            />
          </div>
          <div className={classes.phoneNumber}>
            <h3>Phone*</h3>
            <PhoneInput
              placeholder="Enter phone number"
              name={applicationInfo.phone?.toString()}
              value={applicationInfo.phone}
              onChange={(phone) => setApplicationInfo({ ...applicationInfo, phone })}
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
              value={applicationInfo.message}
              onChange={(e) => setApplicationInfo({ ...applicationInfo, message: e.target.value })}
            />
          </div>
          <input type="submit" value="Submit" className={classes.submitBtn} />
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
