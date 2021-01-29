import React from "react";
import useUser from "@/hooks/useUser";
import { mutate } from "swr";

export default function Picture() {
  const { user } = useUser(-42);

  const handleSubmit = () => {
    // jergauth will do this part :D
    // But if you feel confident enough, you must use `mutate` from SWR
    //  to handle the submit case
  };

  return <div />;
}
