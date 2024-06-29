import { AspectRatio } from "@/shadcn-ui/ui/aspect-ratio";
import { cn } from "@/shadcn-ui/libs/utils";
import styles from "./_index.module.css";
import DialogContent from "./_component/DialogContent";
import { useRef, useState } from "react";

export default function copywriterPage(props) {
  const dialogRef = useRef(null);
  const [currentData, setCurrentData] = useState(null);
  const writerList = props.data;

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
                      src={item.video}
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
      <DialogContent ref={dialogRef}>
        <div className={cn("w-[80vw]")}>
          <div className={cn("flex itrems-center")}>
            {currentData && (
              <>
                <div className={cn("w-[70%]")}>
                  <video
                    controls
                    autoPlay
                    className={cn("object-cover")}
                    src={currentData.video}
                  ></video>
                </div>
                <div className="flex-1 flex items-center ml-4">
                  <p>{currentData.describe}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </div>
  );
}

export async function getServerSideProps() {
  const fetch = require("../../api/fetch");
  const data = await fetch("/write");

  return {
    props: {
      data
    }
  };
}
