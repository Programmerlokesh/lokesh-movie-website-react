import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import tmbdApi, { category, movieType } from "../../api/tmbdApi";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import apiConfig from "../../api/apiConfig";
import Button, { OutlineButton } from "../button/Button";
import Modal, { ModalContent } from "../modal/Modal";

import tmdbApi from "../../api/tmbdApi";
import "./hero-slide.scss";

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };

      try {
        const response = await tmbdApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovieItems(response.data.results.slice(1, 6));
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        // autoplay={{ delay: 3000 }}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {movieItems.map((item, i) => (
        <TrialModal key={i} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = (props) => {
  let history = useNavigate();

  const itemView = props.item;
  const background = apiConfig.originalImage(
    itemView.backdrop_path ? itemView.backdrop_path : itemView.poster_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${itemView.id}`);

    const videos = await tmdbApi.getVideos(category.movie, itemView.id);

    if (videos.data.results.length > 0) {
      const videSrc =
        "https://www.youtube.com/embed/" + videos.data.results[0].key;
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videSrc);
    } else {
      modal.querySelector(".modal__content").innerHTML = "No trailer";
    }

    modal.classList.toggle("active");
  };

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{itemView.title}</h2>
          <div className="overview">{itemView.overview}</div>
          <div className="btns">
            <Button onClick={() => history("/movie/" + itemView.id)}>
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(itemView.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

const TrialModal = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);
  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};
export default HeroSlide;
