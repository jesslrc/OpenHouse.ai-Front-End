import axios from "axios";
import { CommunityDTO, HouseDTO } from "./types";

const apiURL = "http://localhost:4000/api/";

export async function getCommunities() {
  const response = await axios.get<CommunityDTO[]>(apiURL + "communities");
  validateCommunitiesStructure(response.data);
  return response.data;
}

export async function getHouses() {
  const response = await axios.get<HouseDTO[]>(apiURL + "houses");
  // TODO validate houses structure
  return response.data;
}

function validateCommunitiesStructure(communities: CommunityDTO[]) {
  communities.forEach((community) => {
    if (!community.id) throw new Error("Community is missing id");
    // if (!community.imgUrl) throw new Error("Community is missing imgUrl");
    if (!community.name) throw new Error("Community is missing name");
  });
}
