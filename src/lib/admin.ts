export const ADMIN_STATUSES = ['new', 'contacted', 'archived'] as const;

export type AdminStatus = (typeof ADMIN_STATUSES)[number];

export type ContactRequest = {
  id: string;
  created_at: string;
  nom: string;
  societe: string | null;
  email: string;
  telephone: string | null;
  message: string;
  status: AdminStatus;
  ip: string | null;
  user_agent: string | null;
};

export function isAdminStatus(value: string): value is AdminStatus {
  return ADMIN_STATUSES.includes(value as AdminStatus);
}
