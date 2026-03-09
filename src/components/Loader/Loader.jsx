import "./Loader.css";

const Loader = ({ message = "Preparing your trip..." }) => {
  return (
    <div className="loader-shell" role="status" aria-live="polite">
      <div className="loader-card">
        <div className="loader-ring" />
        <p className="loader-title">Yatralo</p>
        <p className="loader-message">{message}</p>
        <div className="loader-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

export default Loader;
