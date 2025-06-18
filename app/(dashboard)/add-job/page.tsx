import CreateJobForm from "@/components/CreateJobForm";
import { ThemeProvider } from "@/components/theme-provider";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
function AddJobPage() {
  const queryClient = new QueryClient();
  return (
   <HydrationBoundary state={dehydrate(queryClient)}>
   <CreateJobForm/>
  
   </HydrationBoundary>

    
  )
}
export default AddJobPage