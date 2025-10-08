"use client";

import NotFound from "./components/layout/NotFound";
import NotFoundHeader from "./components/layout/NotFoundHeader";

export default function NotFoundPage() {
  return (
    <>
      <NotFoundHeader />
      <section className="fixed bottom-0 h-[calc(100vh-108px)] w-full mt-6">
        <NotFound />
      </section>
    </>
  );
}
