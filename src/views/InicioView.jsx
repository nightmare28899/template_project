import { Image } from "antd";
import logo from "@/assets/images/llave-michoacan-fondo.png";

const InicioView = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="inicio-logo-hover" style={{ opacity: 1, transform: "none" }}>
        <Image
          preview={false}
          src={logo}
          alt="Proyecto Base"
          style={{ maxWidth: 450, width: "100%" }}
        />
      </div>
    </div>
  );
};

export default InicioView;
