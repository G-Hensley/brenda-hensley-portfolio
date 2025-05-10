import { toast } from "sonner";

export const successToast = (item: string, action: string) => {
  toast.success(`The ${item} has been ${action} successfully`, {
    description: `The ${item} has been ${action} from the database.`,
    duration: 3000,
    position: "top-center",
    icon: "🚀",
    style: {
      background: "#000000",
      color: "#ffffff",
      border: "1px solid #1c1c1c",
      zIndex: 9999,
    },
  });
};

export const errorToast = (item: string, action: string) => {
  toast.error(`Failed to ${action} the ${item}`, {
    description: `Failed to ${action} the ${item} from the database.`,
    duration: 3000,
    position: "top-center",
    icon: "🚫",
    style: {
      background: "#9E0700",
      color: "#ffffff",
      border: "1px solid #1c1c1c",
      zIndex: 9999,
    },
  });
};
