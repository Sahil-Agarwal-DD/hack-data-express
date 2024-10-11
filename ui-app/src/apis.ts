import { API_PATH } from "./constants";
import { useDataExpressStore } from "./stores/useDataExpressStore";

export const fetchDomainList = () => {
  const store = useDataExpressStore.getState();
  fetch(`${API_PATH}/data-domain-list`)
    .then((v) => v.json())
    .then((v) => {
      store.setDomains(
        v?.domain_list.map((d: string) => ({
          label: d,
        }))
      );
    });
};
