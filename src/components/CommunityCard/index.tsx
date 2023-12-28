import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { CardContent, CardMedia, Typography } from "@mui/material";
import { Community } from "../CommunityList/community";

type Props = {
  community: Community;
};

const CADDollar = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
});

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
    <Card variant="outlined" sx={{ maxWidth: 600 }}>
      <CardMedia
        sx={{ height: 300 }}
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
          ? CADDollar.format(props.community.averagePrice)
          : "N/A"}
      </Typography>
    </Card>
  );
}
