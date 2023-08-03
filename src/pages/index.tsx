import Events from "@/components/home/Events";
import HomeCommunity from "@/components/home/HomeCommunity";
import HomeFeature from "@/components/home/HomeFeature";
import HomeHero from "@/components/home/HomeHero";
import HomePartnership from "@/components/home/HomePartnership";
import HomeService from "@/components/home/HomeService";

function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeFeature />
      <HomeCommunity />
      <HomeService />
      <Events />
      <HomePartnership />
    </>
  );
}

export default HomePage;
