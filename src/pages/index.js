import { cn } from "@/shadcn-ui/libs/utils";
import { canvasStart } from "@/utils/canvasStar";
import { useEffect, useRef } from "react";

export default function HomePage(props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log("useEffect", props.URL);
    canvasStart(canvasRef.current);
  });

  return (
    // #c7ecee, #a5b1c2
    <div
      className={cn("h-[100vh] w-full")}
      style={{
        backgroundImage:
          "linear-gradient(to bottom,  #d5eaf4, #b2d8e6, #92b6cb, #7394af)"
      }}
    >
      <canvas ref={canvasRef} className="h-full w-full"></canvas>
    </div>
  );
}

export async function getStaticProps(context) {
  const fetch = require("../api/fetch");
  const resp = await fetch("/");
  const URL = process.env.API_URL;
  return {
    props: {
      URL
    }
  };
}
