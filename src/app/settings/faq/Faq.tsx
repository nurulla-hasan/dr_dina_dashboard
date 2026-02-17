import PageLayout from "@/components/common/page-layout";
import { faqColumns } from "@/components/settings/faq/faq-columns";
import { FAQFilter } from "@/components/settings/faq/faq-filter";
import { DataTable } from "@/components/ui/custom/data-table";
import PageHeader from "@/components/ui/custom/page-header";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetAllFaqsQuery } from "@/redux/feature/faq/faqApis";
import type { TFaq } from "@/types/faq.type";

const FAQPage = () => {
  const {
    data,
    meta,
    isLoading,
    isError,
    filter,
    setFilter,
    setPage,
  } = useSmartFetchHook<
    { page: number; limit: number; search: string },
    TFaq
  >(useGetAllFaqsQuery);

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <PageHeader
          title="FAQ Management"
          description="Manage frequently asked questions"
          length={meta?.total || 0}
        />
        <FAQFilter filter={filter} setFilter={setFilter} />
      </div>
      <DataTable
        columns={faqColumns}
        data={data || []}
        meta={meta}
        onPageChange={setPage}
        isLoading={isLoading}
        isError={isError}
      />
    </PageLayout>
  );
};

export default FAQPage;
