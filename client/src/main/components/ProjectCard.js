import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

const styles = {
  card: {
    padding: '0 1em',
    margin: '1em 0',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  moreButton: {
    marginLeft: 'auto',
    paddingRight: '8px',
  }
};

class ProjectCard extends Component {
  state = {
    name: this.props.name,
    date: new Date(this.props.date),
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title={this.state.name}
          subheader={this.state.date.toLocaleDateString()}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              SZ
            </Avatar>
          }
          action={
            <Rating
              name="simple-controlled"
              value={2.5}
              precision={0.5}
              // onChange={(event, newValue) => {
              //   setValue(newValue);
              // }}
            />
          }
        />

        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="h2">
            {this.state.projectName}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Button className={classes.moreButton} size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }
}

ProjectCard.defaultProps = {
  name: 'default_project_name',
  date: '01/01/1970',
  views: 0,
};

ProjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
  key: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  views: PropTypes.number,
};

export default withStyles(styles)(ProjectCard);
