import HomeCommunity from "@/components/business/home/HomeCommunity";
import HomeFeature from "@/components/business/home/HomeFeature";
import HomeHero from "@/components/business/home/HomeHero";
import HomePartnership from "@/components/business/home/HomePartnership";
import HomePost from "@/components/business/home/HomePost";
import HomeService from "@/components/business/home/HomeService";

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
