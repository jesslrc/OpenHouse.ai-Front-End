import React, { useEffect, useState } from "react";
import CommunityCard from "../CommunityCard";
import { Community, loadCommunities } from "./community";
import { Grid } from "@mui/material";

export default function CommunityList() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [hasError, setError] = useState(false);

  useEffect(() => {
    loadCommunities().then((communities) => {
      try {
        setCommunities(communities);
      } catch (e) {
        setError(true);
      }
    });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {hasError ? (
        <div>Error occurred</div> //TODO introduce ErrorPage component; improve hasError to contain more error details
      ) : (
        <Grid container spacing={5} style={{ width: "70%" }}>
          {communities.map((community) => (
            <Grid
              item
              key={community.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              style={{ marginTop: "1vw", width: "100%" }}
            >
              <CommunityCard community={community} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
