import Header from "@/app/(homepage)/header";
import Hero from "./(homepage)/hero";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense>
        <Header />
      </Suspense>
      <Hero />
    </div>
  );
}
