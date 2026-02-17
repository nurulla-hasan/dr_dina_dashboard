"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { TFaq } from "@/types/faq.type";
import {
  useCreateFaqMutation,
  useUpdateFaqMutation,
} from "@/redux/feature/faq/faqApis";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import type { TError } from "@/types/global.types";

interface AddFAQModalProps {
  mode?: "add" | "edit";
  faq?: TFaq;
  children?: React.ReactNode;
}

type FAQFormValues = {
  question: string;
  answer: string;
};

const AddFAQModal = ({ mode = "add", faq, children }: AddFAQModalProps) => {
  const [open, setOpen] = useState(false);
  const [createFaq, { isLoading: isCreating }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();

  const form = useForm<FAQFormValues>({
    defaultValues: {
      question: faq?.Ques || "",
      answer: faq?.Answere || "",
    },
  });

  useEffect(() => {
    if (open && faq) {
      form.reset({
        question: faq.Ques,
        answer: faq.Answere,
      });
    } else if (open && mode === "add") {
      form.reset({
        question: "",
        answer: "",
      });
    }
  }, [open, faq, mode, form]);

  const onSubmit = async (data: FAQFormValues) => {
    try {
      const payload = {
        Ques: data.question,
        Answere: data.answer,
      };

      if (mode === "add") {
        const res = await createFaq(payload).unwrap();
        SuccessToast(res.message || "FAQ created successfully");
        form.reset();
      } else {
        const res = await updateFaq({
          id: faq?._id,
          data: payload,
        }).unwrap();
        SuccessToast(res.message || "FAQ updated successfully");
      }
      setOpen(false);
    } catch (err) {
      const error = err as TError;
      ErrorToast(error?.data?.message || "Something went wrong");
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title={mode === "add" ? "Add New FAQ" : "Edit FAQ"}
      description={mode === "add" ? "Add a new frequently asked question" : "Edit the frequently asked question"}
      actionTrigger={
        children || (
          <Button className="rounded-full">
            <Plus />
            Add FAQ
          </Button>
        )
      }
    >
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter question" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter answer"
                      className="min-h-37.5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : mode === "add" ? "Add FAQ" : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ModalWrapper>
  );
};

export default AddFAQModal;
