import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const schema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .refine(
      (value) =>
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
          value ?? ""
        ),
      `Enter a strong password`
    ),
});

type UserFormField = z.infer<typeof schema>;

const defaultValues: UserFormField = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const [isPassword, setIsPassword] = useState(true);
  const form = useForm<UserFormField>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  const onSubmit: SubmitHandler<UserFormField> = async (data) => {
    console.log(data);
  };

  return (
    <div className="h-lvh w-lvw flex justify-center items-center">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Form {...form}>
        <form
          className="p-10 shadow-2xl flex flex-col gap-6 rounded-md w-2xl"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
            Register
          </h3>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Username" {...field} />
                </FormControl>
                <FormDescription>This is your display name</FormDescription>
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
                  <Input placeholder="Enter Email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex border-1 rounded-md shadow-2xs items-center pr-3 cursor-pointer gap-3">
                    <Input
                      placeholder="Enter Password"
                      type={isPassword ? "password" : "text"}
                      {...field}
                      className="border-0 shadow-none"
                    />
                    <p onClick={() => setIsPassword(!isPassword)}>
                      {isPassword ? "Show" : "Hide"}
                    </p>
                  </div>
                </FormControl>
                <FormMessage />
                {form.formState.errors.root && (
                  <p className="text-red-600">
                    {form.formState.errors.root.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          <div className="w-full flex flex-col gap-3 justify-center items-center">
            <Button type="submit" variant={"default"}>
              Register
            </Button>
            <h6 className="scroll-m-20 text-md tracking-tight text-center">
              Already on Talentum? <Link to="/login">Login</Link>{" "}
            </h6>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Register;
