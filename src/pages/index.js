import Image from "next/image";
import Head from "next/head";
import { useEffect, useState, useMemo } from "react";
import { cn } from "@/shadcn-ui/libs/utils";
import styles from "./_index.module.css";

let isAnimation = false;
export default function Home(props) {
  const [wheelType, setWheelType] = useState("null");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const imgList = [...props.image];
    console.log(imgList);
    // preloadImg(props.image);
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
      setCurrentIndex((currentIndex + 1) % props.image.length);
    } else {
      setCurrentIndex(
        (currentIndex - 1 + props.image.length) % props.image.length
      );
    }
    setWheelType(null);
  }

  function RenderImage() {
    const list = props.image;
    const prevIndex = (currentIndex - 1 + list.length) % list.length;
    const nextIndex = (currentIndex + 1) % list.length;
    const cnm =
      "w-full h-full absolute z-1 overflow-hidden transition-all duration-1000";

    return (
      <>
        <div className={cn(cnm, "top-0 h-0", styles.prev)}>
          <Image
            className="w-full h-full object-cover transition-all duration-1000"
            src={list[prevIndex]}
            fill={true}
            alt=""
          />
        </div>
        <div className={cn(cnm, styles.cur)}>
          <Image
            className="w-full h-full object-cover transition-all duration-1000"
            src={list[currentIndex]}
            fill={true}
            alt=""
          />
        </div>
        <div className={cn(cnm, "bottom-0 h-0", styles.next)}>
          <Image
            className="w-full h-full object-cover absolute bottom-0 transition-all duration-1000"
            src={list[nextIndex]}
            fill={true}
            alt=""
          />
        </div>
      </>
    );
  }

  return (
    <>
      {/* <Head>
        <title>{props.title}</title>
      </Head> */}
      <div
        className={cn(
          "box-border h-[100vh] relative z-1 overflow-hidden",
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
        {/* {props.image.map((src) => {
          return (
            <div
              key={src}
              className="h-screen w-full bg-cover bg-center bg-no-repeat sticky top-0 z-1"
              style={{ backgroundImage: `url(${src})` }}
            ></div>
          );
        })} */}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const fetch = require("../api/fetch");
  const data = await fetch("/home");

  return {
    props: data
  };
}
