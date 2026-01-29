import { TColor } from "@/utils/types";
import { ContactFormClient } from "./ContactFormClient";

// Server component wrapper - no hidden form needed for Netlify
// The static HTML file in public/forms/contact.html handles Netlify detection
export function ContactForm(props: {
  lang: string;
  subjects: string[];
  color: TColor;
}) {
  return <ContactFormClient {...props} />;
}
