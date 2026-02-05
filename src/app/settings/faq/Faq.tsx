import PageLayout from "@/components/common/page-layout";
import { faqColumns, type FAQ } from "@/components/settings/faq/faq-columns";
import { FAQFilter } from "@/components/settings/faq/faq-filter";
import { DataTable } from "@/components/ui/data-table";
import PageHeader from "@/components/ui/page-header";

const faqs: FAQ[] = [
  {
    id: 1,
    question: "How do I reset my password?",
    answer:
      "You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions sent to your email.",
  },
  {
    id: 2,
    question: "What are the subscription plans?",
    answer:
      "We offer three plans: Basic (Free), Pro ($19.99/mo), and Enterprise ($99.99/mo). Each plan comes with different features and limits.",
  },
  {
    id: 3,
    question: "How can I contact support?",
    answer:
      "You can contact our support team via email at support@example.com or through the contact form on our website. We usually respond within 24 hours.",
  },
  {
    id: 4,
    question: "Is there a mobile app?",
    answer:
      "Yes, we have a mobile app available for both iOS and Android. You can download it from the App Store or Google Play Store.",
  },
  {
    id: 5,
    question: "How do I cancel my subscription?",
    answer:
      "To cancel your subscription, go to your account settings, select 'Billing', and click on 'Cancel Subscription'. Your access will remain active until the end of the current billing period.",
  },
];

const meta = {
  total: faqs.length,
  page: 1,
  limit: 10,
  totalPages: Math.ceil(faqs.length / 10),
};

const FAQPage = () => {
  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <PageHeader
          title="FAQ Management"
          description="Manage frequently asked questions"
        />
        <FAQFilter />
      </div>
      <DataTable columns={faqColumns} data={faqs} meta={meta} />
    </PageLayout>
  );
};

export default FAQPage;
