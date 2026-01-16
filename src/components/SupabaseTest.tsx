import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Button } from '@/components/ui/button';

const supabaseTestStyles = `
  .supabase-test-container {
    padding: 20px;
  }
  .supabase-test-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  .supabase-test-error {
    color: red;
    margin-bottom: 10px;
  }
  .supabase-test-output {
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
  }
`;

export default function SupabaseTest() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInsert = async () => {
        setLoading(true);
        setError('');
        // Insert sample data into 'test_table'. Make sure this table exists in your Supabase project.
        const { data, error } = await supabase
            .from('test_table')
            .insert([{ name: 'Sample', created_at: new Date().toISOString() }])
            .select();
        if (error) setError(error.message);
        setData(data);
        setLoading(false);
    };

    const handleFetch = async () => {
        setLoading(true);
        setError('');
        const { data, error } = await supabase
            .from('test_table')
            .select('*');
        if (error) setError(error.message);
        setData(data);
        setLoading(false);
    };

    return (
        <>
            <style>{supabaseTestStyles}</style>
            <div className="supabase-test-container">
                <h2>Supabase Test</h2>
                <div className="supabase-test-buttons">
                    <Button onClick={handleInsert} disabled={loading}>
                        Insert Sample Data
                    </Button>
                    <Button onClick={handleFetch} disabled={loading}>
                        Fetch Data
                    </Button>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p className="supabase-test-error">{error}</p>}
                <pre className="supabase-test-output">{JSON.stringify(data, null, 2)}</pre>
            </div>
        </>
    );
}
