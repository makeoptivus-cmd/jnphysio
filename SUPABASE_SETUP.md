# Supabase Setup Guide

## Step 1: Create the Reviews Table

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy and paste this SQL code:

```sql
CREATE TABLE reviews (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL,
  comment TEXT NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

6. Click **Run** (or press Ctrl+Enter)

## Step 2: Disable Row Level Security (RLS)

If RLS is enabled on the table, it will block data fetching. To disable it:

1. Go to **Authentication** → **Policies** (left sidebar)
2. Find the **reviews** table
3. If you see RLS is enabled, click **Disable RLS**
4. Or create a public policy allowing SELECT, INSERT operations

## Step 3: Insert Sample Data (Optional)

To test if data fetches correctly, add sample data:

```sql
INSERT INTO reviews (id, name, rating, comment, date) VALUES
('1', 'Test User', 5, 'This is a test review', '2024-01-15'),
('2', 'Another User', 4, 'Great service', '2024-01-14');
```

## Step 4: Test the Connection

1. Reload your website in the browser
2. Open the browser **Console** (F12 → Console tab)
3. Look for:
   - "Fetched reviews:" message (success)
   - "Supabase Error:" message (failure - check the error details)

## Troubleshooting

### If you see "relation 'reviews' does not exist"
- The table wasn't created. Follow Step 1 again.

### If you see "new row violates row-level security policy"
- RLS is enabled and blocking insertions. Follow Step 2.

### If no data shows up
- The table exists but is empty. Insert sample data using Step 3.

### If you see CORS or authentication errors
- Your Supabase credentials might be wrong. Check supabaseClient.ts
