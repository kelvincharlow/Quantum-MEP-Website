import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <section className="section legal">
      <div className="container legal__inner">
        <p className="eyebrow">Privacy</p>
        <h1>Privacy policy</h1>
        <p className="legal__updated">Draft for review before launch</p>
        <h2>Information we collect</h2>
        <p>When you contact Quantum through this website, we may collect your name, company, contact details, project information and the contents of your message.</p>
        <h2>How we use information</h2>
        <p>We use the information you provide to understand and respond to your enquiry, maintain appropriate business records and improve our services.</p>
        <h2>Sharing and retention</h2>
        <p>We do not sell personal information. Information may be processed by service providers that support website hosting, form delivery and analytics, subject to appropriate safeguards.</p>
        <h2>Your choices</h2>
        <p>To ask about your information or request a correction, contact mohammed@quantumep.co.ke.</p>
      </div>
    </section>
  );
}
