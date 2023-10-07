import { ethers } from "ethers";
import { FC } from "react";
import { Loader, Table, Toggle } from "rsuite";
import abi from "../../contracts/LearningToken.json";
import {
  useGetInstitutionQuery,
  useUpdateInstitutionStatusMutation,
} from "../../store/features/admin/adminApi";

const { Column, HeaderCell, Cell } = Table;
const SMART_CONTRACT = import.meta.env.VITE_SMART_CONTRACT;
const Institution: FC = () => {
  const { data, isLoading } = useGetInstitutionQuery();
  const [updateInstitutionStatus] = useUpdateInstitutionStatusMutation();

  const toggleStatus = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(SMART_CONTRACT!, abi, signer);
      const tx = await contract.registerInstitution(
        "cream_beans_digital",
        "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
        Date.now()
      );
      console.log(tx);
    }

    // await updateInstitutionStatus(rowData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="py-3">
      <button onClick={() => toggleStatus()}>Connect</button>
      <Table data={data.result.data} autoHeight rowClassName={"cursor-pointer"}>
        <Column flexGrow={1} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Public Address</HeaderCell>
          <Cell dataKey="publicAddress" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Status</HeaderCell>
          <Cell>
            {(rowData) => {
              return (
                <>
                  <Toggle checked={rowData.status} />
                </>
              );
            }}
          </Cell>
        </Column>
      </Table>
    </div>
  );
};

export default Institution;
