import { Disclosure } from '@headlessui/react'
import { BiMinus } from 'react-icons/bi';
import { BsPlusLg } from 'react-icons/bs';
import "./Faq.scss"

const faqs = [
    {
      id: 1,
      question: 'What is AuthentiAI?',
      answer: `AuthentiAI is a highly efficient, user-friendly, and accessible AI-powered product authentication assistant/assistive chatbot that can be easily integrated into various platforms and industries to help users verify the authenticity of products.`
    },
    {
      id: 1,
      question: 'How does AuthentiAI guide users through the verification process?',
      answer: `AuthentiAI provides a user-friendly interface that guides users step-by-step through the verification process, offering assistance and guidance such as taking photos or verifying information to ensure a seamless user experience.
      `
    },
    {
      id: 1,
      question: 'Is AuthentiAI accessible to users with disabilities or impairments?',
      answer: `Yes.AuthentiAI is designed to be accessible to users with disabilities or impairments, such as visually impaired users or users with limited mobility, by providing alternative input methods like voice commands or text-to-speech.
      `
    },
    {
      id: 1,
      question: 'Can AuthentiAI take photos of the product for verification?',
      answer: ` Yes, AuthentiAI can take photos of the product and analyze them to ensure authenticity, integrating seamlessly with the verification service to provide a seamless user experience.`
    },
    {
        id: 1,
        question: 'Is AuthentiAI available on different platforms?',
        answer: `Yes, AuthentiAI is designed to be available on different platforms such as messaging apps or social media platforms to maximize its reach and accessibility.`
      },
      {
        id: 1,
        question: 'Does AuthentiAI have a feedback mechanism?',
        answer: `Yes, AuthentiAI incorporates a feedback mechanism that allows users to rate its performance and suggest improvements, helping to continuously improve the chatbot's performance.`
      },
      {
        id: 1,
        question: 'Can AuthentiAI recognize barcodes?',
        answer: `Yes, AuthentiAI offers additional features such as barcode scanning to enhance the user experience and assist in the verification process.`
      },
    {
      id: 1,
      question: 'How do I contact support?',
      answer: `We offer support over email and whatsapp, and the best way to contact us is through the in-app Help and Support Page.`
    }
  ]
  export default function Faq() {
    return (
      <div className="w-full h-100vh px-4 pt-16 faq-container">
        <div className="mx-auto rounded-2xl p-2 text-lg">
          <h1 className='text-center text-4xl py-4 faq-title'>FAQs</h1>
          {faqs.map((faq) => (
            <Disclosure>
              {({ open}) => (
                <>
                    <div key={faq.id}>
                      <Disclosure.Button className="flex w-full justify-between rounded-lg  py-3 mb-3 text-left font-medium text-black-600 faq-button-chip">
                        <span>{faq.question}</span>
                        { open ? <BiMinus /> : <BsPlusLg />}
                      </Disclosure.Button>
                      {open && (
                        <Disclosure.Panel static className="text-gray-500 flex w-full justify-between rounded-lg px-4 mb-2 text-left text-sm font-medium faq-answer-panel">
                          {faq.answer}
                        </Disclosure.Panel>
                      )}
                    </div>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    )
  }






