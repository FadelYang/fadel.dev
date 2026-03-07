import Header from "@/app/(homepage)/header";
import Hero from "./(homepage)/hero";
import { Suspense } from "react";
import Experience from "./(homepage)/experience";

export default function Home() {
  return (
    <div>
      <Suspense>
        <Header />
      </Suspense>
      <Hero />
      <Experience />
    </div>
  );
}
