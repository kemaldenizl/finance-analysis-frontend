"use client";
import {
  logoutAction,
  LogoutActionState,
} from "@/src/features/auth/logout/actions";
import { useActionState } from "react";

const initialState: LogoutActionState = {
  success: false,
};

export default function LogoutButton() {
  const [state, formAction] = useActionState(logoutAction, initialState);
  return (
    <>
      <form action={formAction}>
        <button
          type="submit"
          className="cursor-pointer"
        >
          Çıkış Yap
        </button>
      </form>
    </>
  );
}
