"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [previewMessage, setPreviewMessage] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPreviewMessage(true);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__section">
        <div className="contact-form__section-label"><span>01</span><strong>Your details</strong></div>
        <div className="form-grid">
          <label>Full name *<input name="name" autoComplete="name" placeholder="Your full name" required /></label>
          <label>Company<input name="company" autoComplete="organization" placeholder="Company or organisation" /></label>
          <label>Email address *<input name="email" type="email" autoComplete="email" placeholder="name@company.com" required /></label>
          <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="+254" /></label>
        </div>
      </div>
      <div className="contact-form__section">
        <div className="contact-form__section-label"><span>02</span><strong>Project brief</strong></div>
        <div className="form-grid">
          <label>Project location<input name="location" placeholder="City or region" /></label>
          <label>Service required<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>MEP Consultancy</option><option>MEP Design & Build</option><option>Lifecycle Support</option></select></label>
        </div>
        <label>Tell us about your project *<textarea name="message" rows={4} placeholder="Project type, stage, scope and expected timeline" required minLength={20} /></label>
      </div>
      <label className="checkbox"><input type="checkbox" required /><span>I agree that Quantum may use these details to respond to my enquiry.</span></label>
      <button className="button button--primary button--submit" type="submit">Send project enquiry <span aria-hidden="true">↗</span></button>
      {previewMessage ? (
        <p className="form-preview-message" role="status">
          This form is in preview mode. Delivery will be activated after the recipient and secure storage service are confirmed.
        </p>
      ) : (
        <p className="form-note">Preview mode — no information is transmitted or stored.</p>
      )}
    </form>
  );
}
