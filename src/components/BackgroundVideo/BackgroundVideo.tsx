import "./styles.css";

interface BackgroundVideoProps  {
    src: string,
  };

const BackgroundVideo = ({ src }: BackgroundVideoProps) => {
  return (
    <>
    <video autoPlay loop muted playsInline className="background-video">
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="color-overlay"></div>
    </>
  );
};

export default BackgroundVideo;
