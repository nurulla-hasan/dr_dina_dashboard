"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModalWrapper } from "@/components/ui/modal-wrapper";
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
import { type FAQ } from "./faq-columns";

interface AddFAQModalProps {
  mode?: "add" | "edit";
  faq?: FAQ;
  children?: React.ReactNode;
}

type FAQFormValues = {
  question: string;
  answer: string;
};

const AddFAQModal = ({ mode = "add", faq, children }: AddFAQModalProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<FAQFormValues>({
    defaultValues: {
      question: faq?.question || "",
      answer: faq?.answer || "",
    },
  });

  const onSubmit = (data: FAQFormValues) => {
    console.log(data);
    setOpen(false);
    if (mode === "add") {
      form.reset();
    }
  };

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
              <Button type="submit" className="w-full">
                {mode === "add" ? "Add FAQ" : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ModalWrapper>
  );
};

export default AddFAQModal;
