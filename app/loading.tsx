import Loader from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <Loader />
    </div>
  );
}
