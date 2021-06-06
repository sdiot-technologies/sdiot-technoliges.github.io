import logo from "./sdiot-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faMediumM,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function App() {
  return (
    <div className="p-4 m-auto max-w-4xl min-h-screen font-base flex flex-col items-center justify-around">
      <div className="w-full">
        <img
          className="py-16 my-5 w-40"
          src={logo}
          alt="Sdiot Technologies Private Limited Logo"
        />
        <div className="py-10">
          <h1 className="uppercase text-4xl font-header font-black tracking-wider my-5">
            About
          </h1>
          <p className="max-w-xs font-base tracking-wide">
            Specializing in refined digital web experiences with a focus on
            animated, responsive, and interactive content.
          </p>
        </div>
      </div>
      <div className="w-full py-10 mb-10">
        <div className="text-right">
          <h1 className="uppercase text-4xl font-header font-black my-5">
            Reach us
          </h1>
          <address className="not-italic tracking-wide">
            <div className="mb-4">
              <a href="mailto:hello@sdiot.io"> yourfriends@sdiot.io</a>
            </div>
            <div className="mb-4">
              <a href="tel:+91-844-798-1252"> +91 844 798 1252</a>
            </div>
            <div className="address-row">
              <p>
                660/1, Sector-30 <br />
                Gandhinagar, Gujarat <br />
                India - 382030
              </p>
            </div>
          </address>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center text-3xl">
          <a
            className="m-2 p-4"
            href="https://www.facebook.com/SDIOT-Technologies-103777017746277"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Link to Sdiot Technologies Facebook Page"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a
            className="m-2 p-4"
            href="https://www.linkedin.com/company/sdiot-technologies/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Link to Sdiot Technologies LinkedIn Page"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a
            className="m-2 p-4"
            href="https://medium.com/sdiot-technologies"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Link to Sdiot Technologies Medium Page"
          >
            <FontAwesomeIcon icon={faMediumM} />
          </a>
          <a
            className="m-2 p-4"
            href="https://www.instagram.com/sdiot.technologies"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Link to Sdiot Technologies Instagram Page"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        <div className="text-center">
          <small>© Copyright 2019, Sdiot Technologies Private Limited.</small>
        </div>
      </div>
    </div>
  );
}
export default App;
