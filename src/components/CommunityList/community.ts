import { HouseDTO } from "../../api/types";
import { getCommunities, getHouses } from "../../api/api";

export type Community = {
  group: string;
  id: string;
  imgUrl?: string;
  name: string;
  averagePrice?: number;
};

export function loadCommunities(): Promise<Community[]> {
  return Promise.all([getCommunities(), getHouses()])
    .then(([communityDtos, houses]) => {
      try {
        const averageCommunityPricesByCommunityId =
          calculateCommunitiesAveragePrice(houses);

        const communities: Community[] = communityDtos.map((community) => ({
          ...community,
          averagePrice: averageCommunityPricesByCommunityId.get(community.id),
        }));

        return sortCommunitiesAlphabetically(communities);
      } catch (e) {
        console.error(e);
        throw e;
      }
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}

export function sortCommunitiesAlphabetically(communities: Community[]) {
  return communities.sort((communityA, communityB) => {
    const nameA = communityA.name.toUpperCase();
    const nameB = communityB.name.toUpperCase();
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  }); //alternatively could use localeCompare
}

// TODO do a second pass to improve readability.
export function calculateCommunitiesAveragePrice(
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
