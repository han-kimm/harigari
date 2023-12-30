import Input from "@/components/Input/Input";
import InputWrapper from "@/components/Input/InputWrapper";
import Button from "@/components/Buttons/Button/Button";
import { signupEmail, signupNickname, signupPassword, signupPasswordCheck } from "@/constants/inputConfig";
import useInputController from "@/hooks/useInputController";
import Image from "next/image";
import Link from "next/link";
import styles from "./signup.module.css";
import { FormEvent, useRef } from "react";
import sender from "@/apis/sender";
import { useRouter } from "next/router";

type RefProps = "email" | "nickname" | "password" | "passwordCheck";
type RefValue = HTMLElement | null;
type Ref = {
  [key in RefProps]: RefValue;
};

const Signup = () => {
  const inputRef = useRef<Ref>({ email: null, nickname: null, password: null, passwordCheck: null });
  const { wrapper: emailWrapper, input: emailInput } = useInputController(signupEmail);
  const { wrapper: nicknameWrapper, input: nicknameInput } = useInputController(signupNickname);
  const { wrapper: passwordWrapper, input: passwordInput } = useInputController(signupPassword);
  const { wrapper: passwordCheckWrapper, input: passwordCheckInput } = useInputController(signupPasswordCheck);
  const inputs: Array<[typeof emailWrapper, typeof emailInput]> = [
    [emailWrapper, emailInput],
    [nicknameWrapper, nicknameInput],
    [passwordWrapper, passwordInput],
    [passwordCheckWrapper, passwordCheckInput],
  ];
  const router = useRouter();

  const isError = () => {
    return inputs.some(([wrapper, input]) => {
      return !!wrapper.errorText || !input.value;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (const input of Object.values(inputRef.current)) {
      if (!input) continue;
      input.focus();
      input.blur();
    }

    if (passwordInput.value !== passwordCheckInput.value) return;

    const signupData = {
      email: emailInput.value,
      nickname: nicknameInput.value,
      password: passwordInput.value,
    };

    const res = await sender.post({ path: "signup", data: JSON.stringify(signupData) });
    if (res.status === 409) {
      emailWrapper.setErrorText(res.data.message);
      return;
    }
    if (res.status > 201) return;

    const signinData = {
      email: emailInput.value,
      password: passwordInput.value,
    };

    const login = await sender.post({ path: "signin", data: JSON.stringify(signinData) });
    if (login.status === 201) {
      document.cookie = `accessToken=${login.data.accessToken}`;
      router.push("/dashboard");
      return;
    }
  };

  return (
    <div className={styles.container}>
      <Image priority width={200} height={279} src="/images/logo-purple-vertical.png" alt="이전 페이지로 돌아갑니다." />
      <p className={styles.title}>첫 방문을 환영합니다!</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        {inputs.map(([wrapper, input], index) => {
          return (
            <InputWrapper {...wrapper} key={index}>
              <Input inputRef={inputRef} {...input} />
            </InputWrapper>
          );
        })}
        <Button buttonType="login" color="violet" disabled={isError()}>
          가입하기
        </Button>
      </form>
      <p className={styles.link__text}>
        이미 가입하셨나요? <Link href="/signin">로그인하기</Link>
      </p>
    </div>
  );
};

export default Signup;
