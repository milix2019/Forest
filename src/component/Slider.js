import React, { useEffect, useState } from 'react';
import { Slide, Fade } from 'react-slideshow-image';

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    // console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}
const Slider = (props) => {
  const data = props.getpopular.getpopular.results == undefined ? [] : props.getpopular.getpopular.results;
  useEffect(() => {
  }, []);

  const onSlideClick = (data) => {
    props.history.push({
      pathname: '/movie',
      state: {
          data: JSON.stringify(data),
      }
  });
  }

  return (
    <div className="slide-container">
      <Slide {...properties}>
        {data.map((d, i) => {
          return (
            <div onClick={()=>{onSlideClick(d)}} className="each-slide" key={`${i}Key`}>
              <div className="slider-image" style={{'backgroundImage': `url(${`http://image.tmdb.org/t/p/w500/${d.backdrop_path}`})` }}>
                <span>{d.title}</span>
              </div>
            </div>)
        })}
      </Slide>
    </div>
  );
};

export default Slider;
