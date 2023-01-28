
type _EpcorpsComponent = {
  id: number;
  epcorp_short_name: string;
  surplus_selling: number;
  after_surplus_selling: number;
  oldepcorp_cd: number;
  metiepcorp_cd: string;
  occtoepcorp_cd: string;
  occto_cd: string;
};

type EpcorpsResponse = {
  epcorps: _EpcorpsComponent[];
};

export default EpcorpsResponse;
