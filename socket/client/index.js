import axios from "axios";

const getGroupMember = async () => {
  const res = await axios.get("http://localhost:3000/group-member");
  console.log(res.data);
};

getGroupMember();