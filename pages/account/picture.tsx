import React from "react";
import SiteLayout from "@/components/Layouts/SiteLayout";
import fetcher from "@/lib/fetcher";
import Image from "next/image";
import { FlexRow } from "@/components/Flex";
import { User } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/router";
import { Methods } from "@/types/requests";
import { toastError } from "@/components/Toast";
import Spinner from "@/components/Spinner";
import useUser, { usersRoute } from "@/hooks/api/useUser";
import styles from "./picture.module.scss";
import { ReactComponent as CrossIcon } from "../../public/icons/cross.svg";
import { ReactComponent as CheckIcon } from "../../public/icons/check.svg";

type PictureProps = {
  initialData: User | null;
};

function Picture({ initialData }: PictureProps) {
  const { data: user, isValidating, mutate } = useUser("-42", { initialData });

  const [currentId, setCurrentId] = React.useState(user?.picture ?? 1);
  const router = useRouter();

  const handleSubmit = async () => {
    let hasError = false;
    await mutate(async (currentUser) => {
      try {
        const newUser = await fetcher<User>(usersRoute("-42"), {
          method: Methods.PATCH,
          body: JSON.stringify({ picture: currentId }),
        });
        return newUser;
      } catch (error) {
        hasError = true;
        toastError(error.info?.message);
        return currentUser;
      }
    });

    if (!hasError) {
      router.push("/account#profile");
    }
  };

  return (
    <div className={styles.container}>
      <FlexRow className="justify-center">
        <Image
          src={`/img/avatar/avatar${currentId}.png`}
          alt="Current profile picture"
          width={150}
          height={150}
          quality={100}
          key={currentId}
        />
      </FlexRow>
      <ImageList
        currentId={currentId}
        onClick={(id: number) => setCurrentId(id)}
      />
      <FormButtons onSubmit={handleSubmit} isLoading={isValidating} />
    </div>
  );
}

Picture.Layout = SiteLayout;
Picture.Title = "pages.account.my_account";

export default Picture;

export async function getServerSideProps() {
  const api = process.env.HYPERTUBE_API_URL;
  try {
    const initialData = await fetcher(`${api}${usersRoute("-42")}`, {
      method: Methods.GET,
    });
    return { props: { initialData } };
  } catch {
    return { props: { initialData: null } };
  }
}

const NB_PICTURES = 8;

type PictureListProps = {
  currentId: number;
  onClick: (id: number) => void;
};

const ImageList = ({ currentId, onClick }: PictureListProps) => {
  const images = Array.from({ length: NB_PICTURES }, (_, idx) => idx + 1);

  return (
    <FlexRow className={styles.miniatures}>
      {images.map((id) => (
        <div key={id} className={styles.miniature}>
          <Image
            src={`/img/avatar/avatar${id}.png`}
            alt="Another profile picture"
            width={85}
            height={85}
            quality={100}
            className={
              currentId === id ? styles.currentMiniature : styles.miniature
            }
            onClick={() => onClick(id)}
          />
        </div>
      ))}
      <RandomPicture
        currentId={currentId}
        onClick={(id: number) => onClick(id)}
      />
    </FlexRow>
  );
};

const RandomPicture = ({ currentId, onClick }: PictureListProps) => {
  const randomPicture = (currentId: number) => {
    const newId = Math.floor(Math.random() * NB_PICTURES + 1);
    return newId === currentId ? (newId + 1) % NB_PICTURES : newId;
  };

  return (
    <div className={styles.miniature}>
      <button
        type="submit"
        className={styles.randomMiniature}
        onClick={() => onClick(randomPicture(currentId))}
      >
        ?
      </button>
    </div>
  );
};

const FormButtons = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: () => void;
  isLoading: boolean;
}) => (
  <FlexRow className={styles.formButtons}>
    {isLoading ? (
      <Spinner />
    ) : (
      <>
        <button className={styles.check} type="submit" onClick={onSubmit}>
          <CheckIcon />
        </button>
        <Link href="/account#profile">
          <div className={styles.cross}>
            <CrossIcon />
          </div>
        </Link>
      </>
    )}
  </FlexRow>
);
