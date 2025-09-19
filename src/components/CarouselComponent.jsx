import React from "react";
import {Carousel, Image} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import EmptyContent from "@/components/common/EmptyContent";

export const carouselArrowStyles = `
  .custom-carousel .slick-prev,
  .custom-carousel .slick-next {
    background: rgba(255, 255, 255, 0.8) !important;
    border-radius: 50% !important;
    width: 40px !important;
    height: 40px !important;
    z-index: 2 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: all 0.3s ease !important;
  }

  .custom-carousel .slick-prev {
    left: 15px !important;  /* pegado al borde */
  }

  .custom-carousel .slick-next {
    right: 15px !important;
  }

  .custom-carousel .slick-prev:before,
  .custom-carousel .slick-next:before {
    font-size: 20px !important;
    color: #333 !important;
  }

  .custom-carousel .slick-dots {
    bottom: 10px !important; /* más pegados al borde inferior */
  }
`;

export const CustomPrevArrow = ({onClick}) => (
    <div
        onClick={onClick}
        style={{
            position: "absolute",
            top: "50%",
            left: "15px",
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "rgba(255,255,255,0.8)",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "1px solid #000",
        }}
    >
        <LeftOutlined style={{fontSize: "20px", color: "#333"}}/>
    </div>
);

export const CustomNextArrow = ({onClick}) => (
    <div
        onClick={onClick}
        style={{
            position: "absolute",
            top: "50%",
            right: "15px",
            transform: "translateY(-50%)",
            zIndex: 2,
            background: "rgba(255,255,255,0.8)",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "1px solid #000",
        }}
    >
        <RightOutlined style={{fontSize: "20px", color: "#333"}}/>
    </div>
);

const CarouselComponent = ({imageContent}) => {

    return (
        <>
            <EmptyContent message={"Sin contenido"} description={"No se encontraron publicaciones"}
                          content={imageContent}>
                <style>{carouselArrowStyles}</style>
                <Carousel
                    arrows
                    autoplay={{dotDuration: false}}
                    autoplaySpeed={5000}
                    dots={true}
                    dotPosition="bottom"
                    className="custom-carousel"
                    prevArrow={<CustomPrevArrow/>}
                    nextArrow={<CustomNextArrow/>}
                >
                    {imageContent.map((item, index) => {
                        return (
                            <div key={index}>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <Image
                                        preview={false}
                                        src={item?.["logoUrl"]}
                                        alt={`Publicación ${item.id || index + 1}`}
                                        width={"100%"}
                                        height={"60vh"}
                                        style={{objectFit: "cover"}}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </Carousel>
            </EmptyContent>
        </>
    );
};

export default CarouselComponent;
