import Image from 'next/image';
import 'react-phone-number-input/style.css';
import { ChangeEvent, FC, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js/types';
import classes from './styles/applicationForm.module.css';

type ApplicationInfo = {
  email: string;
  resume: string;
  message: string;
  firstName: string;
  lastName: string;
  phone: E164Number | undefined;
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
            width={25}
            height={25}
            className={classes.closeForm}
            onClick={() => closeForm(false)}
            alt="Cross icon which is used to exit the fourm"
            src="https://res.cloudinary.com/sound-insight/image/upload/v1640923363/cross3_rsv9uh.png"
          />
        </div>
        <form action="https://formspree.io/sales@sound-insight.com" method="POST">
          <h1>Application</h1>
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
                value={applicationInfo.firstName}
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
                className={classes.lastName}
                value={applicationInfo.lastName}
              />
            </section>
          </div>
          <div>
            <h3>Resume*</h3>
            <input
              required
              type="file"
              name="resume"
              onChange={inputHandler}
              className={classes.resume}
              value={applicationInfo.resume}
            />
          </div>
          <div>
            <h3>Email Address*</h3>
            <input
              required
              type="text"
              name="email"
              onChange={inputHandler}
              className={classes.email}
              value={applicationInfo.email}
            />
          </div>
          <div className={classes.phoneNumber}>
            <h3>Phone*</h3>
            <PhoneInput
              className={classes.phone}
              value={applicationInfo.phone}
              placeholder="Enter phone number"
              name={applicationInfo.phone?.toString()}
              onChange={(phone) => setApplicationInfo({ ...applicationInfo, phone })}
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
