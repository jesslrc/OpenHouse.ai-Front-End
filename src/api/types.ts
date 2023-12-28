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
