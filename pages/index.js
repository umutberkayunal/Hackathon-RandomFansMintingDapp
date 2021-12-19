import Head from "next/head";
import Image from "next/image";

import Header from "../src/components/Header";
import Hero from "../src/components/Hero";
import About from "../src/components/About";
import Gallery from "../src/components/Gallery";
import FAQ from "../src/components/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-primary">
      <Header />
      <Hero />
      <About />
      <Gallery />
      <FAQ />
    </div>
  );
}
