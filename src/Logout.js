import { redirect } from "react-router-dom";
import { deleteUser } from "./Helper";
import { toast } from "react-toastify";

export async function logOutAction() {
  deleteUser({
    key: "userName",
  });
  toast.success("You have deleted your account!");
  return redirect("/");
}
