import { useState } from "react";
import Accordion from "../components/shared/Accordion";
import Section from "../components/shared/Section";

const faqData = [
  {
    id: "1",
    question: "What is PlayTrix?",
    answer: "PlayTrix is a music streaming service...",
  },
  {
    id: "2",
    question: "How can I create an account?",
    answer: "You can create an account by...",
  },
  {
    id: "3",
    question: "Is there a free trial?",
    answer: "Yes, we offer a 30-day free trial...",
  },
  {
    id: "4",
    question: "How do I cancel my subscription?",
    answer: "To cancel your subscription...",
  },
  {
    id: "5",
    question: "Can I download songs?",
    answer: "Yes, PlayTrix allows offline downloads...",
  },
  {
    id: "6",
    question: "What devices are supported?",
    answer: "We support various devices including...",
  },
  {
    id: "7",
    question: "Can I share my account?",
    answer: "Currently, account sharing is not allowed...",
  },
  {
    id: "8",
    question: "How do I contact support?",
    answer: "You can reach support via our...",
  },
  {
    id: "9",
    question: "Are there family plans available?",
    answer: "Yes, we offer family plans with...",
  },
];

const FaqPage = () => {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <Section
      title="FAQs"
      description="This section displays common asked questions."
      showSearch={false}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
        {faqData.map((faq) => (
          <Accordion
            key={faq.id}
            id={faq.id}
            question={faq.question}
            answer={faq.answer}
            isOpen={openId === faq.id}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </Section>
  );
};

export default FaqPage;
