import Image from 'next/image';
import 'react-phone-number-input/style.css';
import { ChangeEvent, FC, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js/types';
import classes from './styles/surveyRequestForm.module.css';

type Props = {
  closeForm: (order: boolean) => void;
};

type ContactInfo = {
  phone: E164Number | undefined;
  firstName: string;
  lastName: string;
  email: string;
  jobDetail: string;
  dateRequested: string;
};

const SurveyRequestForm: FC<Props> = ({ closeForm }: Props) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: undefined, firstName: '', lastName: '', email: '', jobDetail: '', dateRequested: ''
  });

  const inputHandler = ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
    const textValue = value;
    const key = name;

    setContactInfo({ ...contactInfo, [key]: textValue });
  };

  return (
    <div className={classes.surveyRequestForm}>
      <div className={classes.formInformation}>
        <div className={classes.float}>
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
          <h1>Request Free Estimate</h1>
          <h3 className={classes.nameLabel}>Name*</h3>
          <div className={classes.nameForms}>
            <section className={classes.fistNameForm}>
              <input placeholder="First Name" type="text" className={classes.firstName} name="firstName" value={contactInfo.firstName} id="form-input" onChange={inputHandler} />
              {' '}
              <br />
            </section>
            <section className={classes.lastNameForm}>
              <input placeholder="Last Name" type="text" className={classes.lastName} name="lastName" value={contactInfo.lastName} id="form-input" onChange={inputHandler} />
              {' '}
              <br />
            </section>
          </div>
          <div className={classes.desiredDemo}>
            <h3>Job Detail*</h3>
            <textarea
              name="jobDetail"
              value={contactInfo.jobDetail}
              className={classes.jobDetail}
              id=""
              cols={60}
              rows={10}
              placeholder="In as much detail as possible, tell us about your job."
              onChange={(e) => setContactInfo({ ...contactInfo, jobDetail: e.target.value })}
            />
          </div>
          <div className={classes.requestedDate}>
            <h3>Date Requested*</h3>
            <div className={classes.dateInput}>
              <input type="date" id="start" name="dateRequested" min="2019-09-01" max="2022-12-31" className={classes.dateRequested} value={contactInfo.dateRequested} onChange={inputHandler} />
            </div>
          </div>
          <div>
            <h3>Email Address*</h3>
            <input type="text" className={classes.email} name="email" value={contactInfo.email} required onChange={inputHandler} />
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
  );
};

export default SurveyRequestForm;
