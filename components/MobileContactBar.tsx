import { MessageCircle, Phone } from "lucide-react";

export function MobileContactBar() {
  return (
    <div className="mobile-contact-bar" aria-label="Quick contact">
      <a href="tel:+254701326274"><Phone /> Call</a>
      <a href="https://wa.me/254701326274"><MessageCircle /> WhatsApp</a>
    </div>
  );
}
