"use client";

import LoadingButton from "@/components/LoadingButton/LoadingButton";
import PhoneInput from "@/components/PhoneInput/PhoneInput";

export default function HomePage() {
  return (
    <>
     <PhoneInput name="phone" mask="99999" maskChar=" " placeholder="phone" />
    </>
  );
}
