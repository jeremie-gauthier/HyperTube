import i18n from "@/locales/i18n";
import { toast } from "react-toastify";

export { ToastContainer, toast } from "react-toastify";

export const toastError = (
  message: string,
  position = toast.POSITION.BOTTOM_RIGHT,
) => {
  toast.error(message ?? i18n.t("common.errors.error_occured"), {
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
