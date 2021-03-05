import React from "react";
import SiteLayout from "@/components/Layouts/SiteLayout";
import fetcher from "@/lib/fetcher";
import Image from "next/image";
import { FlexRow } from "@/components/Flex";
import { User } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/router";
import { Methods } from "@/types/requests";
import useUser, { usePatchUser, usersRoute } from "@/hooks/api/useUser";
import styles from "./picture.module.scss";
import { ReactComponent as CrossIcon } from "../../public/icons/cross.svg";
import { ReactComponent as CheckIcon } from "../../public/icons/check.svg";

type PictureProps = {
  user: User | null;
};

function Picture({ user }: PictureProps) {
  return user === null ? (
    <div>ERROR PAGE GOES HERE</div>
  ) : (
    <PictureContent initialData={user} />
  );
}

Picture.Layout = SiteLayout;
Picture.Title = "pages.account.my_account";

export default Picture;

export async function getServerSideProps() {
  const api = process.env.HYPERTUBE_API_URL;
  try {
    const user = await fetcher<User>(`${api}${usersRoute("-42")}`, {
      method: Methods.GET,
    });
    return { props: { user } };
  } catch {
    return { props: { user: null } };
  }
}

function PictureContent({ initialData }: { initialData: User }) {
  const { data: user, isValidating } = useUser(initialData.id, { initialData });
  const patcher = usePatchUser(initialData.id);

  const [currentId, setCurrentId] = React.useState(initialData.picture);
  const router = useRouter();

  const handleSubmit = async () => {
    patcher({ picture: currentId });
    router.push("/account#profile");
  };

  return (
    <div className={styles.container}>
      <FlexRow className="relative justify-center">
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
      <FormButtons
        onSubmit={handleSubmit}
        canSubmit={
          !isValidating && currentId !== (user?.picture ?? initialData.picture)
        }
      />
    </div>
  );
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
  canSubmit,
}: {
  onSubmit: () => void;
  canSubmit: boolean;
}) => (
  <FlexRow className={styles.formButtons}>
    <button
      className={styles.check}
      type="submit"
      onClick={onSubmit}
      disabled={!canSubmit}
    >
      <CheckIcon />
    </button>
    <Link href="/account#profile">
      <div className={styles.cross}>
        <CrossIcon />
      </div>
    </Link>
  </FlexRow>
);
