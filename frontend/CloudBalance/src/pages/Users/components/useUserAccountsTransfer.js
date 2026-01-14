import { useEffect, useState, useCallback } from "react";

export default function useUserAccountsTransfer(accounts) {
  const [allAccounts, setAllAccounts] = useState([]);
  const [availableAccounts, setAvailableAccounts] = useState([]);
  const [assignedAccounts, setAssignedAccounts] = useState([]);
  const [draggedAccount, setDraggedAccount] = useState(null);

  useEffect(() => {
    if (Array.isArray(accounts)) setAllAccounts(accounts);
  }, [accounts]);

  useEffect(() => {
    if (!Array.isArray(allAccounts)) return;

    const assignedAccountIds = new Set(
      assignedAccounts.map((a) => a.accountId)
    );
    setAvailableAccounts(
      allAccounts.filter((acc) => !assignedAccountIds.has(acc.accountId))
    );
  }, [allAccounts, assignedAccounts]);

  const handleDragStart = useCallback((account) => {
    setDraggedAccount(account);
  }, []);

  const handleDropToAssigned = useCallback(() => {
    if (!draggedAccount) return;
    setAssignedAccounts((prev) => [...prev, draggedAccount]);
    setDraggedAccount(null);
  }, [draggedAccount]);

  const handleDropToAvailable = useCallback(() => {
    if (!draggedAccount) return;
    setAssignedAccounts((prev) =>
      prev.filter((a) => a.id !== draggedAccount.id)
    );
    setDraggedAccount(null);
  }, [draggedAccount]);

  return {
    allAccounts,
    availableAccounts,
    assignedAccounts,
    setAssignedAccounts,
    handleDragStart,
    handleDropToAssigned,
    handleDropToAvailable,
  };
}
