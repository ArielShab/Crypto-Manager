import "../CSS/about.css";

const About = () => {
  return (
    <div id="main">
      <div id="crypto-div">
        <p id="crypto-paragraph">
          A cryptocurrency, crypto-currency, crypto, or coin is a digital
          currency designed to work as a medium of exchange through a computer
          network that is not reliant on any central authority, such as a
          government or bank, to uphold or maintain it. Individual coin
          ownership records are stored in a digital ledger, which is a
          computerized database using strong cryptography to secure transaction
          records, to control the creation of additional coins, and to verify
          the transfer of coin ownership. Despite their name, cryptocurrencies
          are not considered to be currencies in the traditional sense and while
          varying treatments have been applied to them, including classification
          as commodities, securities, as well as currencies, cryptocurrencies
          are generally viewed as a distinct asset class in practice. Some
          crypto schemes use validators to maintain the cryptocurrency. In a
          proof-of-stake model, owners put up their tokens as collateral. In
          return, they get authority over the token in proportion to the amount
          they stake. Generally, these token stakers get additional ownership in
          the token over time via network fees, newly minted tokens or other
          such reward mechanisms. Cryptocurrency does not exist in physical form
          (like paper money) and is typically not issued by a central authority.
          Cryptocurrencies typically use decentralized control as opposed to a
          central bank digital currency (CBDC). When a cryptocurrency is minted
          or created prior to issuance or issued by a single issuer, it is
          generally considered centralized. When implemented with decentralized
          control, each cryptocurrency works through distributed ledger
          technology, typically a blockchain, that serves as a public financial
          transaction database.[11] Traditional asset classes like currencies,
          commodities, and stocks, as well as macroeconomic factors, have modest
          exposures to cryptocurrency returns.
        </p>
        <img
          id="crypto-img"
          src="https://tenerifeweekly.com/wp-content/uploads/2022/05/Crypto-market.jpg"
          alt="crypto picture"
        />
      </div>

      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div id="cover-img" className="carousel-inner">
          <div className="carousel-item active">
            <img
              id="carousel-image"
              src="https://www.paymentsjournal.com/wp-content/uploads/2022/04/1661-scaled-e1649434277532.jpg"
              className="d-block w-100"
              alt="crypto image"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://www.interactivebrokers.hu/images/web/cryptocurrency-hero.jpg"
              className="d-block w-100"
              alt="crypto image"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://academy.aax.com/wp-content/uploads/2020/03/CryptoEcosystem_202003014_final-768x427.png"
              className="d-block w-100"
              alt="crypto image"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="bitcoin-area">
        <div id="bitcoin-div">
          <img
            id="bitcoin-img"
            src="https://d1e00ek4ebabms.cloudfront.net/production/810ca0c6-2553-4036-85f9-0a46cca52122.jpg"
            alt="bitcoin picture"
          />

          <p id="bitcoin-paragraph">
            Bitcoin is a decentralized digital currency that can be transferred
            on the peer-to-peer bitcoin network.Bitcoin transactions are
            verified by network nodes through cryptography and recorded in a
            public distributed ledger called a blockchain. The cryptocurrency
            was invented in 2008 by an unknown person or group of people using
            the name Satoshi Nakamoto. The currency began use in 2009 when its
            implementation was released as open-source software. Bitcoins are
            created as a reward for a process known as mining. They can be
            exchanged for other currencies, products, and services. Bitcoin has
            been criticized for its use in illegal transactions, the large
            amount of electricity (and thus carbon footprint) used by mining,
            price volatility, and thefts from exchanges. Some investors and
            economists have characterized it as a speculative bubble at various
            times. Others have used it as an investment, although several
            regulatory agencies have issued investor alerts about bitcoin.
            Bitcoin, has been described as an economic bubble by at least eight
            Nobel Memorial Prize in Economic Sciences laureates, including
            Robert Shiller, Joseph Stiglitz, and Richard Thaler. Journalists,
            economists, investors, and the central bank of Estonia have voiced
            concerns that bitcoin is a Ponzi scheme. The word bitcoin was
            defined in a white paper published on 31 October 2008. It is a
            compound of the words bit and coin. No uniform convention for
            bitcoin capitalization exists; some sources use Bitcoin,
            capitalized, to refer to the technology and network and bitcoin,
            lowercase, for the unit of account. The Wall Street Journal. The
            Chronicle of Higher Education, and the Oxford English Dictionary
            advocate the use of lowercase bitcoin in all cases.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
