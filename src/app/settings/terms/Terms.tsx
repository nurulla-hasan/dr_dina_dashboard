import PageLayout from "@/components/common/page-layout";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TiptapEditor from "@/components/ui/custom/tiptap-editor";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import { Save } from "lucide-react";
import PageHeader from "@/components/ui/custom/page-header";
import {
  useGetTermsConditionsQuery,
  useUpdateTermsConditionsMutation,
} from "@/redux/feature/settings/settingsApis";
import type { TError } from "@/types/global.types";

type FormValues = {
  content: string;
};

const Terms = () => {
  const { data: termsData, isLoading: isFetching } = useGetTermsConditionsQuery(undefined);
  const [updateTermsConditions, { isLoading: isSubmitting }] =
    useUpdateTermsConditionsMutation();

  const form = useForm<FormValues>({
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    if (termsData?.data?.termsCondition) {
      form.reset({
        content: termsData.data.termsCondition,
      });
    }
  }, [termsData, form]);

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await updateTermsConditions({
        termsCondition: data.content,
      }).unwrap();
      SuccessToast(res.message || "Terms and Conditions saved successfully");
    } catch (err) {
      const error = err as TError;
      ErrorToast(error?.data?.message || "Failed to save Terms and Conditions");
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title="Terms and Conditions"
        description="Manage the Terms and Conditions page content"
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="p-0 mb-4">
            <CardContent className="p-0">
              <div className="bg-card p-3 rounded-xl border shadow-sm">
                {isFetching ? (
                  <div className="h-150 flex items-center justify-center text-muted-foreground">
                    Loading content...
                  </div>
                ) : (
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <TiptapEditor
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                        <FormMessage className="p-4" />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || isFetching}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </PageLayout>
  );
};

export default Terms;
