import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import ToolBar from './components/ToolBar';
import ProjectList from './components/ProjectList';

const styles = {
  container: {
    maxWidth: '1280px',
    padding: '0 1.5em',
    margin: '0 auto',
  },
};

class Main extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <ToolBar />
        <ProjectList />
      </div>
    );
  }
}

export default withStyles(styles)(Main);
