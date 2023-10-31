import React from "react";
import style from "./loader.module.css";

const Loader = () => {
  return (
    <section className={style.dotscontainer}>
      <div className={style.dot}></div>
      <div className={style.dot}></div>
      <div className={style.dot}></div>
      <div className={style.dot}></div>
      <div className={style.dot}></div>
    </section>
  );
};

export default Loader;
