import { AspectRatio } from "@/shadcn-ui/ui/aspect-ratio";
import { cn } from "@/shadcn-ui/libs/utils";
import styles from "./_index.module.css";
import DialogContent from "./_component/DialogContent";
import { useEffect, useRef, useState } from "react";
import axios from "@/api";

export default function copywriterPage(props) {
  const dialogRef = useRef(null);
  const [currentData, setCurrentData] = useState(null);
  const [writerList, setWriterList] = useState([]);
  // const writerList = props.data;

  useEffect(() => {
    axios.get("/write").then((resp) => {
      setWriterList(resp.data.list);
    });
  }, []);

  function onItemsClick(item) {
    setCurrentData(item);
    dialogRef.current.open();
  }

  return (
    <div className="w-[85vw] mx-auto pt-[100px]">
      <div className="w-full">
        <div className={cn(styles.container)}>
          {writerList.map((item) => {
            return (
              <div
                onClick={() => onItemsClick(item)}
                key={item.id}
                className={cn(styles.items)}
              >
                <AspectRatio ratio={3 / 4}>
                  <div className={cn(styles.view)}>
                    <video
                      src={item.media}
                      className={cn("object-cover h-full", styles.write_video)}
                    ></video>
                    <div className={cn(styles.description)}>
                      <p className="h-full w-full overflow-hidden flex items-center">
                        <span>{item.describe}</span>
                      </p>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-[1500px]"></div>
      <DialogContent ref={dialogRef} className="p-0 bg-transparent">
        <div className={cn("w-[80vw] p-0 ")}>
          <div
            className={cn(
              "flex min-h-[60vh] itrems-center relative",
              "rounded-2xl overflow-hidden ",
              "slideDownAnimation"
            )}
          >
            {currentData && (
              <>
                <div className={cn("w-full")}>
                  <video
                    autoPlay
                    className={cn("object-cover")}
                    src={currentData.media}
                  ></video>
                </div>
                <div
                  className="absolute left-0 right-0 bottom-0 p-4 pt-6 "
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.7) 100%)"
                  }}
                >
                  <p className="text-[rgba(255,255,255,0.8)]">
                    {currentData.describe}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </div>
  );
}

// export async function getServerSideProps() {
//   const fetch = require("../../api/fetch");
//   const data = await fetch("/write");

//   return {
//     props: {
//       data
//     }
//   };
// }
