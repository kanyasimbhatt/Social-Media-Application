import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import z from "zod";
import { ToastContainer, toast } from "react-toastify";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosUserInstance } from "@/Service/axiosInstance";
import { useAuth } from "@/hooks/useAuth";

const schema = z.object({
  identity: z.string(),
  password: z.string(),
});

type UserFormField = z.infer<typeof schema>;

const defaultValues: UserFormField = {
  identity: "",
  password: "",
};

type EmailType = {
  email: string;
  password: string;
};

type UsernameType = {
  username: string;
  password: string;
};

const Login = () => {
  const [isPassword, setIsPassword] = useState(true);
  const { setTokens } = useAuth();
  const navigate = useNavigate();
  const form = useForm<UserFormField>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  const onSubmit: SubmitHandler<UserFormField> = async (data) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let newData: EmailType | UsernameType;
    if (regex.test(data.identity)) {
      newData = { password: data.password, email: data.identity };
    } else {
      newData = { password: data.password, username: data.identity };
    }

    try {
      const response = await axiosUserInstance.post("/login", newData);

      toast.success("You are logged in", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTokens({
        accessToken: response.data.data.accessToken,
        refreshToken: response.data.data.refreshToken,
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.log(err);
      form.setError("root", { message: "Invalid Credentials" });
    }
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
            Login
          </h3>
          <FormField
            control={form.control}
            name="identity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username or Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Username or Email" {...field} />
                </FormControl>
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
                  <div>
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
                    <Link to="/forgot-password">Forgot Password? </Link>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex flex-col gap-3 justify-center items-center">
            <Button type="submit" variant={"default"}>
              Login
            </Button>
            <h6 className="scroll-m-20 text-md tracking-tight text-center">
              New to Talentum? Join Now! <Link to="/register">Register</Link>{" "}
            </h6>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
