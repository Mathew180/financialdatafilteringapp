
# Financial Data Filtering

This project is a web application built with React (frontend) and Python (backend). The app allows users to filter, sort, and paginate financial data, including revenue, net income, gross profit, EPS, and operating income. It connects to a Python backend to retrieve the data via an API.

## Project Structure

### Frontend (React)

- **React:** The frontend is built with React, providing a user-friendly interface for interacting with the financial data.
- **Axios:** Used for making HTTP requests to the backend API.

### Backend (Python)

- **Flask/Django:** The backend is built using Python, utilizing Flask. It serves the financial data through an API.

---

## Features

- **Filtering:** Filter data by date range, revenue range, and net income range.
- **Sorting:** Sort data by different columns (Date, Revenue, Net Income, etc.).
- **Pagination:** Paginate through the data, displaying a limited number of rows per page.
- **Number Formatting:** Display numbers like revenue and net income in a readable format (e.g., `96,995,000,000`).

---

## Setup and Installation

### Prerequisites

- **Node.js** (for React frontend)
- **Python** (for the backend API)
- **Backend Framework** (Flask or Django)
- **Database** (if applicable, depending on your backend setup)

### Frontend Setup (React)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/financial-data-filtering.git
   cd financial-data-filtering/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and go to `http://localhost:3000` to see the frontend.

### Backend Setup (Python)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/financial-data-filtering.git
   cd financial-data-filtering/backend
   ```

2. Install the necessary Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the backend server (Flask example):
   ```bash
   python app.py
   ```


4. The backend API should now be running at `http://localhost:8000`.

---

## Usage

1. **Frontend:** The frontend allows you to filter, sort, and paginate the financial data. It uses the API endpoint `/get-financial-data/` to retrieve the data.
2. **Backend:** The Python backend serves the financial data through an API. You can modify the data or add additional endpoints as needed.

---

## API Endpoints

- `GET /get-financial-data/`: Returns the financial data in JSON format.

---

## Technologies Used

- **Frontend:** React, Axios
- **Backend:** Python (Flask)
- **Styling:** Tailwind CSS
- **Data Formatting:** JavaScript's `Intl.NumberFormat` for number formatting

---

## Contributing

Feel free to fork this repository and create a pull request if you'd like to contribute to the project.

---

## License

