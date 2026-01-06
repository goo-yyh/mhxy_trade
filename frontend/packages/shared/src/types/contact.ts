export type AuditStatus = 'pending' | 'approved' | 'rejected';
export type OwnerStatus = 'pending' | 'approved' | 'rejected';

export interface ContactRequestSent {
  id: number;
  post: {
    id: number;
    title: string;
    thumbnail: string | null;
  };
  message: string;
  auditStatus: AuditStatus;
  ownerStatus: OwnerStatus | null;
  contactInfo?: string;
  createdAt: string;
}

export interface ContactRequestReceived {
  id: number;
  post: {
    id: number;
    title: string;
  };
  requester: {
    id: number;
    nickname: string;
    avatar: string | null;
  };
  message: string;
  auditStatus: AuditStatus;
  ownerStatus: OwnerStatus | null;
  createdAt: string;
}

export interface CreateContactRequestPayload {
  postId: number;
  message: string;
}

export interface HandleContactRequestPayload {
  action: 'approve' | 'reject';
  reason?: string;
}
