import { HTTP_FRONTEND_HOME } from "@/tools/constantes";
import { Carousel, IconButton } from "@material-tailwind/react";
import { useState } from "react";
import { useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import Slider from "react-slick";
import { ShowEtoiles } from "./LocaVoitureCard";

export default function AvisClients({ avis }) {
  const smartphone = useMediaQuery({ maxWidth: 500 }); // Adjust the breakpoint as needed
  const tablette = useMediaQuery({ maxWidth: 1024 }); // Adjust the breakpoint as needed
  let next='',prev='',arrows;
  arrows=(smartphone || tablette)?false:true;
  next=(smartphone || tablette)?false:<SampleNextArrow />;
  prev=(smartphone || tablette)?false:<SamplePrevArrow   />;

  const settings = {
    dots: true,
    infinite: true,
    autoplay:true,
    speed: 500,
    pauseOnHover:true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:arrows,
    nextArrow: next,
    prevArrow: prev,
  };
  return (
    <>
      <div className="border-bborder-t container mx-auto">
        <div className="max-w-screen-lg mx-auto py-4">
          <div className="  relative ">
            <Slider {...settings}>
            
              {avis?.length > 0 && avis?.map(({ auteur, profession,nombre_etoile, message, photo, created_at }, index) => (
                <div key={index} className=" py-4  px-4 md:px-8 lg:px-20">

                  <div className="bg-white  dark:text-gray-100 dark:bg-slate-800 dark:border-slate-700  min-h-full shadow-sm border border-slate-100  rounded-2xl px-10 py-8 shadow-lg_ hover:shadow-md transition duration-500">
                    <div className="">
                      <h1 className="text-lg text-gray-700 dark:text-gray-300 font-semibold hover:underline cursor-pointer">{profession}</h1>
                      <ShowEtoiles nb={nombre_etoile}/>                   
                      </div>
                      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{message}</p>
                      <div className="flex justify-between items-center">
                        <div className="mt-4 flex items-center space-x-4 py-4">
                          <div className="">
                            <img className="w-12 h-12 object-cover rounded-full" src={HTTP_FRONTEND_HOME + '' + photo} alt="" />
                          </div>
                          <div className="text-sm font-semibold">{auteur} </div>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}

</Slider>
          </div>
        </div>
      </div>
    </>
  )
}
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style,  }}
      onClick={onClick}
    />
  );
}

