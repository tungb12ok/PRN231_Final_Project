import {
  faFacebook,  
  faInstagram 
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLocationDot, faMapLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-zinc-700 h-full">
      <div className="bg-footer bg-cover bg-center flex justify-center items-center">
        <h1 className="text-3xl py-20 text-white font-rubikmonoone drop-shadow-md">
          Follow us on
          <Link to="/" className="underline underline-offset-2 pl-8">
            Facebook
          </Link>
        </h1>
      </div>

      <div className="flex justify-between items-center py-10 space-x-5">
        {/* left side */}
        <div className="pl-20 space-y-5 w-1/2 text-white font-poppins">
          <img
            src="/assets/images/Logo.png"
            alt="2Sport"
            className="max-w-sm max-h-12"
          />
          <p>
            All content on this website is protected by copyright and may not be
            used without permission from 2Sport. For more information about our
            Privacy Policy, please contact our Support Center.
          </p>
          <p>Copyright © 2024 2Sport. All Rights Reserved.</p>
          <div>
            <p className="font-rubikmonoone ">Get Our Updates</p>
            <div className="flex w-2/3 bg-white ">
              <input
                className="flex-grow bg-transparent outline-none placeholder-gray-400 font-poppins pl-5"
                placeholder="Enter your email address ..."
                type="text"
              />
              <button className="bg-orange-500 px-8 py-4">SUBSCRIBE</button>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="w-1/2 pb-5 pr-15">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 gap-x-8">
            <div className="space-y-4 space-x-6 text-white mr-10">
              <Typography
                variant="h7"
                className="text-white mb-4 text-3xl font-rubikmonoone"
              >
                Company
              </Typography>
              <Typography className="text-xl ">About Us</Typography>
              <Typography className="text-xl ">Testimonials</Typography>
              <Typography className="text-xl">FAQS</Typography>
              <Typography className="text-xl">Terms & Condition</Typography>
              <Typography className="text-xl ">Latest Update</Typography>
            </div>

            <div className="space-y-4 space-x-6 text-white ">
              <Typography
                variant="h7"
                className="text-white mb-4 text-3xl font-rubikmonoone"
              >
                Products
              </Typography>
              <Typography className="text-xl ">Men's Section</Typography>
              <Typography className="text-xl ">Women's Section</Typography>
              <Typography className="text-xl">Kid's Section</Typography>
              <Typography className="text-xl ">Shoes</Typography>
              <Typography className="text-xl">Apparel</Typography>
              <Typography className="text-xl ">Equipments</Typography>
            </div>

            <div className="space-y-4 space-x-6 text-white ">
              <Typography
                variant="h7"
                className="text-white mb-4 text-3xl font-rubikmonoone"
              >
                Support
              </Typography>
              <Typography className="text-xl ">Order Tracking</Typography>
              <Typography className="text-xl ">Payment Guide</Typography>
              <Typography className="text-xl">Help Centre</Typography>
              <Typography className="text-xl">Privacy Policy</Typography>
              <Typography className="text-xl">Return Policy</Typography>
              <Typography className="text-xl">Promo Codes</Typography>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 gap-x-8 mt-20">
            <div className="space-y-4 space-x-6 text-white">
              <Typography className="text-xl">
                <FontAwesomeIcon icon={faLocationDot} className="pr-1"/>
                Thành Phố Thủ Đức, Thành phố Hồ Chí Minh
              </Typography>
              <Typography className="text-xl">
                <FontAwesomeIcon icon={faPhone} className="pr-1" />
                +84 338-581-571
              </Typography>
              <Typography className="text-xl">
                <FontAwesomeIcon icon={faEnvelope} className="pr-1" />
                2sportteam@gmail.com
              </Typography>
            </div>

            <div className="space-y-4 space-x-6 text-white">
              <Typography
                variant="h7"
                className="text-white mb-4 text-3xl font-rubikmonoone"
              >
                Contact
              </Typography>
              <Typography className="text-xl">
                <FontAwesomeIcon icon={faFacebook} className="pr-1" />
                Facebook
              </Typography>
              <Typography className="text-xl">
                <FontAwesomeIcon icon={faInstagram} className="pr-1" />
                Instagram
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
