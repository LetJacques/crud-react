import "./Footer.css";
import logoFoot from "../assets/logo-foot.svg";

const Footer = () => {
  return (
    <div className="footer mt-5 px-5 py-5 d-flex justify-content-between align-items-center white-text">
      <div className="news d-flex flex-column">
        <img src={logoFoot} alt="logo" />
        <p className="about fs-5 mt-4 white-text">
          Lorem ipsum dolor sit amet, consectetur <br />
          adipiscing elit. Neque, pellentesque <br />
          dictum posuere id diam rutrum.
        </p>
        <div>
          <button className="socials-button">
            <i className="icon bi bi-linkedin"></i>
          </button>
          <button className="socials-button ms-4">
            <i className="icon bi bi-instagram"></i>
          </button>
          <button className="socials-button ms-4">
            <i className="icon bi bi-youtube"></i>
          </button>
          <button className="socials-button ms-4">
            <i className="icon bi bi-tiktok"></i>
          </button>
        </div>
      </div>
      <div className="links d-flex flex-column text-center white-text">
        <h4 className="mb-5">Links úteis</h4>
        <a className="white-text" href="#">
          Sobre nós
        </a>
        <a className="white-text" href="#">
          Serviços
        </a>
        <a className="white-text" href="#">
          Contatos
        </a>
      </div>
      <div className="newsletter d-flex flex-column pe-5 align-items-center white-text">
        <h4>Newsletter</h4>
        <input placeholder="e-mail" />
        <button className="btn btn-outline-secondary mt-4">Se inscreva!</button>
      </div>
    </div>
  );
};

export default Footer;
