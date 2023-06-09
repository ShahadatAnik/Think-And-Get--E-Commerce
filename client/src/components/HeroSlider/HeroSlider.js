import Swiper, { SwiperSlide } from "../swiper";
import Preloader from "../Preloader";
import ErrorMessage from "../ErrorMessage";
import useFetch from "../../hooks/use-fetch";

const params = {
    loop: true,
    speed: 1000,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: true,
};

const HeroSlider = () => {
    const { data, isLoading, errorMessage } = useFetch("hero-slider.json");

    if (isLoading) return <Preloader />;
    if (errorMessage) return <ErrorMessage errorMessage={errorMessage} />;
    return (
        <div className="hero-slider bg-color--grey space-y--10">
            <div className="container">
                <div className="row row-10">
                    <div className="col-12">
                        <div className="hero-slider-wrapper">
                            {!!data.length && (
                                <Swiper options={params}>
                                    {data.map((single) => (
                                        <SwiperSlide key={single.id}>
                                            <div
                                                className="hero-slider-item d-flex bg-img"
                                                style={{
                                                    backgroundImage: `url(${
                                                        process.env.PUBLIC_URL +
                                                        single.image
                                                    })`,
                                                }}
                                            >
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            {/* hero slider content */}
                                                            <div className="hero-slider-content">
                                                                <h2
                                                                    className="hero-slider-content__title space-mb--10"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: single.title,
                                                                    }}
                                                                ></h2>
                                                                <p className="hero-slider-content__text">
                                                                    {
                                                                        single.subtitle
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSlider;
