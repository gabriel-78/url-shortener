import { useState, ReactNode, useEffect, useCallback } from 'react';
import { Link } from '../../../../services/links/link';
import { ManageLinksContext } from './ManageLinksContext';
import { getAllLinks } from '../../../../services/links/getLinks';
import { parseGetLinkResponseToLink } from '../../utils/parseGetLinkResponseToLink';
import { toast } from 'sonner';

export const ManageLinksProvider = ({ children }: { children: ReactNode }) => {
  const [links, setLinks] = useState<Link[]>([]);
  const [isFetchingLinks, setIsFetchingLinks] = useState<boolean>(false);

  const addLink = useCallback(
    (link: Link) => {
      setLinks((prev) => [link, ...prev]);
    },
    [setLinks],
  );

  const removeLink = useCallback(
    (id: string) => {
      setLinks((prev) => prev.filter((link) => link.id !== id));
    },
    [setLinks],
  );

  const fetchLinks = useCallback(async () => {
    setIsFetchingLinks(true);

    const result = await getAllLinks();

    if (result.isSuccess) {
      const value = result.getValue().map((resultValue) => parseGetLinkResponseToLink(resultValue));

      setLinks(value);
    } else {
      toast.error(result.error);
    }

    setIsFetchingLinks(false);
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  return (
    <ManageLinksContext.Provider value={{ links, addLink, removeLink, isLoading: isFetchingLinks }}>
      {children}
    </ManageLinksContext.Provider>
  );
};
