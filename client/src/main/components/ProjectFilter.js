import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Slider from '@material-ui/core/Slider';
import { teamSizeOptions, categoryOptions, technologyOptions } from '../static/options';
import SearchBox from './SearchBox';

const styles = theme => ({
  root: {
    width: '100%',
    margin: '1em 0em',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  expansionPanelTight: {
    padding: 0,
  }
});

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

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
    const { classes, updateFilter } = this.props;
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
            <Slider
              valueLabelDisplay="auto"
              marks={teamSizeOptions.options}
              min={teamSizeOptions.range.min}
              max={teamSizeOptions.range.max}
              step={teamSizeOptions.range.step}
              defaultValue={[teamSizeOptions.default.min, teamSizeOptions.default.max]}
            />
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
          <ExpansionPanelDetails className={classes.expansionPanelTight}>
            <SearchBox
              options={categoryOptions}
              filterType={'categoryFilter'}
              updateFilter={updateFilter}
            />
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
          <ExpansionPanelDetails className={classes.expansionPanelTight}>
            <SearchBox
              options={technologyOptions}
              filterType={'technologyFilter'}
              updateFilter={updateFilter}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

ProjectFilter.defaultProps = { };

ProjectFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
};

export default withStyles(styles)(ProjectFilter);
