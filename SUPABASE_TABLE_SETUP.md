# Create Supabase Reviews Table

## Step 1: Go to SQL Editor in Supabase

1. Open https://app.supabase.com
2. Select your project
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**

## Step 2: Copy and Run This SQL

```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  rating INT2,
  comment TEXT,
  date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Step 3: Disable Row Level Security (RLS)

1. Go to **Authentication** → **Policies**
2. Find the **reviews** table
3. Click **Disable RLS** (if enabled)

Alternatively, create public policies:
```sql
-- Allow public READ
CREATE POLICY "Allow public read" ON reviews FOR SELECT USING (true);

-- Allow public INSERT
CREATE POLICY "Allow public insert" ON reviews FOR INSERT WITH CHECK (true);
```

## Step 4: Insert Test Data (Optional)

```sql
INSERT INTO reviews (name, rating, comment, date) VALUES
('Rajesh Kumar', 5, 'Excellent treatment for my back pain.', '2024-01-15'),
('Priya Sharma', 5, 'After my knee surgery, the rehabilitation was outstanding.', '2024-01-10');
```

## Field Details

| Field | Type | Required | Default | Purpose |
|-------|------|----------|---------|---------|
| id | UUID | Yes | gen_random_uuid() | Unique identifier |
| name | TEXT | Yes | - | Patient/reviewer name |
| rating | INT2 | No | NULL | Star rating (1-5) |
| comment | TEXT | No | NULL | Review text |
| date | TEXT | No | NULL | Review date (YYYY-MM-DD) |
| created_at | TIMESTAMPTZ | No | NOW() | Server timestamp |

After creating the table, reload your website at http://localhost:8080 and test the review submission!
