from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","https://financialdatafilteringapp.vercel.app/"],  # Replace with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = 'WbbJc50bp8SIcU7updZGTC9OCL7eB7ds'
API_URL = f'https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey={API_KEY}'

@app.get("/get-financial-data/")
async def get_financial_data(
    start_date: int = Query(None, ge=2000, description="Start year for filtering data"),
    end_date: int = Query(None, le=2024, description="End year for filtering data"),
    min_revenue: float = Query(0, description="Minimum revenue for filtering"),
    max_revenue: float = Query(float('inf'), description="Maximum revenue for filtering"),
    min_net_income: float = Query(0, description="Minimum net income for filtering"),
    max_net_income: float = Query(float('inf'), description="Maximum net income for filtering")
):
    # Use default values if the parameters are not provided
    start_date = start_date or 2020  # Default to 2020 if not provided
    end_date = end_date or 2024      # Default to 2024 if not provided
    
    # Call the external API
    response = requests.get(API_URL)
    if response.status_code != 200:
        return {"error": f"API returned status code {response.status_code}: {response.text}"}
    
    try:
        data = response.json()
    except ValueError:
        return {"error": "Failed to parse JSON. Invalid API response."}

    print("Original API Response:", data)  # Debugging the raw response

    # Filter the data based on the received parameters
    filtered_data = []
    for row in data:
        date = int(row["date"][:4])  # Extract year from date

        # Apply all conditions together in one block
        if (
            start_date <= date <= end_date and
            min_revenue <= row.get("revenue", 0) <= max_revenue and
            min_net_income <= row.get("netIncome", 0) <= max_net_income
        ):
            print(f"Row passed filters: {row}")  # Debugging filtered row
            filtered_data.append(row)
    
    print("Filtered Data:", filtered_data)  # Debugging the filtered data

    return {"data": filtered_data}
