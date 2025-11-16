export interface Transaction {
  id: string | number
  user_id: string
  date: string
  name: string
  amount: number
  category?: string | null
  is_subscription?: boolean | null
  source?: string | null
  raw_json?: Record<string, unknown> | null
  created_at?: string | null
}

export interface Budget {
  id: string
  user_id: string
  category: string
  monthly_limit: number
  created_at?: string | null
}

export interface Insight {
  id: string | number
  user_id: string
  type: string
  title: string
  description: string
  severity: number
  related_transaction_ids?: (string | number)[] | null
  created_at?: string | null
}

export interface RiskFlag {
  id: string | number
  user_id: string
  flag_type: string
  details?: Record<string, unknown> | null
  resolved?: boolean
  created_at?: string | null
}

export interface UserProfile {
  id: string
  email?: string | null
  full_name?: string | null
  created_at?: string | null
}

export interface FinexData {
  user: UserProfile | null
  transactions: Transaction[]
  budgets: Budget[]
  insights: Insight[]
  riskFlags: RiskFlag[]
}
