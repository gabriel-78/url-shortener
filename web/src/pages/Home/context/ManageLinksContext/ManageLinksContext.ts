import { createContext, useContext } from 'react';
import { Link } from '../../../../services/links/link';

type ManageLinksContextType = {
  isLoading: boolean;
  links: Link[];
  addLink: (value: Link) => void;
  removeLink: (id: string) => void;
};

export const ManageLinksContext = createContext<ManageLinksContextType>({
  addLink: () => {},
  links: [],
  removeLink: () => {},
  isLoading: false,
});

export const useManageLinksContext = () => {
  return useContext(ManageLinksContext);
};
