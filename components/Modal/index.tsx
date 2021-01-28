import React from "react";
import ReactDOM from "react-dom";
import useOnClickOutside from "use-onclickoutside";
import styles from "./Modal.module.scss";

type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  close: () => void;
};

export default function Modal({ children, close, ...rest }: ModalProps) {
  const ref = React.useRef(null);
  useOnClickOutside(ref, close);

  return (
    <Portal className={styles.portal}>
      <div {...rest} ref={ref}>
        {children}
      </div>
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
