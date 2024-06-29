import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { cn } from "@/shadcn-ui/libs/utils";
import styles from "./_index.module.css";

let isAnimation = false;
export default function Home(props) {
  const [wheelType, setWheelType] = useState("null");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const imgList = [...props.image];
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

    if (!list) return <>null</>;
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
      </div>
    </>
  );
}

export async function getStaticProps() {
  const fetch = require("../api/fetch");

  const data = await fetch("/home");
  // .then((res) =>
  //   res.json()
  // );

  // axios.get("http://127.0.0.1:3000/api/home").then(resp=>{
  //   console.log(resp.data)
  // })
  return {
    props: data
  };
}
