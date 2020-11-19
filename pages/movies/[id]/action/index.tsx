import React from "react";
import { useRouter } from "next/router";

export default function Action(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <div>Ajouter un Film</div>
      <span>{id}</span>
    </div>
  );
}
