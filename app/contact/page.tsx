import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { PageAudioWrapper } from '@/components/ui/PageAudioWrapper'

export default function Contact() {
  return (
    <PageAudioWrapper>
      <div className="min-h-screen pt-16">
        <ContactForm />
        <ContactInfo />
      </div>
    </PageAudioWrapper>
  )
}