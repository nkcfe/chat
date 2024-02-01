import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "@/components/inputs/Input";
import Button from "@/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/conversations");
    }
  }, [router, session?.status]);

  const toggleVariant = () => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error("회원가입에 실패했습니다.");
          }

          if (callback?.ok) {
            toast.success("회원가입에 성공했습니다.");
            router.push("/conversations");
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error("에러가 발생하였습니다.");
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("회원가입에 실패했습니다.");
          }

          if (callback?.ok) {
            toast.success("회원가입에 성공했습니다.");
            router.push("/conversations");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("로그인에 실패했습니다.");
        }

        if (callback?.ok) {
          toast.success("로그인에 성공했습니다.");
          router.push("/conversations");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className={`mt-8 sm:mx-auto sm:w-full sm:max-w-md`}>
      <div className={`px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10`}>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name"
              label="이름"
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            type="email"
            label="이메일"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            type="password"
            label="비밀번호"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "로그인" : "회원가입"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t border-gray-300 text-sm`} />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">소셜 로그인</span>
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
          <div className="flex justify-center gap-2 px-2 mt-6 text-sm text-gray-500">
            <div>
              {variant === "LOGIN"
                ? "메신저를 처음 사용하시나요"
                : "이미 계정이 있나요?"}
            </div>
            <div className="underline cursor-pointer" onClick={toggleVariant}>
              {variant === "LOGIN" ? "계정만들기" : "로그인하기"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
