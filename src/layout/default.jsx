import { Inter } from "next/font/google";
import { cn } from "@/shadcn-ui/libs/utils";
import Header from "./component/Header";
import Footer from "./component/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function DefaultLayoutPage(props) {
  return (
    <section className={cn(inter.className, "box-border py-2 min-h-screen")}>
      <Header> </Header>
      <section className="box-border min-h-[80vh] m-auto px-10">
        {props.children}
      </section>
      <Footer></Footer>
    </section>
  );
}



