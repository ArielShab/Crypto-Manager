const Footer = () => {
  return (
    <footer className="border-top p-3 text-center bg-black text-white">
      <>
        <span>
          <span>
            <i className="bi bi-currency-bitcoin"></i> Crypto Manager
          </span>
        </span>
        <span className="ms-1">{new Date().getFullYear()}</span>
      </>
    </footer>
  );
};

export default Footer;
