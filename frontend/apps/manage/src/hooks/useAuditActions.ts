export function useAuditActions() {
  const approve = async (id: number) => {
    return id;
  };

  const reject = async (id: number, reason: string) => {
    return { id, reason };
  };

  return { approve, reject };
}
