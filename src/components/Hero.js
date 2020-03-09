import React,{useEffect,useRef} from "react";
import lab1 from "../img/lab1.png";
import lab2 from "../img/lab2.png";
import monitor from "../img/monitor.png";
import desktop from "../img/desktop.png";

export const Hero = () => {
  let monitorTranslate, lab1Translate, lab2Translate, pcTranslate;

  const monitorRef = useRef()
  const lab1Ref = useRef()
  const lab2Ref = useRef()
  const pcRef = useRef()

  useEffect(() => {
    document.addEventListener("mousemove", mouseMove);
    return () => {
      document.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const mouseMove = e => {
    monitorRef.current.style.transform = `translate(-${(e.clientX / e.screenX) * 30}px,${(e.clientY / e.screenY) * 45}px)`
    lab1Ref.current.style.transform = `translate(-${(e.clientX / e.screenX) * 20}px,-${(e.clientY / e.screenY) * 30}px)`
    lab2Ref.current.style.transform = `translate(${(e.clientX / e.screenX) * 30}px,${(e.clientY / e.screenY) * 20}px)`
    pcRef.current.style.transform = `translate(-${(e.clientX / e.screenX) * 30}px,-${(e.clientY / e.screenY) * 40}px)`
  };

  return (
    <section className="hero">
      <img ref={lab1Ref}
        style={{ transform: `translate(-${monitorTranslate}px,-${monitorTranslate}px)` }}
        className="lab1"
        src={lab1}
        alt="Laboratory, Elements Illustration"
      />
      <img ref={lab2Ref}
        style={{ transform: `translate(${lab2Translate})` }}
        className="lab2"
        src={lab2}
        alt="Laboratory, Liquid Pouring Illustration"
      />
      <img ref={monitorRef}
        style={{ transform: `translate(${lab1Translate})` }}
        className="monitor"
        src={monitor}
        alt="Monitor Illustration"
      />
      <img ref={pcRef}
        style={{ transform: `translate(${pcTranslate})` }}
        className="pc"
        src={desktop}
        alt="PC Illustration with ReactJS logo on it"
      />
    </section>
  );
};
