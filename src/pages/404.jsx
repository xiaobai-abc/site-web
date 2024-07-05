import React from "react";
import NotFoundSVG from "@/assets/NotFoundSVG.svg";
import { cn } from "@/shadcn-ui/libs/utils";
import { useRouter } from "next/router";
import { Button } from "@/shadcn-ui/ui/button";

export default function Custom404() {
  const router = useRouter();
  function onBackHome() {
    router.push("/");
  }

  return (
    <main>
      <div className="container">
        <div className="mx-auto flex pt-[200px] justify-center">
          <img className={cn("w-[40vw]")} src={NotFoundSVG.src} alt="404" />

          <div className="flex flex-col justify-center ml-10">
            <h1 className="text-5xl">404</h1>
            <h2 className="text-lg mt-6 mb-4">页面走丢啦~~~~~</h2>
            <Button onClick={onBackHome}>回到首页</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
