import { Menubar, MenubarMenu, MenubarTrigger } from "@/shadcn-ui/ui/menubar";
import { Button } from "@/shadcn-ui/ui/button";
import { cn } from "@/shadcn-ui/libs/utils";
import Link from "next/link";
import { Sun, Moon, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useRouter } from "next/router";

const pageLinkColor = {
  "/": "rgb(255, 255, 255, 0.8)"
};

export default function NavCom(props) {
  const router = useRouter();
  const Nav = [
    {
      key: "/",
      title: "首页",
      lineColor: "rgb(255, 255, 255, 0.2)"
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

  function linkColor() {
    return pageLinkColor[router.pathname];
  }

  return (
    <div
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
          className="w-8 h-8 object-cover overflow-hidden rounded-full flex-initial"
          src={require("@/assets/head.jpeg").default.src}
          alt="xiaobai"
        />
        <span className="ml-4 text-md text-foreground text-nowrap">
          XIAOBAI
        </span>
      </div>

      <div className={cn("flex items-center")}>
        {Nav.map((item) => {
          return (
            <span
              key={item.key}
              className={cn("ml-4 text-md", "pulse", "text-foreground")}
              style={{
                color: linkColor()
              }}
            >
              <Link href={item.key}>{item.title}</Link>
            </span>
          );
        })}
        <span className={cn("ml-4")}>
          <Button
            size="icon"
            variant="outline"
            className="w-8 h-8 rounded-full dc"
            onClick={props.onThemeToggle}
          >
            {props.themeMode === "dark" ? (
              <Moon size={"1rem"} />
            ) : (
              <Sun size={"1rem"} />
            )}
          </Button>
        </span>
        <span className={cn("ml-4")}>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full"
            onClick={props.onHandleSetting}
          >
            <Settings size={"1rem"} className="dc" />
          </Button>
        </span>
      </div>
    </div>
  );
}
