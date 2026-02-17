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
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} from "@/redux/feature/settings/settingsApis";
import type { TError } from "@/types/global.types";

type FormValues = {
  content: string;
};

const Privacy = () => {
  const { data: privacyData, isLoading: isFetching } = useGetPrivacyPolicyQuery(undefined);
  const [updatePrivacyPolicy, { isLoading: isSubmitting }] =
    useUpdatePrivacyPolicyMutation();

  const form = useForm<FormValues>({
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    if (privacyData?.data?.privacyPolicy) {
      form.reset({
        content: privacyData.data.privacyPolicy,
      });
    }
  }, [privacyData, form]);

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await updatePrivacyPolicy({
        privacyPolicy: data.content,
      }).unwrap();
      SuccessToast(res.message || "Privacy Policy saved successfully");
    } catch (err) {
      const error = err as TError;
      ErrorToast(error?.data?.message || "Failed to save Privacy Policy");
    }
  };

  return (
    <PageLayout>
      <PageHeader
        title="Privacy Policy"
        description="Manage the Privacy Policy page content"
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

export default Privacy;
