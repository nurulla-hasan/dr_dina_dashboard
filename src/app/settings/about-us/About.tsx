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
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
} from "@/redux/feature/settings/settingsApis";
import type { TError } from "@/types/global.types";

type FormValues = {
  content: string;
};

const About = () => {
  const { data: aboutData, isLoading: isFetching } = useGetAboutUsQuery(undefined);
  const [updateAboutUs, { isLoading: isSubmitting }] =
    useUpdateAboutUsMutation();

  const form = useForm<FormValues>({
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    if (aboutData?.data?.aboutUs) {
      form.reset({
        content: aboutData.data.aboutUs,
      });
    }
  }, [aboutData, form]);

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await updateAboutUs({
        aboutUs: data.content,
      }).unwrap();
      SuccessToast(res.message || "About Us saved successfully");
    } catch (err) {
      const error = err as TError;
      ErrorToast(error?.data?.message || "Failed to save About Us");
    }
  };

  return (
    <PageLayout>
      <PageHeader title="About Us" description="Manage the About Us page content" />

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

export default About;
