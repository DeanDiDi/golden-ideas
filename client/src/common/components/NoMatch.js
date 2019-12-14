import React from 'react';
import { Link } from 'react-router-dom';
// import PageNotFound from '../../../public/logo512.png';

class NoMatch extends React.Component{
  render(){
    const { redirect="/project" } = this.props;

    return (
      <div>
        {/* <img src={PageNotFound} alt={`404 not found`} /> */}
        <p style={{textAlign:"center"}}>
          <Link to={redirect}>Go to Home</Link>
        </p>
      </div>
    );
  }
}

export default NoMatch;
