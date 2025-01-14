
# **WV FOODLINK Web Application**

## **Project Overview**
The **WV FOODLINK web application** is a modern, scalable platform built with **React**, **ArcGIS API for JavaScript**, and **PostgreSQL**. Developed as part of the **WV FOODLINK initiative** at West Virginia University’s Center for Resilient Communities, the application addresses food insecurity through interactive mapping, data visualization, and resource accessibility.

This project is designed for **West Virginia** and serves as a **template** for future implementation in other states and regions. Its modular architecture ensures scalability, efficient updates, and performance optimization.

---

## **Features**

### 1. **Interactive Mapping**
- Integration with **ArcGIS API for JavaScript** to render multi-layered, dynamic maps.
- Features include:
   - Layer filtering (e.g., food deserts, SNAP-compatible resources).
   - Location tools for food banks, fresh food outlets, and poverty regions.
   - Fast, optimized map rendering for smooth user interactions.

### 2. **Backend with PostgreSQL**
- Manages spatial and tabular data.
- Optimized **API endpoints** to efficiently query and serve data.  
- Designed for scalability with real-time and batch data updates.

### 3. **High Performance**
- **Lazy loading** and **code splitting** for faster rendering.  
- Efficient caching and API-driven data retrieval for reduced load times.  

### 4. **Dynamic Data Visualization**
- Charts and graphs using **Nivo.js** to visualize key trends:
   - Poverty rates over time.
   - Food resource availability.
   - Community-based statistics for actionable insights.

### 5. **Scalable and Modular Design**
- Built as a **template** for easy adaptation to other states or regions.  
- Modular components for future updates and new feature integration.

### 6. **Sustainable Development Goals (SDGs)**
The project aligns with:  
- **SDG 1**: No Poverty  
- **SDG 2**: Zero Hunger  
- **SDG 3**: Good Health and Well-being  

---

## **Tech Stack**

| **Technology**      | **Purpose**                     |
|----------------------|---------------------------------|
| **React**           | Frontend development            |
| **ArcGIS API**      | Mapping and spatial analysis    |
| **PostgreSQL**      | Backend data management         |
| **Node.js**         | Backend server/API              |
| **Nivo.js**         | Data visualization (charts)     |
| **Material-UI**     | UI components and styling       |
| **Docker**          | Deployment and containerization |

---

## **Installation**

### **Prerequisites**
- Node.js >= 16  
- PostgreSQL installed locally or accessible remotely  
- ArcGIS API key  

### **Steps**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/wv-foodlink.git
   cd wv-foodlink
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:  
   Create a `.env` file in the project root:
   ```plaintext
   REACT_APP_ARCGIS_API_KEY=your_arcgis_api_key
   DATABASE_URL=postgres://username:password@localhost:5432/your_db_name
   ```

4. **Set up the PostgreSQL database**:
   - Create the database schema and tables using provided SQL scripts in the `db` folder.

5. **Start the development server**:
   ```bash
   npm start
   ```

6. **Access the application**:  
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## **Usage**
- Explore interactive maps to locate food resources.  
- Filter layers for specific resources like SNAP-accepting stores, food deserts, or fresh food outlets.  
- Analyze trends and insights through dynamic charts and data visualizations.

---

## **Future Updates**
- Expand to support additional states or regions.  
- Integrate real-time data feeds and third-party APIs for dynamic updates.  
- Add user authentication and role-based access control.  

---

## **Contributing**

Contributions are welcome! To contribute:

1. Fork the repository.  
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature: description of feature"
   ```
4. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request.

---



## **Acknowledgments**
This project is part of the West Virginia University’s Center for Resilient Communities. 
