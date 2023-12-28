import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { Community } from "../CommunityList";
import { CardContent, CardMedia, Typography } from "@mui/material";

type Props = {
  community: Community;
};
export default function CommunityCard(props: Props) {
  const [imageValid, setImageValid] = useState(true);

  // handling an edge case where the image URL is present but the URL produces no image content
  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageValid(image.width > 0 && image.height > 0);
    };
    image.onerror = () => {
      setImageValid(false);
    };
    image.src = props.community.imgUrl || "";
  }, [props.community.imgUrl]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 220 }} //TODO introduce responsiveness
        image={
          imageValid
            ? props.community.imgUrl
            : "https://www.fagerhult.com/assets/images/no-image-available.jpg?w=460&mode=crop&scale=down"
        }
        title={props.community.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.community.name}
        </Typography>
      </CardContent>
      <Typography color="text.secondary">
        Average Price:{" "}
        {props.community.averagePrice
          ? "$" + props.community.averagePrice.toFixed(2)
          : "N/A"}
      </Typography>
    </Card>
  );
}
