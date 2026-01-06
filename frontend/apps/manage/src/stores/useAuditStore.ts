import { create } from 'zustand';

interface AuditState {
  pendingCount: {
    post: number;
    reply: number;
    contactRequest: number;
  };
  setPendingCount: (count: AuditState['pendingCount']) => void;
}

export const useAuditStore = create<AuditState>((set) => ({
  pendingCount: { post: 0, reply: 0, contactRequest: 0 },
  setPendingCount: (pendingCount) => set({ pendingCount }),
}));
