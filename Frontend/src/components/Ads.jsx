import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

function Ads() {
    const controls = useAnimation();

    useEffect(() => {
        const scrollHandler = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            controls.start({
                opacity: scrollY > 100 ? 1 : 0,
                y: scrollY > 100 ? 0 : 50,
                transition: {
                    opacity: { duration: 0.5 },
                    y: { duration: 0.5 }
                }
            });
        };
        window.addEventListener("scroll", scrollHandler);
        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, [controls]);

    return (
        <div className="flex py-5 space-x-5 justify-between items-center">
            {/* title */}
            <motion.div
                animate={controls}
                initial={{ y: "2rem", opacity: 0 }}
                className="flex-col flex pl-20"
            >
                <img src="/assets/images/ads/badmintion.png" />
            </motion.div>
            {/* photo */}
            <motion.div
                animate={controls}
                initial={{ y: "7rem", opacity: 0 }}
                className="flex-col flex pr-20"
            >
                <img src="/assets/images/ads/image.png" />
            </motion.div>
        </div>
    );
}

export default Ads;
