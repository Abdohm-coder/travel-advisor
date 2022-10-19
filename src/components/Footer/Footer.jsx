import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
        <div className="footer__container">
            <h4>copyright © All rights researved {new Date().getFullYear()}</h4>
            <h4>Developed by <strong>ABDO HADJ MED</strong></h4>
        </div>
    </div>
  );
}

export default Footer;
