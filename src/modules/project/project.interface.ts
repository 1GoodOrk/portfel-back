export interface ProjectData {
  id: string;
  name: string;
  subinfo: string;
  budget: number;
  duration: number;
  road: number;
  mainRoad: boolean;
  inTown: boolean;
  town: string;
  addressStart: string;
  addressEnd: string;
  des: string;
  img: string;
}

export interface ProjectRO {
  data: ProjectData;
}
