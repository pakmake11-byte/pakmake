import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'

export default function Contact() {
  return (
    <div className="min-h-screen pt-16">
      <ContactForm />
      <ContactInfo />
    </div>
  )
}