import React from "react";
import "./style.scss";
import { Header } from "../Header";
import { Panel } from "./Panel";
import {
  FaUserAstronaut,
  FaUserEdit,
  FaUserTie,
  FaUserNinja,
  FaUserSecret
} from "react-icons/fa";

export const FlexGalery = () => {
  const team = [
    {
      name: "Mike Peterson",
      position: "Head of Design",
      quote: "Dolor sit amet consectetur adipisicing elit.",
      icon: <FaUserEdit />,
      img: "https://source.unsplash.com/WYwT7pXuXvo/1500x1500"
    },
    {
      name: "John Travis",
      position: "General Manager",
      quote: "Donec lacinia sapien eget urna hendrerit consequat.",
      icon: <FaUserTie />,
      img: "https://source.unsplash.com/wD1LRb9OeEo/1500x1500"
    },
    {
      name: "Peter Ash",
      position: "SEO",
      quote: "Donec lacinia sapien eget urna hendrerit consequat.",
      icon: <FaUserSecret />,
      img: "https://source.unsplash.com/s8HyIEe7lF0/1500x1500"
    },
    {
      name: "Maria Lorens",
      position: "Developer",
      quote: "Dolor sit amet consectetur adipisicing elit.",
      icon: <FaUserNinja />,
      img: "https://source.unsplash.com/YK0HPwWDJ1I/1500x1500"
    },
    {
      name: "Ann Marks",
      position: "Copywriter",
      quote: "Praesentium harum libero sapiente tenetur.",
      icon: <FaUserAstronaut />,
      img: "https://source.unsplash.com/Mmi_sUHNazo/1500x1500"
    }
  ];

  return (
    <>
      <Header />
      <div className="body-flexgalery">
        <div className="panels">
          {team.map(member => (
            <Panel
              name={member.name}
              position={member.position}
              quote={member.quote}
              icon={member.icon}
              img={member.img}
            />
          ))}
        </div>
      </div>
    </>
  );
};
