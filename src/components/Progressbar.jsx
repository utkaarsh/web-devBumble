import React, { useEffect, useState } from "react";

const Progressbar = ({ progress }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
  }, [progress]);
  return (
    <div className="progressbar w-7/12 mx-auto pt-3 p-2">
      <div className=" rounded-full overflow-hidden outer my-3">
        <div
          className="bg-gradient-to-r from-amber-400 to-orange-400 h-2 p-2 text-black text-right transition ease-in duration-700"
          style={{
            // width: `${progress}%`, unoptimzed way
            transform: `translateX(${animatedProgress - 100}%)`,
            color: animatedProgress < 5 ? "black" : "white",
          }}
          role="progressbar"
          aria-valuenow={animatedProgress}
          aria-valuemax={100}
          aria-valuemin={0}
        >
          {" "}
        </div>
      </div>
    </div>
  );
};

export default Progressbar;
