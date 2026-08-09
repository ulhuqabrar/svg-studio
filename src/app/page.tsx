import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import HeroProduct from "@/components/landing/hero-product";
import SocialProof from "@/components/landing/social-proof";
import Problem from "@/components/landing/problem";
import HowItWorks from "@/components/landing/how-it-works";
import StyleLibrary from "@/components/landing/style-library";
import GeneratorDemo from "@/components/landing/generator-demo";
import CustomStyle from "@/components/landing/custom-style";
import StyleAnalysis from "@/components/landing/style-analysis";
import UseCases from "@/components/landing/use-cases";
import Pricing from "@/components/landing/pricing";
import Faq from "@/components/landing/faq";
import FinalCta from "@/components/landing/final-cta";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HeroProduct />
      <SocialProof />
      <Problem />
      <HowItWorks />
      <StyleLibrary />
      <GeneratorDemo />
      <CustomStyle />
      <StyleAnalysis />
      <UseCases />
      <Pricing />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
