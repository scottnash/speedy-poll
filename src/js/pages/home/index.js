import React from "react";
import ZippyPollCreationForm from "../../components/zippypollcreationform";

if (process.env.BROWSER) {
  require('./home.scss');
}

export default class Home extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount = () => {
    try{
      document.querySelector('body').setAttribute('data-page', 'home');
    }
    catch( error ) {

    }
  }

  componentWillUnmount() {
    this.props.turnOnEntryAnimation();
  }

  render() {
    return (
      <div className="zippypoll__maxwidth-content-holder zippypoll__home">
        <div className="zippypoll__home__entry-block  zippypoll__entry-block">
          <h1>Find Out What People Really Think</h1>
          <h2>Create a poll in  a zippy!</h2>
          <ZippyPollCreationForm updateFooterPolls={ this.props.updateFooterPolls } />
        </div>
        <div className="zippypoll__sample-poll">
          <h4>Sample Poll</h4>
          <img src="/assets/images/sample-poll.png" alt="Sample Poll"/>
        </div>
      </div>
    );
  }

}
