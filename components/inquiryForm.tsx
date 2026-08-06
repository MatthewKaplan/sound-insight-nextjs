import {
  FC, FormEvent, useState
} from 'react';
import classes from './styles/inquiryForm.module.css';
import { BUSINESS_EMAIL, BUSINESS_PHONE, BUSINESS_PHONE_DISPLAY } from '../helper/structured-data';

// Create a form at https://formspree.io and set NEXT_PUBLIC_FORMSPREE_ID to its
// hash (the `xyzabcde` in formspree.io/f/xyzabcde). Until then we fall back to
// the account's legacy email endpoint.
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ID
  ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
  : `https://formspree.io/${BUSINESS_EMAIL}`;

export const INTEREST_OPTIONS = [
  'A showroom visit or demo',
  'A free in-home estimate',
  'Home audio',
  'Home cinema or video',
  'Home automation',
  'Security & surveillance',
  'Business phone systems',
  'Something else'
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

type Props = {
  defaultInterest?: string;
  headingId?: string;
};

const InquiryForm: FC<Props> = ({ defaultInterest, headingId }) => {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const nextErrors: { name?: string; email?: string } = {};
    if (!String(data.get('name') ?? '').trim()) {
      nextErrors.name = 'Please tell us your name.';
    }
    const email = String(data.get('email') ?? '').trim();
    if (!email || !email.includes('@')) {
      nextErrors.email = 'Please enter an email address we can reply to.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data
      });
      if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="formNotice formNoticeSuccess" role="status">
        <p>
          <strong>Thanks — we got it.</strong>
          {' '}
          We reply within one business day. If it&apos;s time-sensitive, call us at
          {' '}
          <a href={`tel:${BUSINESS_PHONE}`}>{BUSINESS_PHONE_DISPLAY}</a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={headingId}
    >
      <div className={classes.row}>
        <div className="field">
          <label htmlFor="inquiry-name">Name</label>
          <input
            id="inquiry-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
            className={errors.name ? 'fieldError' : undefined}
          />
          {errors.name && (
            <p id="inquiry-name-error" className="fieldErrorText">{errors.name}</p>
          )}
        </div>
        <div className="field">
          <label htmlFor="inquiry-email">Email</label>
          <input
            id="inquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
            className={errors.email ? 'fieldError' : undefined}
          />
          {errors.email && (
            <p id="inquiry-email-error" className="fieldErrorText">{errors.email}</p>
          )}
        </div>
      </div>

      <div className={classes.row}>
        <div className="field">
          <label htmlFor="inquiry-phone">
            Phone
            {' '}
            <span className="optional">(optional)</span>
          </label>
          <input
            id="inquiry-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
          />
        </div>
        <div className="field">
          <label htmlFor="inquiry-town">
            Town
            {' '}
            <span className="optional">(optional)</span>
          </label>
          <input
            id="inquiry-town"
            name="town"
            type="text"
            autoComplete="address-level2"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="inquiry-interest">What can we help with?</label>
        <select
          id="inquiry-interest"
          name="interest"
          defaultValue={defaultInterest ?? INTEREST_OPTIONS[0]}
        >
          {INTEREST_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="inquiry-message">
          Tell us about your project
          {' '}
          <span className="optional">(optional)</span>
        </label>
        <textarea id="inquiry-message" name="message" rows={5} />
      </div>

      {/* Honeypot — hidden from real users, catches naive bots. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className={classes.gotcha}
        aria-hidden="true"
      />
      <input type="hidden" name="_subject" value="New inquiry from sound-insight.com" />

      {status === 'error' && (
        <div className="formNotice formNoticeError" role="alert">
          <p>
            Something went wrong sending your message. Please call us at
            {' '}
            <a href={`tel:${BUSINESS_PHONE}`}>{BUSINESS_PHONE_DISPLAY}</a>
            {' '}
            or email
            {' '}
            <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>
            .
          </p>
        </div>
      )}

      <div className={classes.submitRow}>
        <button type="submit" className="btn btnPrimary" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send it over'}
        </button>
        <p className={classes.promise}>We reply within one business day.</p>
      </div>
    </form>
  );
};

export default InquiryForm;
