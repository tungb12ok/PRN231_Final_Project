import React from "react";
import Banner from "../components/Banner";
import Brands from "../components/Brands";
import Ads from "../components/Ads";
import WebServices from "../components/WebServices";

function LandingPage() {

    return (
        <>
            <Banner />
            <Brands />
            <Ads />
            <WebServices/>
        </>
    );
}

export default LandingPage;
