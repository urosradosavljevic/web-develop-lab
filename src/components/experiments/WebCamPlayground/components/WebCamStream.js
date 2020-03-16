import React, { useEffect, useRef, forwardRef, useState } from "react";
import { useCombinedRefs } from "../hooks/useCombinedRef";

export const WebCamStream = forwardRef((props, ref) => {
  const { className, handleError } = props;
  let innerRef = useRef(null);
  const combinedRef = useCombinedRefs(ref, innerRef);

  // get user video
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(stream => {
        combinedRef.current.srcObject = stream;
        combinedRef.current.play();
      })
      .catch(handleError);
  });

  return <video ref={combinedRef} className={className}></video>;
});

