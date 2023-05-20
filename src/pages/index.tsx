import HomeCommunity from "@/components/business/home/HomeCommunity";
import HomeFeature from "@/components/business/home/HomeFeature";
import HomeHero from "@/components/business/home/HomeHero";
import HomePost from "@/components/business/home/HomePost";

function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeFeature />
      <HomePost />
      <HomeCommunity />
    </>
  );
}

export default HomePage;
