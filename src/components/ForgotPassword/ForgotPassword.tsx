import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const schema = z.object({
  email: z.string(),
});

type UserFormField = z.infer<typeof schema>;

const defaultValues: UserFormField = {
  email: "",
};

const ForgotPassword = () => {
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
        autoClose={5000}
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
            Forgot Password
          </h3>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <>
                    <Input placeholder="Enter Email" {...field} />
                    {form.formState.errors.email && (
                      <p className="text-red-600">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="w-full flex flex-col gap-3 justify-center items-center">
            <p>
              We’ll send a verification code to this email if it matches an
              existing Talentum account.
            </p>
            <Button
              type="submit"
              variant={"default"}
              className="w-full pb-5 pt-5"
            >
              Next
            </Button>
            <Button
              type="button"
              variant={"ghost"}
              className="w-full pb-5 pt-5 text-white"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPassword;
