import * as React from "react";
import globalClassName from '../../lib/globalClassName';
import VideoButton from '../playButton/KronVideoButton';

interface KronImagesProps {
  images: string[];
}

const KronImages = (images: string[]) => {
  const count = Math.min(images.length, 4);
  return (
    <div className={globalClassName('imageContainer')+ " imageContainer"}>
      <div
        className={globalClassName('imageContent')+ " imageContent"}
        style={{
          gridTemplateRows: count > 2 ? '1fr 1fr' : '1fr',
          gridTemplateColumns: count > 1 ? '1fr 1fr' : '1fr',
        }}
      >
        {images.slice(0, 4).map((word, index) => {
          let src = word;
          if(src.includes("youtube.com")||
        src.includes("youtu.be")){
          return(
                <iframe
                className="imageBackground"
                  key={src}
                  style={{
                    backgroundImage: `url(${src})`,
                    gridRow: count === 3 && index === 0 ? '1/3' : undefined,
                  }}
                  src={`https://www.youtube.com/embed/${src.split("v=")[1].split("&")[0]}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen />
          )
        }
        
        if(src.includes("blob:")){
          return(
            <img alt="Preview" 
                className="imageBackground"
                  key={src}
                  style={{
                    backgroundImage: `url(${src})`,
                    gridRow: count === 3 && index === 0 ? '1/3' : undefined,
                  }}
                  src={src}/>
          )
        }
          return(
          <button
            className={globalClassName('image') + " imageBackground"}
            key={src}
            style={{
              backgroundImage: `url(${src})`,
              gridRow: count === 3 && index === 0 ? '1/3' : undefined,
            }}
          >
            {src.includes(".mp4") && <VideoButton />}
          </button>
        )})}
      </div>
    </div>
  );
};

export default KronImages;
