import useEvent from "@/hooks/useEvent";
import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  close: () => void;
};

export default function Modal({ children, close, ...rest }: ModalProps) {
  useEvent(["Escape"], close);

  return (
    <Portal className={styles.portal}>
      <div {...rest}>{children}</div>
    </Portal>
  );
}

type PortalProps = Pick<React.HTMLAttributes<HTMLDivElement>, "className"> & {
  children: React.ReactNode;
};

function Portal({ children, className = "" }: PortalProps) {
  const [container] = React.useState(() => {
    const el = document.createElement("div");
    el.classList.add(className);
    return el;
  });

  React.useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
}
