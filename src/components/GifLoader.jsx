import React from "react";
import Gif from "@/assets/images/padron-beneficiarios-logo.gif";
import loaderStore from "@/store/loaderStore";

const GifLoader = ({showStatus = false}) => {
    const {loader} = loaderStore();

    const LoaderComponent = () => {
        return (
            <div style={styles.container || undefined}>
                <img src={Gif || undefined} alt="Loading..." style={styles.img}/>
            </div>
        );
    }

    return loader || showStatus ? <LoaderComponent/> : null;
};

const styles = {
    container: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
    img: {width: 300, height: 300}
}

export default GifLoader;
