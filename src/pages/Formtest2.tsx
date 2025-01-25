import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Radio, Button, Group } from "@mantine/core";

// Zod schema for validation
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["male", "female", "other"]).refine((val) => val !== undefined, {
    message: "Gender is required",
  }),
  subscription: z.enum(["basic", "premium", "pro"]).refine((val) => val !== undefined, {
    message: "Subscription type is required",
  }),
});

// Define TypeScript type based on the schema
type FormValues = z.infer<typeof schema>;

const Formtest2: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      gender: undefined,
      subscription: undefined,
    },
  });

  // Simulate fetching default data
  useEffect(() => {
    const fetchInitialData = async () => {
      const defaultValues: FormValues = {
        name: "John Doe",
        email: "johndoe@example.com",
        gender: "male",
        subscription: "premium",
      };
      reset(defaultValues); // Update the form with default values
    };

    fetchInitialData();
  }, [reset]);

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name Input */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Name"
            placeholder="Enter your name"
            {...field}
            error={errors.name?.message}
          />
        )}
      />

      {/* Email Input */}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Email"
            placeholder="Enter your email"
            {...field}
            error={errors.email?.message}
          />
        )}
      />

      {/* Gender Radio Group */}
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <Radio.Group
            label="Gender"
            {...field}
            error={errors.gender?.message}
          >
            <Radio value="male" label="Male" />
            <Radio value="female" label="Female" />
            <Radio value="other" label="Other" />
          </Radio.Group>
        )}
      />

      {/* Subscription Radio Group */}
      <Controller
        name="subscription"
        control={control}
        render={({ field }) => (
          <Radio.Group
            label="Subscription Type"
            {...field}
            error={errors.subscription?.message}
          >
            <Radio value="basic" label="Basic" />
            <Radio value="premium" label="Premium" />
            <Radio value="pro" label="Pro" />
          </Radio.Group>
        )}
      />

      {/* Submit Button */}
      <Group align="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};

export default Formtest2;
