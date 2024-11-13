from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib  # or any other library you're using for your model

# Initialize the FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, use a specific domain in production
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Load your trained model
model = joblib.load("./best_random_forest_model.pkl")  # Change to your model path

# Define the input data structure
class InputData(BaseModel):
    Gender_Female: int
    Gender_Male: int
    Family_History_No: int
    Family_History_Yes: int
    Personal_History_No: int
    Personal_History_Yes: int
    Current_Stressors_High: int
    Current_Stressors_Low: int
    Current_Stressors_Moderate: int
    Symptoms_Chest_pain: int
    Symptoms_Dizziness: int
    Symptoms_Fear_of_losing_control: int
    Symptoms_Panic_attacks: int
    Symptoms_Shortness_of_breath: int
    Severity_Mild: int
    Severity_Moderate: int
    Severity_Severe: int
    Impact_on_Life_Mild: int
    Impact_on_Life_Moderate: int
    Impact_on_Life_Significant: int
    Demographics_Rural: int
    Demographics_Urban: int
    Medical_History_Asthma: int
    Medical_History_Diabetes: int
    Medical_History_Heart_disease: int
    Medical_History_Unknown: int
    Psychiatric_History_Anxiety_disorder: int
    Psychiatric_History_Bipolar_disorder: int
    Psychiatric_History_Depressive_disorder: int
    Psychiatric_History_Unknown: int
    Substance_Use_Alcohol: int
    Substance_Use_Drugs: int
    Substance_Use_Unknown: int
    Coping_Mechanisms_Exercise: int
    Coping_Mechanisms_Meditation: int
    Coping_Mechanisms_Seeking_therapy: int
    Coping_Mechanisms_Socializing: int
    Social_Support_High: int
    Social_Support_Low: int
    Social_Support_Moderate: int
    Lifestyle_Factors_Diet: int
    Lifestyle_Factors_Exercise: int
    Lifestyle_Factors_Sleep_quality: int
    Age: int

# Define the prediction endpoint
@app.post("/predict/")
async def predict(input_data: InputData):
    # Convert input data to a list
    input_values = list(input_data.dict().values())

    # Make prediction
    prediction = model.predict([input_values])  # The model expects a 2D array

    return {"prediction": prediction.tolist()}

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
