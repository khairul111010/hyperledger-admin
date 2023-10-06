import { Contract, ethers } from "ethers";
import { Loader, Table, Toggle } from "rsuite";
import abi from "../../contracts/LearningToken.json";
import {
  useGetInstitutionQuery,
  useUpdateInstitutionStatusMutation,
} from "../../store/features/admin/adminApi";

const { Column, HeaderCell, Cell } = Table;
const SMART_CONTRACT = import.meta.env.VITE_SMART_CONTRACT;
const Institution = () => {
  const { data, isLoading } = useGetInstitutionQuery();
  const [updateInstitutionStatus] = useUpdateInstitutionStatusMutation();

  const toggleStatus = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract("test", abi, provider);
    console.log(contract);

    // const signer = provider.getSigner();
    // const conc = new ethers.Contract(SMART_CONTRACT!, abi, signer);
    // console.log(conc);
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
