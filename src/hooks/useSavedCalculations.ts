import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { SavedCalculation } from '../types/property';
import { useAuth } from '../contexts/AuthContext';

export function useSavedCalculations() {
  const [calculations, setCalculations] = useState<SavedCalculation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setCalculations([]);
      setLoading(false);
      return;
    }

    const fetchCalculations = async () => {
      try {
        const { data, error } = await supabase
          .from('saved_calculations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const formattedCalculations = data?.map(calc => ({
          id: calc.id,
          name: calc.name,
          date: new Date(calc.created_at).toLocaleDateString(),
          propertyDetails: calc.property_details,
          expenses: calc.expenses,
          expectedRent: calc.expected_rent,
          metrics: calc.metrics,
        })) || [];

        setCalculations(formattedCalculations);
      } catch (error) {
        console.error('Error fetching calculations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalculations();
  }, [user]);

  const saveCalculation = async (calculation: Omit<SavedCalculation, 'id' | 'date'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('saved_calculations')
        .insert([{
          user_id: user.id,
          name: calculation.name,
          property_details: calculation.propertyDetails,
          expenses: calculation.expenses,
          expected_rent: calculation.expectedRent,
          metrics: calculation.metrics,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) throw error;

      const formattedCalculation: SavedCalculation = {
        id: data.id,
        name: data.name,
        date: new Date(data.created_at).toLocaleDateString(),
        propertyDetails: data.property_details,
        expenses: data.expenses,
        expectedRent: data.expected_rent,
        metrics: data.metrics,
      };

      setCalculations([formattedCalculation, ...calculations]);
      return formattedCalculation;
    } catch (error) {
      console.error('Error saving calculation:', error);
      return null;
    }
  };

  const deleteCalculation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('saved_calculations')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;

      setCalculations(calculations.filter(calc => calc.id !== id));
    } catch (error) {
      console.error('Error deleting calculation:', error);
    }
  };

  return {
    calculations,
    loading,
    saveCalculation,
    deleteCalculation,
  };
}