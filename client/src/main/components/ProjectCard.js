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
    description: this.props.description,
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
          <Typography variant="body2" component="p">
            {this.state.description}
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
  views: 0,
  date: '01/01/1970',
  name: 'default_project_name',
  description: 'Tell people something about your project',
};

ProjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
  key: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  views: PropTypes.number,
  description: PropTypes.string,
};

export default withStyles(styles)(ProjectCard);
