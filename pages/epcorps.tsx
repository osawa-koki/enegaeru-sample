import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Table, Alert } from "react-bootstrap";
import { DataContext } from "../components/DataContext";
import ForceLogin from "../components/ForceLogin";
import Layout from "../components/Layout";
import EpcorpsResponse from "../interface/epcorps";
import SharedData from "../interface/SharedData";
import Setting from "../setting";

export default function Epcorps() {

  const [epcorps, setEpcorps] = useState<EpcorpsResponse[] | null>(null);

  const { sharedData, setSharedData } = useContext<
  {
    sharedData: SharedData;
    setSharedData: React.Dispatch<React.SetStateAction<SharedData>>;
  }
  >(DataContext);

  useEffect(() => {
    if (!sharedData.api_key || !sharedData.uid) return;
    fetch(`${Setting.apiPath}/v4/epcorps`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": sharedData.api_key,
        "Authorization": sharedData.uid,
      },
    })
    .then((res) => res.json())
    .then((data: EpcorpsResponse[]) => {
      setEpcorps(data);
    })
    .catch((err) => {
      console.error(err);
    });
  }, []);

  return (
    <Layout>
      <div id="Epcorps" className="mt-3">
        <h1>🦀 Epcorps</h1>
        <hr />
        {
          epcorps !== null && epcorps !== undefined ? (
            epcorps.map((epcorp, _) => (
              <Table bordered={true} key={epcorp.id} id="EpcorpsContent">
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>id</th>
                    <td>{epcorp.id}</td>
                  </tr>
                  <tr>
                    <th>short name</th>
                    <td>{epcorp.epcorp_short_name}</td>
                  </tr>
                  <tr>
                    <th>surplus selling</th>
                    <td>{epcorp.surplus_selling}</td>
                  </tr>
                  <tr>
                    <th>after surplus selling</th>
                    <td>{epcorp.after_surplus_selling}</td>
                  </tr>
                  <tr>
                    <th>oldepcorp cd</th>
                    <td>{epcorp.oldepcorp_cd}</td>
                  </tr>
                  <tr>
                    <th>metiepcorp cd</th>
                    <td>{epcorp.metiepcorp_cd}</td>
                  </tr>
                  <tr>
                    <th>occtoepcorp cd</th>
                    <td>{epcorp.occtoepcorp_cd}</td>
                  </tr>
                  <tr>
                    <th>occto cd</th>
                    <td>{epcorp.occto_cd}</td>
                  </tr>
                </tbody>
              </Table>
            ))
          )
          :
          <ForceLogin />
        }
      </div>
    </Layout>
  );
};
