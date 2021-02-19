import { toast } from "react-toastify";

export { ToastContainer, toast } from "react-toastify";

export const toastError = (
  message: string,
  position = toast.POSITION.BOTTOM_RIGHT,
) => {
  toast.error(message ?? "Une erreur est survenue", {
    position,
  });
};

export const toastInfo = (
  message: string,
  position = toast.POSITION.TOP_RIGHT,
) => {
  toast.info(message, {
    position,
  });
};
