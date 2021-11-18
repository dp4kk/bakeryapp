import React, { useContext,useEffect } from "react";
import { AppContext } from "../Context/Datacontext";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { SearchInputContext } from "../Context/SearchContext";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  card: {
    paddingLeft: "40px",
  },
  root: {
    maxWidth: 300,
    marginBottom: theme.spacing(6),
  },
  media: {
    height: 250,
  },
}));
const Cupcake = () => {
  const { addProduct, cartItems, increase } = useContext(AppContext);
  const { displayData,searchProduct} = useContext(SearchInputContext)
  const classes = useStyles();
  const history = useHistory()
  useEffect(() => {
    searchProduct();
  }, [searchProduct]);
  return (
    <div>
      <Grid container className={classes.card}>
        {displayData
          .filter((products) => products.category === "cupcake")
          .map((item) => {
            const alreadyPresent = cartItems.find(
              (product) => product.id === item.id
            );
            const handleBuyNow = () => {
              alreadyPresent ? increase(item) : addProduct(item);
              history.push("/cart");
            };
            return (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      title={item.name}
                      alt={item.name}
                      image={item.image}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5">
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textPrimary"
                        style={{ display: "inline-block", padding: "5px" }}
                      >
                        ${item.price}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        style={{
                          display: "inline-block",
                          textDecorationLine: "line-through",
                        }}
                      >
                        ${item.price * 2}{" "}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="error"
                        style={{ display: "inline-block", padding: "5px" }}
                      >
                        50% off
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        alreadyPresent ? increase(item) : addProduct(item);
                      }}
                    >
                      Add to cart
                    </Button>
                    <Button size="small" color="primary" variant="contained" onClick={handleBuyNow}>
                      Buy Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default Cupcake;
