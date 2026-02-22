import Hero from "@/feature/Hero/Hero";
import NewArrivals from "@/feature/NewArrivals/NewArrivals";
import { Trending } from "@/feature/Trending/Trending";

export default function Home() {
  return (
    <>
      <Hero />
      <NewArrivals />
      <Trending />
    </>
  );
}
