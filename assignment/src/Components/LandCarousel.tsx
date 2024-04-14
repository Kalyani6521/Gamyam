import React, { useEffect, useState } from "react";
import { useLandApi } from "../hooks/LandApi.ts";
import { Card, CardBody, Carousel } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const LandCarousel = (props: any): JSX.Element => {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const apiUrl = "https://prod-be.1acre.in/lands/?ordering=-updated_at";

    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("Data:", data.results);
        setDetails(data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log("response is", details);
  }, [details]);

  const mid = Math.ceil(details.length / 2);
  const leftColumnDetails = details.slice(0, mid);
  const rightColumnDetails = details.slice(mid);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 p-5 justify-center items-center">
      <div className="w-1/2 grid gap-4 ml-0 lg:ml-10">
        {leftColumnDetails.map((item: any, index) => (
          <div key={index}>
            <Card {...props}>
              <CardBody {...props} className="p-0">
                <Carousel
                  {...props}
                  className="rounded-xl overflow-hidden"
                  style={{ width: "350px", height: "250px" }}
                >
                  {item.land_media?.map((image: any, imageIndex: number) => (
                    <div
                      key={imageIndex}
                      style={{ width: "100%", height: "100%" }}
                      className="bg-white"
                    >
                      <img
                        key={imageIndex}
                        src={image.image} // Assuming 'image' is the property containing the image URL
                        alt={`Image ${imageIndex}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </Carousel>
                <div className="p-4">
                  <div className="text-black text-[18px] font-bold bg-white flex-col">
                    <div className="inline-flex gap-2">
                    {item?.village_name}, {item?.mandal_name}
                    <img
                      src="https://1acre.in/static/images/icons/verified-active.svg"
                      
                    />
                    </div>
                    <div>{item?.district_name}(dt)</div>
                  </div>
                  <div className="text-black text-[14px] font-bold inline-flex">
                    {item?.total_land_size_in_acres.acres} Acres{" "}
                    {item?.total_land_size_in_acres.guntas} Guntas
                    <div className="text-black text-[14px]">
                    <span className="font-bold">.</span> ₹
                    {item.price_per_acre_crore.crore}.
                    {item.price_per_acre_crore.lakh} crores per acre
                  </div>
                  </div>
                  
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
      <div className="w-1/2 grid gap-4">
        {rightColumnDetails.map((item: any, index) => (
          <div key={index}>
            <Card {...props}>
              <CardBody {...props} className="p-0">
                <Carousel
                  {...props}
                  className="rounded-xl overflow-hidden"
                  style={{ width: "350px", height: "250px" }}
                >
                  {item.land_media?.map((image: any, imageIndex: number) => (
                    <div
                      key={imageIndex}
                      style={{ width: "100%", height: "100%" }}
                      className="bg-white"
                    >
                      <img
                        key={imageIndex}
                        src={image.image} // Assuming 'image' is the property containing the image URL
                        alt={`Image ${imageIndex}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </Carousel>
                <div className="p-4">
                  <div className="text-black text-[18px] font-bold bg-white flex-col">
                    <div className="inline-flex gap-2">
                    {item?.village_name}, {item?.mandal_name}
                    <img
                      src="https://1acre.in/static/images/icons/verified-active.svg"
                      
                    />
                    </div>
                    <div>{item?.district_name}(dt)</div>
                  </div>
                  <div className="text-black text-[14px] font-bold inline-flex">
                    {item?.total_land_size_in_acres.acres} Acres{" "}
                    {item?.total_land_size_in_acres.guntas} Guntas
                    <div className="text-black text-[14px]">
                    <span className="font-bold">.</span> ₹
                    {item.price_per_acre_crore.crore}.
                    {item.price_per_acre_crore.lakh} crores per acre
                  </div>
                  </div>
                  
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandCarousel;
