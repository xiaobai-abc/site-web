import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { cn } from "@/shadcn-ui/libs/utils";
import styles from "./_index.module.css";

let isAnimation = false;
export default function Test(props) {
  const [wheelType, setWheelType] = useState("null");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log(props);
  }, []);

  function onWheel(e) {
    if (!e.deltaY) return;
    if (isAnimation) return;
    isAnimation = true;
    if (e.deltaY > 0) {
      setWheelType("down");
    } else {
      setWheelType("up");
    }
  }

  function onTransitionEnd() {
    isAnimation = false;
    if (wheelType === "down") {
      setCurrentIndex((currentIndex + 1) % props.home.image.length);
    } else {
      setCurrentIndex(
        (currentIndex - 1 + props.home.image.length) % props.home.image.length
      );
    }
    setWheelType(null);
  }

  function RenderImage() {
    const list = props.home.image;

    if (!list) return <>null</>;
    const prevIndex = (currentIndex - 1 + list.length) % list.length;
    const nextIndex = (currentIndex + 1) % list.length;
    const cnm =
      "w-full h-full absolute z-1 overflow-hidden transition-all duration-1000";

    return (
      <>
        <div className={cn(cnm, "top-0 h-0", styles.prev)}>
          <img
            className="w-full h-full object-cover transition-all duration-1000"
            src={list[prevIndex]}
            alt=""
          />
        </div>
        <div className={cn(cnm, styles.cur)}>
          <img
            className="w-full h-full object-cover transition-all duration-1000"
            src={list[currentIndex]}
            alt=""
          />
        </div>
        <div className={cn(cnm, "bottom-0 h-0", styles.next)}>
          <img
            className="w-full h-full object-cover absolute bottom-0 transition-all duration-1000"
            src={list[nextIndex]}
            alt=""
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={cn("min-h-16 br mt-10 mb-10 pt-20")}></div>
      <div
        className={cn(
          "box-border h-[500px] relative z-1 overflow-hidden br",
          styles[wheelType]
        )}
        onWheel={onWheel}
        onTransitionEnd={onTransitionEnd}
      >
        {useMemo(
          () => (
            <RenderImage></RenderImage>
          ),
          [currentIndex]
        )}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const fetch = require("../api/fetch");

  const data = await fetch("/home");
  const mdHtml = await fetch("/home/md");

  return {
    props: {
      home: data,
      markdown: mdHtml
    }
  };
}
