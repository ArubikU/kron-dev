import React from 'react';
import globalClassName from '../../lib/globalClassName';
import { VideoButtonIcon } from '../icons';

const VideoButton = () => {
  return (
    <div
    className={
        globalClassName('videoButtonContainer') +
        " videoButtonContainer"
      }
    >
      <div 
      className={globalClassName('videoButton')+" videoButton"}>
        <VideoButtonIcon
          className={globalClassName('playIcon')+" playIcon"}
          alt=""
        />
      </div>
    </div>
  );
};

export default VideoButton;