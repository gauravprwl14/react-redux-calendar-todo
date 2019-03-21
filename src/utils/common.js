import apiQueue from "../services/apiQueue";
function handleLogout() {
  localStorage.clear();
  apiQueue.stopQueueProcessing();
}

export default { handleLogout };
