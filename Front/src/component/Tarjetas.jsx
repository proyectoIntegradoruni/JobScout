import React from "react";
import Card from "./tarjeta";
import { Grid } from '@mui/material';

const cards = [
  {
    id: 1,
    title: "",
    image: "",
    url: "",
  },
  {
    id: 1,
    title: "",
    image: "",
    url: "",
  },{
    id: 1,
    title: "",
    image: "",
    url: "",
  },{
    id: 1,
    title: "",
    image: "",
    url: "",
  },{
    id: 1,
    title: "",
    image: "",
    url: "",
  },{
    id: 1,
    title: "",
    image: "",
    url: "",
  },
  {
    id: 1,
    title: "",
    image: "",
    url: "",
  },
  {
    id: 1,
    title: "",
    image: "",
    url: "",
  },

];

function Cards() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Grid container spacing={5}>
        {cards.map(({ title, image, url, id }) => (
          <Grid item xs={12} sm={6} md={3} key={id}>
            <Card imageSource={image} title={title} url={url} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Cards;