import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { formatName } from "../../utils";

const styles = theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    height: 0
  },
  cardContent: {
    flexGrow: 1
  }
});

class GenreCard extends React.Component {
  // a state to animate the cards
  state = {
    isCardRaised: false
  };

  toggleRaised = () => {
    this.setState({ isCardRaised: !this.state.isCardRaised });
  };

  createLinkForGenre(genreId) {
    return props => {
      return <RouterLink to={`/genrealbums/${genreId}`} {...props} />;
    };
  }

  render() {
    const { classes, genre } = this.props;

    return (
      genre && (
        <Link
          component={this.createLinkForGenre(genre.id)}
          style={{ textDecoration: "none" }}
          color="inherit"
        >
          <Card
            className={classes.card}
            onMouseEnter={this.toggleRaised}
            onMouseLeave={this.toggleRaised}
            raised={this.state.isCardRaised}
          >
            <CardContent className={classes.cardContent}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                align="center"
              >
                {formatName(genre.name)}
              </Typography>

              <img
                alt={genre.name.toLowerCase()}
                height={"100px"}
                width={"100px"}
                src={`https://huseinkasem.tk/devomusic/data/image/genres/${genre.name.toLowerCase()}.png`}
              />
            </CardContent>
          </Card>
        </Link>
      )
    );
  }
}

GenreCard.propTypes = {
  classes: PropTypes.object.isRequired,
  genre: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(GenreCard);
