import { API_PATH } from "./constants";
import { useDataExpressStore } from "./stores/useDataExpressStore";

export const fetchDomainList = () => {
  const store = useDataExpressStore.getState();
  return fetch(`${API_PATH}/data-domain-list`)
    .then((v) => v.json())
    .then((v) => {
      store.setDomains(
        v?.domain_list.map((d: string) => ({
          label: d,
        }))
      );
    });
};

export const fetchTemplates = () => {
  const store = useDataExpressStore.getState();
  return fetch(`${API_PATH}/query-templates-list`)
    .then((v) => v.json())
    .then((v) => {
      store.setQueryTemplates(
        v?.query_templates_list.map((d: string) => ({
          label: d,
        }))
      );
      return v;
    });
};
