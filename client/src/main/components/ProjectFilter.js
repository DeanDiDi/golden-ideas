import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: '1em',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
});

class ProjectFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = panel => (event, isExpanded) => {
    this.setState({ expanded: isExpanded ? panel : false });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    const handleChange = this.handleChange;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'teamSize'} onChange={handleChange('teamSize')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="team-size-filter"
            id="team-size-filter"
          >
            <Typography className={classes.heading}>Team Size</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
              vitae egestas augue. Duis vel est augue.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'category'} onChange={handleChange('category')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="category-filter"
            id="category-filter"
          >
            <Typography className={classes.heading}>Category</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'technology'} onChange={handleChange('technology')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="technology-filter"
            id="technology-filter"
          >
            <Typography className={classes.heading}>Technology</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
              diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

ProjectFilter.defaultProps = { };

ProjectFilter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectFilter);
