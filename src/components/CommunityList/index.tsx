import React, { useEffect, useState } from "react";
import CommunityCard from "../CommunityCard";
import axios from "axios";

// DTOs for communication with API
export type CommunityDTO = {
  group: string;
  id: string;
  imgUrl?: string; //making the img optional, as some of the communities don't have img
  name: string;
};

export type HouseDTO = {
  id: string;
  communityId: string;
  price: number;
  area: number;
  type: string;
};

// "domain" types
export type Community = {
  group: string;
  id: string;
  imgUrl?: string;
  name: string;
  averagePrice?: number;
};

async function getCommunities() {
  const response = await axios.get<CommunityDTO[]>(
    "http://localhost:4000/api/communities",
  );
  return response.data;
}

async function getHouses() {
  const response = await axios.get<HouseDTO[]>(
    "http://localhost:4000/api/houses",
  );
  return response.data;
}

function sortCommunitiesAlphabetically(communities: Community[]) {
  return communities.sort((communityA, communityB) => {
    const nameA = communityA.name.toUpperCase();
    const nameB = communityB.name.toUpperCase();
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  }); //alternatively could use localeCompare
}

function validateCommunitiesStructure(communities: CommunityDTO[]) {
  communities.forEach((community) => {
    if (!community.id) throw new Error("Community is missing id");
    // if (!community.imgUrl) throw new Error("Community is missing imgUrl");
    if (!community.name) throw new Error("Community is missing name");
  });
}

// TODO do a second pass to improve readability.
function calculateCommunitiesAveragePrice(
  houses: HouseDTO[],
): Map<string, number> {
  const communityGroups = houses.reduce((housesByCommunityId, house) => {
    const { communityId, price } = house;
    housesByCommunityId.set(communityId, [
      ...(housesByCommunityId.get(communityId) || []),
      price,
    ]);
    return housesByCommunityId;
  }, new Map<string, number[]>());

  const averagePrices = new Map<string, number>(
    Array.from(communityGroups.entries()).map(([communityId, prices]) => [
      communityId,
      prices.reduce((sum, price) => sum + price, 0) / prices.length,
    ]),
  );

  return averagePrices;
}

export default function CommunityList() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [hasError, setError] = useState(false);

  useEffect(() => {
    Promise.all([getCommunities(), getHouses()])
      .then(([communityDtos, houses]) => {
        try {
          validateCommunitiesStructure(communityDtos);

          const averageCommunityPricesByCommunityId =
            calculateCommunitiesAveragePrice(houses);

          const communities: Community[] = communityDtos.map((community) => ({
            ...community,
            averagePrice: averageCommunityPricesByCommunityId.get(community.id),
          }));

          const sorted = sortCommunitiesAlphabetically(communities);
          setCommunities(sorted);
        } catch (e) {
          console.error(e);
          setError(true);
        }
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, []);

  return (
    <div>
      {hasError ? (
        <div>Error occurred</div> //TODO introduce ErrorPage component; improve hasError to contain more error details
      ) : (
        communities.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))
      )}
    </div>
  );
}
