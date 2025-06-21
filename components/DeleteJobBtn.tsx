import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobAction } from "@/utils/actions";
import { toast } from "sonner";

function DeleteJobBtn({ id }: { id: string }) {
  // const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      // if (!data) {
      //   toast({
      //     description: "there was an error",
      //   });
      //   return;
      // }

      if (!data) {
        toast.error("There was an error");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });

      // toast({ description: "job removed" });
      toast.success("job removed");
    },
  });
  return (
    <Button
      size="sm"
      disabled={isPending}
      onClick={() => {
        mutate(id);
      }}
    >
      {isPending ? "deleting..." : "delete"}
    </Button>
  );
}
export default DeleteJobBtn;
