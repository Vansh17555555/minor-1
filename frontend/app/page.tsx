"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const AnxietyPredictionApp = () => {
  const [formData, setFormData] = useState({
    Gender_Female: 0,
    Gender_Male: 0,
    Family_History_No: 0,
    Family_History_Yes: 0,
    Personal_History_No: 0,
    Personal_History_Yes: 0,
    Current_Stressors_High: 0,
    Current_Stressors_Low: 0,
    Current_Stressors_Moderate: 0,
    Symptoms_Chest_pain: 0,
    Symptoms_Dizziness: 0,
    Symptoms_Fear_of_losing_control: 0,
    Symptoms_Panic_attacks: 0,
    Symptoms_Shortness_of_breath: 0,
    Severity_Mild: 0,
    Severity_Moderate: 0,
    Severity_Severe: 0,
    Impact_on_Life_Mild: 0,
    Impact_on_Life_Moderate: 0,
    Impact_on_Life_Significant: 0,
    Demographics_Rural: 0,
    Demographics_Urban: 0,
    Medical_History_Asthma: 0,
    Medical_History_Diabetes: 0,
    Medical_History_Heart_disease: 0,
    Medical_History_Unknown: 0,
    Psychiatric_History_Anxiety_disorder: 0,
    Psychiatric_History_Bipolar_disorder: 0,
    Psychiatric_History_Depressive_disorder: 0,
    Psychiatric_History_Unknown: 0,
    Substance_Use_Alcohol: 0,
    Substance_Use_Drugs: 0,
    Substance_Use_Unknown: 0,
    Coping_Mechanisms_Exercise: 0,
    Coping_Mechanisms_Meditation: 0,
    Coping_Mechanisms_Seeking_therapy: 0,
    Coping_Mechanisms_Socializing: 0,
    Social_Support_High: 0,
    Social_Support_Low: 0,
    Social_Support_Moderate: 0,
    Lifestyle_Factors_Diet: 0,
    Lifestyle_Factors_Exercise: 0,
    Lifestyle_Factors_Sleep_quality: 0,
    Age: 0,
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null); // Fix 1: Allow both null and string

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parseInt(value, 10) || 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://minor-1-bm5l.onrender.com/predict/', formData);
      setPrediction(response.data.prediction[0]);
      setError(null);
    } catch (error) {
      console.error('Error making prediction:', error);
      setError('An error occurred while making the prediction. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md mt-[2200px]">
        <CardHeader>
          <CardTitle>Anxiety Prediction App</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {Object.keys(formData).map((field) => (
              <div key={field} className="">
                <Label htmlFor={field}>{field.replace(/_/g, ' ')}</Label>
                <Input
                  id={field}
                  name={field}
                  type="number"
                  placeholder="0 or 1"
                  value={formData[field as keyof typeof formData]} // Fix 2: Type cast field as a key of formData
                  onChange={handleInputChange}
                />
              </div>
            ))}
            <Button type="submit">Predict</Button>
          </form>
          {prediction !== null && (
            <div className="mt-4">
              <h3>Prediction Result: {prediction}</h3>
              {prediction === 1 ? (
                <div className="mt-2 text-red-600 font-bold">
                  We have concerns that you may be experiencing anxiety. Please consider reaching out to a healthcare professional for further evaluation.
                </div>
              ) : (
                <div className="mt-2 text-green-600 font-bold">
                  Based on the prediction, there are no significant concerns regarding anxiety at the moment. However, always listen to your body and seek help if needed.
                </div>
              )}
            </div>
          )}
          {error && <div className="mt-4 text-red-600">{error}</div>}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnxietyPredictionApp;