"use client";
import dynamic from "next/dynamic";

// 1. Dynamically import the component we just created
// 2. Set 'ssr: false' to disable Server-Side Rendering for this part
const StandaloneBoard = dynamic(
  () => import("../../components/StandaloneBoard"),
  { ssr: false }
);

export default function WhiteboardPage() {
  return (
    <main>
      <StandaloneBoard />
    </main>
  );
}