import React from 'react';

const Welcome = () => (
  <div>
  <a href="#/signin">signin</a>|<a href="#/signup">signup</a>
  <div id="index-banner" className="parallax-container">
    <div className="section no-pad-bot">
      <div className="container">

        <h1 className="card-panel teal header center white-text">Geostash</h1>
        <div className="row center">
          <h5 className="card-panel white header col s3 center light">
          Don't just buy. Hunt.</h5>
        </div>
        <div className="row center">
          <a href="/#/dash"
            className="btn-large waves-effect waves-light teal lighten-1">
            Get Started
          </a>
        </div>

      </div>
    </div>
    <div className="parallax">
    <img src="./media/city.jpg" alt="Unsplashed background img 1" /></div>
  </div>

  <div className="container">
    <div className="section">

      <div className="row">
        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center brown-text">
              <i className="material-icons">flash_on</i>
            </h2>
            <h5 className="center">Lightning is Cool</h5>

            <p className="light">So is treasure hunting. Buy random treasures
             and they'll be hidden just for you. Category based purchasing
             ensures you get a pleasant surprise every time.</p>
          </div>
        </div>

        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center brown-text">
            <i className="material-icons">group</i></h2>
            <h5 className="center">Buy and Sell Anonymously</h5>

            <p className="light">Upload product types you would like to sell.
             We will notify you when someone chooses one of your categories.
             Location based searches ensure you never have to travel far to
             start an adventure.</p>
          </div>
        </div>

        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center brown-text">
              <i className="material-icons">
                wb_sunny
              </i>
            </h2>
            <h5 className="center">The Sun is Above You.</h5>

            <p className="light">Get out and enjoy the world while continuing
            to participate in a capitalist society.</p>
          </div>
        </div>
      </div>

    </div>
  </div>


  <div className="parallax-container valign-wrapper">
    <div className="section no-pad-bot">
      <div className="container">
        <div className="row center">
          <h5 className="card panel white header col s12 light">Shopping +
          Exploring = Shoxploring. Start shoxploring now!</h5>
        </div>
      </div>
    </div>
    <div className="parallax">
      <img src="./media/woods.jpeg" alt="Unsplashed background img 2" />
    </div>
  </div>

  <div className="container">
    <div className="section">
      <div className="row">
        <div className="col s12 center">
          <h3><i className="mdi-content-send brown-text"></i></h3>
          <h4>Contact Us</h4>
          <p className="left-align light">Just kidding.</p>
        </div>
      </div>
    </div>
  </div>

  <footer className="page-footer teal">
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          <h5 className="white-text">Company Bio</h5>
          <p className="grey-text text-lighten-4">If you're allergic to
          biographies then this is a bio-hazard.</p>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">
      Made by
      <a className="brown-text text-lighten-3"
        href="https://github.com/clueless-cello">Clueless Cello</a>
      </div>
    </div>
  </footer>
  </div>
);

export default Welcome;
