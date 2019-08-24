import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Preloader from "../common/Preloader";
import Error from "../common/Error";
import PageTitle from "../common/PageTitle";
import { loadGenres } from "../../actions/genres";
import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";
import GenreCard from "../genres/GenreCard";
//import Tooltip from "@material-ui/core/Tooltip"; // for later to have better affordance

const styles = theme => ({
  shiftForDrawerOpen: {
    marginLeft: SHIFT_WHEN_DRAWER_OPEN,
    width: `calc(100% - ${SHIFT_WHEN_DRAWER_OPEN}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  shiftForDrawerClosed: {
    marginLeft: SHIFT_WHEN_DRAWER_CLOSE,
    width: `calc(100% - ${SHIFT_WHEN_DRAWER_CLOSE}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 2}px 0`
  }
});

export class Genres extends React.Component {
  componentDidMount() {
    this.props.loadGenres();
  }

  render() {
    const {
        classes,
        isDrawerOpen,
        isGenresLoading,
        genres
    } = this.props;

    const pageTitle = "Genres";
    const pageSubtitle = "Welcome brother";

    if (isGenresLoading) {
        return <Preloader />;
    } else {
        if (!genres) {
            return (
                <Error message="Something went wrong when trying to load the genres" />
            );
        } else {
            return ( 
                  
                <div className="container">
                    <PageTitle
                        isDrawerOpen={isDrawerOpen}
                        title={pageTitle}
                        subtitle={pageSubtitle}
                    />
                    
                    <div
                        className={classNames(
                            classes.cardGrid,
                            {
                            [classes.shiftForDrawerOpen]: isDrawerOpen
                            },
                            {
                            [classes.shiftForDrawerClosed]: !isDrawerOpen
                            }
                        )}
                        >
                        <Grid container spacing={40}>
                            {genres.map(genre => (
                            <Grid item key={genre.id} xs={6} sm={4} md={3} lg={2} xl={2}>
                                <GenreCard genre={genre} />
                            </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>
            
            );
        }
    }
  }
}

Genres.propTypes = {
  classes: PropTypes.object.isRequired,
  genres: PropTypes.array,
  isGenresLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isDrawerOpen: state.drawer.isDrawerOpen,
  genres: state.genres.genres,
  isGenresLoading: state.genres.isLoading
});

export default connect(
  mapStateToProps,
  {loadGenres}
)(withStyles(styles, { withTheme: true })(withRouter(Genres)));
