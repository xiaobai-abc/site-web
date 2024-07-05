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
    <div
      className={cn("h-[100vh] w-full")}
      style={{
        backgroundImage:
          "linear-gradient(-225deg, #231557 0%, #43107a 29%, #FF1361 100%)"
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
