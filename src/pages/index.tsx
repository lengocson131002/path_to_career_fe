import HomeCommunity from "@/components/home/HomeCommunity";
import HomeFeature from "@/components/home/HomeFeature";
import HomeHero from "@/components/home/HomeHero";
import HomePartnership from "@/components/home/HomePartnership";
import HomePost from "@/components/home/HomePost";
import HomeService from "@/components/home/HomeService";

function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeFeature />
      <HomePost />
      <HomeCommunity />
      <HomeService />
      <HomePartnership />
    </>
  );
}

export default HomePage;
