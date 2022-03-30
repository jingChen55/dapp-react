import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">
        {subtitle}
      </p>
    </div>
  </div>
);

const Services = () => (
  <div className="flex w-full justify-center items-center gradient-bg-services">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start">
       <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">我们 <br /> 不断的改进服务</h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base"> 通过我们提供的各种超级友好的服务，购买和出售您的加密资产的最佳选择 </p>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        {
            [ {
                title: '保证安全',
                color: "bg-[#2952E3]",
                icon:<BsShieldFillCheck fontSize={21} className="text-white" />,
                subtitle:"安全有保障。我们始终保持隐私并保持我们产品的质量"
              },
              {
                title: '最佳汇率',
                color:"bg-[#8945F8]",
                icon:<BiSearchAlt fontSize={21} className="text-white" />,
                subtitle:"安全有保障。我们始终保持隐私并保持我们产品的质量"
              },
                {
                title: '最快的交易',
                color: "bg-[#F84550]",
                icon:<RiHeart2Fill fontSize={21} className="text-white" />,
                subtitle:"安全有保障。我们始终保持隐私并保持我们产品的质量"
              }
          ].map((item) => (
            <ServiceCard color={item.color} title={item.title} icon={item.icon} subtitle={item.subtitle} />
            ))
         }
      </div>
    </div>
  </div>
);

export default Services;
