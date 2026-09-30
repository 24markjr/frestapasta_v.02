import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { FeaturePosters } from "@/components/home/FeaturePosters";
import { ChefBand } from "@/components/home/ChefBand";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturePosters />
      <ChefBand tone="cream" />
    </>
  );
}
