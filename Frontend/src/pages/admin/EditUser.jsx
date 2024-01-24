import { useParams } from "react-router-dom";
import { EditUserProfile } from "../../components/index";
const EditUser = () => {
  const id = useParams().id;
  return <EditUserProfile id={id} />;
};

export default EditUser;
