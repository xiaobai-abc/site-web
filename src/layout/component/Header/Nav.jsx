import { Menubar, MenubarMenu, MenubarTrigger } from "@/shadcn-ui/ui/menubar";
import { Button } from "@/shadcn-ui/ui/button";
import { cn } from "@/shadcn-ui/libs/utils";
import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

export default function NavCom() {
  console.log("nav");
  const Nav = [
    {
      key: "/",
      title: "首页"
    },
    {
      key: "/copywriter",
      title: "文案"
    },
    {
      key: "/test",
      title: "测试"
    }
  ];
  const [navFull, setFull] = useState(false);
  function onScroll(e) {
    if (window.scrollY > 100) {
      !navFull && setFull(true);
    } else {
      setFull(false);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {};
  }, []);

  return (
    <nav
      className={cn(
        "fixed flex items-center top-8 left-[50%] translate-x-[-50%] z-10",
        "rounded-full overflow-hidden py-2 px-6 transition-width duration-500",
        "justify-between backdrop-blur shadow-lg origin-center",
        navFull ? styles.nav : "w-[80vw]"
      )}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0)"
      }}
    >
      <div className="flex items-center">
        <img
          className="w-[30px] h-[30px] object-cover overflow-hidden rounded-full"
          src={require("@/assets/head.jpeg").default.src}
          alt="xiaobai"
        />
        <span className="ml-4 text-md text-foreground">XIAOBAI</span>
      </div>

      <div className={cn("flex items-center")}>
        {Nav.map((item) => {
          return (
            <span
              key={item.key}
              className={cn("ml-4 text-md text-foreground", "pulse")}
            >
              <Link href={item.key}>{item.title}</Link>
            </span>
          );
        })}
        <span className={cn("ml-4")}>
          <Button size="icon" className="mr-4 w-8 h-8 rounded-full ">
            <Sun size={"1rem"} />
          </Button>
        </span>
      </div>
    </nav>
  );
}
