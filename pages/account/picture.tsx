import React from "react";
import useUser from "@/hooks/useUser";
import { mutate } from "swr";
import SiteLayout from "@/components/Layouts/SiteLayout";
import fetcher from "@/lib/fetcher";
import Image from "next/image";
import styles from "./picture.module.scss";
import { FlexCol, FlexRow } from "@/components/Flex";
import { User } from "@/types/user";
import { ReactComponent as CrossIcon } from "../../public/icons/cross.svg";
import { ReactComponent as CheckIcon } from "../../public/icons/check.svg";

type PictureProps = {
  user: User;
};

function Picture({ user }: PictureProps) {
  const images = Array.from({ length: 8 }, (_, idx) => idx + 1);
  const [currentId, setCurrentId] = React.useState(user.picture);

  const handleSubmit = () => {
    // jergauth will do this part :D
    // But if you feel confident enough, you must use `mutate` from SWR
    //  to handle the submit case
  };

  const randomPicture = (currentId: number) => {
    const newId = Math.floor(Math.random() * 8 + 1);
    if (newId === currentId) return (newId % 8) + 1;
    else return newId;
  };

  return (
    <div className={styles.container}>
      <FlexRow className={"justify-center"}>
        <Image
          src={`/img/avatar/avatar${currentId}.png`}
          alt="Current profile picture"
          width={150}
          height={150}
          quality={100}
          className={styles.picture}
          key={currentId}
        />
      </FlexRow>
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
              onClick={() => setCurrentId(id)}
            />
          </div>
        ))}
        <div className={styles.miniature}>
          <button
            type="submit"
            className={styles.randomMiniature}
            onClick={() => setCurrentId(randomPicture(currentId))}
          >
            ?
          </button>
        </div>
      </FlexRow>
      <FlexRow className={"justify-center"}>
        <div className={styles.check}>
          <CheckIcon></CheckIcon>
        </div>
        <div className={styles.cross}>
          <CrossIcon className={styles.crossIcon}></CrossIcon>
        </div>
      </FlexRow>
    </div>
  );
}

Picture.Layout = SiteLayout;
Picture.Title = "pages.account.my_account";

export default Picture;

export async function getServerSideProps() {
  const user = await fetcher(`http://localhost:3000/api/users/${-42}`, {
    method: "GET",
  });
  return { props: { user } };
}
