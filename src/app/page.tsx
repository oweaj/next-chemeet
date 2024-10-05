import { Container, Footer, Header } from "@/common/Layout";
import SectionTitle from "@/common/Atoms/Text/SectionTitle";
import TopBannerSection from "./_components/TopBannerSection";
import UserReviewSlider from "./_components/ReviewSection/UserReviewSlider";
import RecommendProStudies from "./_components/RecommendProStudies";
import RecommendLatestStudies from "./_components/RecommendLatestStudies";
import MainStatusBoard from "./_components/MainStatusBoard";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getStudy } from "@/lib/actions/studyAction";
import MainSectionOfGoals from "./_components/CategoryTab/MainSectionOfGoals";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["study"],
    queryFn: () => getStudy(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <Header />
      <TopBannerSection />
      <Container>
        <div className="flex flex-col gap-100 mt-100">
          <MainStatusBoard />
          <HydrationBoundary state={dehydratedState}>
            <section>
              <SectionTitle size="md" className="mb-6">
                방금 만들어진 스터디 추천
              </SectionTitle>
              <RecommendLatestStudies />
            </section>
            <section>
              <SectionTitle size="md" className="mb-6">
                인기 많은 스터디 추천
              </SectionTitle>
              <RecommendProStudies />
            </section>
            <section>
              <SectionTitle size="md" className="mb-6">
                목표별 스터디 탐색하기
              </SectionTitle>
              <MainSectionOfGoals />
            </section>
          </HydrationBoundary>
        </div>
      </Container>
      <section className="reviews-promotion my-100">
        <Container>
          <SectionTitle size="md" className="mb-6">
            케밋 스터디원들의 놀라운 성장 후기
          </SectionTitle>
        </Container>
        <UserReviewSlider />
      </section>
      <Footer />
    </>
  );
}
