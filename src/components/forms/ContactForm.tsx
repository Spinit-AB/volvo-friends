import { TColor } from "@/utils/types";
import { ContactFormClient } from "./ContactFormClient";

// Server component for Netlify form detection only
export function ContactForm(props: {
  lang: string;
  subjects: string[];
  color: TColor;
}) {
  // This form is for Netlify build-time detection only. For interactivity, use ContactFormClient.
  return (
    <>
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        style={{ display: "none" }}
      >
        <input type="hidden" name="form-name" value="contact" />
        <input type="text" name="subject" />
        <input type="email" name="email" />
        <textarea name="message" />
        <button type="submit">Send</button>
      </form>
      <ContactFormClient {...props} />
    </>
  );
}
