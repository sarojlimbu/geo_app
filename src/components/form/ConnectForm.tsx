import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleFileChange } from "@/helpers";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  contact: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
});

type FormData = z.infer<typeof schema>;

const ConnectForm: React.FC = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [cv, setCV] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      address: "",
      email: "",
      contact: "",
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e, {
      fileType: "image",
      onValid: (file) => setPhoto(file),
      previewSetter: setPhotoPreview,
      onInvalid: () => {
        setPhoto(null);
        setPhotoPreview(null);
      },
    });
  };

  const handleCVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e, {
      fileType: "document",
      onValid: (file) => setCV(file),
      onInvalid: () => setCV(null),
    });
  };

  const onSubmit = (data: FormData) => {
    const formData = { ...data, photo: photo };
    formData &&
      toast.success("Success!!!", {
        description: "Your record is submitted",
      });

    form.reset();

    setPhoto(null);
    setPhotoPreview(null);
    setCV(null);
  };

  return (
    <div className="w-full mx-auto shadow-md bg-white p-4 md:p-12  item-col gap-4">
      <span className="text-2xl">Drop your Record</span>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="focus-visible:ring-1  focus-visible:outline-none rounded-none"
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    className="focus-visible:ring-1  focus-visible:outline-none rounded-none"
                    placeholder="Address"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="focus-visible:ring-1  focus-visible:outline-none rounded-none"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    className="focus-visible:ring-1  focus-visible:outline-none rounded-none"
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={10}
                    placeholder="Phone"
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /\D/g,
                        "",
                      );
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-600" />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Upload Photo</FormLabel>
            <Input
              className="focus-visible:ring-1  focus-visible:outline-none rounded-none"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              placeholder="Upload Photo"
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                className="w-24 h-24 rounded object-cover mt-2"
              />
            )}
          </div>

          <div className="space-y-2">
            <FormLabel>Upload CV</FormLabel>
            <Input
              className="focus-visible:ring-1  focus-visible:outline-none rounded-none"
              type="file"
              accept=".pdf,.doc,.docx"
              placeholder="Upload CV"
              onChange={handleCVChange}
            />
            {cv && (
              <p className="text-sm text-green-600 mt-1">Uploaded: {cv.name}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-fit text-primary rounded-none cursor-pointer bg-primary hover:bg-[var(--color-secondary)]  transition-colors duration-300"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ConnectForm;
