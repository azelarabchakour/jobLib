import React from 'react';
import heroImg from '../../Assets/hero-img.png';


const HeroSection = () => {
    return (
        <div
        id="home"
        className="relative overflow-hidden bg-primary pt-[100px] md:pt-[130px] sm:pt-[100px] lg:pt-[100px] mt-0 md:mt-[30px] lg:mt-0 h-screen"
        style={{ backgroundColor: '#6a7fc1' }}
    >            <div id="home" className="relative overflow-hidden bg-primary pt-[100px] md:pt-[130px] sm:pt-[100px] lg:pt-[100px] mt-0 md:mt-[30px] lg:mt-0">
                <div className="container mx-auto px-4">
                    <div className="-mx-4 flex flex-wrap items-center">
                        <div className="w-full lg:w-1/2 px-4 order-2 lg:order-1">
                            <div className="hero-content wow fadeInUp mx-auto max-w-[780px] text-center lg:text-left md:mt-0 mt-16 md:mt-[100px]" data-wow-delay=".2s">
                                <h1 className="mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-snug text-white">
                                    Let our AI play cupid for your career
                                </h1>
                                <p className="mx-auto mb-9 max-w-[600px] text-lg sm:text-xl lg:text-2xl font-medium text-white">
                                    Find your perfect match in the job market jungle!
                                </p>
                                <ul className="mb-10 flex flex-wrap items-center justify-center lg:justify-start gap-5">
                                    <li>
                                        <a href="#" className="inline-flex items-center justify-center rounded-md bg-white px-7 py-[14px] text-center text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-gray-2 hover:text-body-color">
                                            Join us Now
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 px-4 order-1 lg:order-2">
                            <div className="wow fadeInUp relative z-10 mx-auto max-w-[845px]" data-wow-delay=".25s">
                                <div className="mt-16">
                                <img src={heroImg} alt="hero" className="mx-auto max-w-full rounded-t-xl rounded-tr-xl lg:float-right" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
