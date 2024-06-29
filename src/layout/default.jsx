import { cn } from "@/shadcn-ui/libs/utils";
import { Inter } from "next/font/google";

import Header from "./component/Header";
import Footer from "./component/Footer";
import { useMemo } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function DefaultLayoutPage(props) {
  return (
    <section className={cn(inter.className, "box-border min-h-screen relative")}>
      {useMemo(
        () => (
          <Header> </Header>
        ),
        []
      )}
      <section className="box-border min-h-[80vh] m-auto">
        {props.children}
      </section>
      <Footer></Footer>
    </section>
  );
}
