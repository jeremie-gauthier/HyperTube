import { useRouter } from "next/router";

export default function CustomID(): JSX.Element {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <span>{id}</span>
    </div>
  );
}
